import fitz
import os
import re
import json

PDF_PATH = r"C:\Users\fares\Downloads\2020_gosafe_Catalog.pdf"
OUT_IMG_DIR = r"c:\Georeo\public\images\catalog"
OUT_TS_FILE = r"c:\Georeo\src\data\pdf_catalog.ts"

os.makedirs(OUT_IMG_DIR, exist_ok=True)

# Page mapping
def get_category(page_num):
    if 16 <= page_num <= 21 or 54 <= page_num <= 55:
        return "WORKWEAR"
    elif 38 <= page_num <= 40:
        return "FOOTWEAR"
    else:
        return "SAFETY"

def clean_text(text):
    return text.replace('\n', ' ').strip()

def process_pdf():
    doc = fitz.open(PDF_PATH)
    products = []
    
    for i in range(len(doc)):
        page_num = i + 1
        if page_num < 4 or page_num >= 60:
            continue # skip covers and ToC
            
        page = doc.load_page(i)
        
        # Render image
        pix = page.get_pixmap(dpi=150)
        img_name = f"page_{page_num}.png"
        img_path = os.path.join(OUT_IMG_DIR, img_name)
        pix.save(img_path)
        
        # We will create ONE product per page to ensure the layout remains intact 
        # and because the user wants "screenshots" and descriptions.
        # However, to be more useful, we can extract the main headings from the page as "Products"
        # and link them to the same page image.
        
        blocks = page.get_text("blocks")
        # Blocks are usually (x0, y0, x1, y1, "text", block_no, block_type)
        # block_type 0 = text
        
        page_category = get_category(page_num)
        
        # Simple heuristic: find headers and descriptions.
        # But actually, the safest approach that 100% preserves the visual catalog 
        # is to treat each page as a single catalog item, or just extract the boldest text.
        # Let's extract the largest text on the page as the "Section Name"
        
        dict_text = page.get_text("dict")
        headers = []
        for block in dict_text.get("blocks", []):
            if block.get("type") == 0:
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        if span.get("size", 0) > 11:
                            text = span.get("text", "").strip()
                            if text and len(text) > 3:
                                headers.append(text)
        
        main_title = " - ".join(headers[:2]) if headers else f"Catalog Page {page_num}"
        
        # Collect bullet points for description
        bullets = []
        for block in blocks:
            text = block[4]
            if text.strip().startswith('•'):
                bullets.append(clean_text(text))
        
        desc = " ".join(bullets)
        if not desc:
            desc = f"Explore our {page_category.lower()} products on this page."
            
        product = {
            "id": f"CAT-{page_num}",
            "name": main_title[:80], # Limit length
            "price": 0, # Placeholder, user must refer to catalog
            "url": f"/images/catalog/{img_name}",
            "type": "image",
            "category": page_category,
            "description": desc[:500] # Limit description length
        }
        products.append(product)
        print(f"Processed page {page_num}: {product['name']}")

    # Write TS file
    ts_content = f"// Auto-generated from PDF catalog\n\n"
    ts_content += "export const CATALOG_PRODUCTS = [\n"
    for p in products:
        safe_name = p['name'].replace("'", "\\'").replace('"', '\\"')
        safe_desc = p['description'].replace("'", "\\'").replace('"', '\\"')
        ts_content += f"  {{\n"
        ts_content += f"    id: '{p['id']}',\n"
        ts_content += f"    name: '{safe_name}',\n"
        ts_content += f"    price: {p['price']},\n"
        ts_content += f"    url: '{p['url']}',\n"
        ts_content += f"    type: '{p['type']}',\n"
        ts_content += f"    category: '{p['category']}',\n"
        ts_content += f"    description: '{safe_desc}'\n"
        ts_content += f"  }},\n"
    ts_content += "];\n"
    
    with open(OUT_TS_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Successfully wrote {len(products)} catalog pages to {OUT_TS_FILE}")

if __name__ == "__main__":
    process_pdf()
