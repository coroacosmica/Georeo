import fitz
import os
from PIL import Image

PDF_PATH = r"C:\Users\fares\Downloads\2020_gosafe_Catalog.pdf"
IMG_DIR = r"c:\Georeo\public\images\catalog"
OUT_IMG_DIR = r"c:\Georeo\public\images\catalog\products"
OUT_TS_FILE = r"c:\Georeo\src\data\pdf_catalog.ts"

os.makedirs(OUT_IMG_DIR, exist_ok=True)

def get_category(page_num):
    if 16 <= page_num <= 21 or 54 <= page_num <= 55:
        return "WORKWEAR"
    elif 38 <= page_num <= 40:
        return "FOOTWEAR"
    else:
        return "SAFETY"

def process():
    doc = fitz.open(PDF_PATH)
    products = []
    
    for i in range(len(doc)):
        page_num = i + 1
        if page_num < 4 or page_num >= 60:
            continue
            
        page = doc.load_page(i)
        category = get_category(page_num)
        page_width = page.rect.width
        page_height = page.rect.height
        
        # Load the rendered page image
        page_img_path = os.path.join(IMG_DIR, f"page_{page_num}.png")
        if not os.path.exists(page_img_path):
            continue
        page_img = Image.open(page_img_path)
        scale_x = page_img.width / page_width
        scale_y = page_img.height / page_height
        
        dict_data = page.get_text("dict")
        blocks = dict_data.get("blocks", [])
        
        # Filter text blocks
        text_blocks = []
        for b in blocks:
            if b.get("type") == 0:
                text = "".join([s.get("text", "") for l in b.get("lines", []) for s in l.get("spans", [])]).strip()
                if text:
                    text_blocks.append(b)
                    
        # Identify columns based on x0
        # Typical 3 column layout: x0 around 20, 220, 420
        # Let's dynamically find columns or just use fixed thresholds for a 3-col layout
        col_width = page_width / 3
        cols = {0: [], 1: [], 2: []}
        
        for b in text_blocks:
            x_center = (b["bbox"][0] + b["bbox"][2]) / 2
            if x_center < col_width:
                cols[0].append(b)
            elif x_center < col_width * 2:
                cols[1].append(b)
            else:
                cols[2].append(b)
                
        # Process each column
        for col_idx, col_blocks in cols.items():
            if not col_blocks: continue
            col_blocks.sort(key=lambda b: b["bbox"][1]) # Sort by y0
            
            # Find titles
            titles = []
            for idx, b in enumerate(col_blocks):
                is_title = False
                title_text = ""
                for l in b.get("lines", []):
                    for s in l.get("spans", []):
                        if s.get("size", 0) > 11:
                            is_title = True
                            title_text += s.get("text", " ")
                if is_title and len(title_text.strip()) > 3 and any(c.isalpha() for c in title_text):
                    titles.append({"idx": idx, "text": title_text.strip(), "bbox": b["bbox"]})
                    
            if not titles: continue
            
            # For each title, define its product block
            for t_i, title in enumerate(titles):
                start_block_idx = title["idx"]
                end_block_idx = titles[t_i+1]["idx"] if t_i+1 < len(titles) else len(col_blocks)
                
                # Product blocks
                prod_blocks = col_blocks[start_block_idx:end_block_idx]
                
                # Bounding box of text
                text_y0 = title["bbox"][1]
                text_y1 = max(b["bbox"][3] for b in prod_blocks)
                
                # The image is usually ABOVE the title.
                # So the product's territory starts from the bottom of the PREVIOUS product's text (or top margin).
                if t_i == 0:
                    prod_y0 = 40 # Top margin
                else:
                    prev_end_block = col_blocks[titles[t_i]["idx"] - 1]
                    prod_y0 = prev_end_block["bbox"][3] + 5 # 5 pts padding
                    
                prod_y1 = text_y1 + 10 # 10 pts padding
                
                # Col boundaries
                prod_x0 = col_idx * col_width
                prod_x1 = (col_idx + 1) * col_width
                
                # Crop image
                px0 = int(prod_x0 * scale_x)
                px1 = int(prod_x1 * scale_x)
                py0 = int(prod_y0 * scale_y)
                py1 = int(prod_y1 * scale_y)
                
                # Ensure within bounds
                px0 = max(0, px0)
                py0 = max(0, py0)
                px1 = min(page_img.width, px1)
                py1 = min(page_img.height, py1)
                
                if py1 <= py0 or px1 <= px0:
                    continue
                    
                cropped = page_img.crop((px0, py0, px1, py1))
                safe_name = "".join(c for c in title["text"] if c.isalnum() or c in " -_").strip()[:30]
                img_name = f"p{page_num}_c{col_idx}_{t_i}_{safe_name}.png"
                img_path = os.path.join(OUT_IMG_DIR, img_name)
                cropped.save(img_path)
                
                # Extract description bullets
                bullets = []
                for b in prod_blocks:
                    for l in b.get("lines", []):
                        line_text = "".join([s.get("text", "") for s in l.get("spans", [])]).strip()
                        if line_text.startswith("•") or line_text.startswith("-"):
                            bullets.append(line_text)
                
                desc = " ".join(bullets) if bullets else title["text"]
                
                product = {
                    "id": f"PRD-{page_num}-{col_idx}-{t_i}",
                    "name": title["text"].replace("'", "\\'").replace('"', '\\"'),
                    "price": 0,
                    "url": f"/images/catalog/products/{img_name}",
                    "type": "image",
                    "category": category,
                    "description": desc.replace("'", "\\'").replace('"', '\\"')[:500]
                }
                products.append(product)
                print(f"Cropped: {product['name']}")

    # Write TS file
    ts_content = f"// Auto-generated individual products from PDF catalog\n\n"
    ts_content += "export const CATALOG_PRODUCTS = [\n"
    for p in products:
        if len(p['name']) < 5 or "Table of Contents" in p['name']:
            continue
        ts_content += f"  {{\n"
        ts_content += f"    id: '{p['id']}',\n"
        ts_content += f"    name: '{p['name']}',\n"
        ts_content += f"    price: {p['price']},\n"
        ts_content += f"    url: '{p['url']}',\n"
        ts_content += f"    type: '{p['type']}',\n"
        ts_content += f"    category: '{p['category']}',\n"
        ts_content += f"    description: '{p['description']}'\n"
        ts_content += f"  }},\n"
    ts_content += "];\n"
    
    with open(OUT_TS_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Successfully extracted {len(products)} products with cropped images.")

if __name__ == "__main__":
    process()
