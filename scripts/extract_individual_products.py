import fitz
import os
import json

PDF_PATH = r"C:\Users\fares\Downloads\2020_gosafe_Catalog.pdf"
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

def extract_products():
    doc = fitz.open(PDF_PATH)
    products = []
    
    for i in range(len(doc)):
        page_num = i + 1
        if page_num < 4 or page_num >= 60:
            continue
            
        page = doc.load_page(i)
        category = get_category(page_num)
        
        # 1. Get images and their bboxes
        images_info = page.get_image_info(xrefs=True)
        
        # 2. Get text blocks
        dict_data = page.get_text("dict")
        blocks = dict_data.get("blocks", [])
        
        # We will try to identify product titles.
        # Looking at the catalog, product titles are usually size > 10, bold, or specific color.
        # Let's find all text spans with size > 11.
        
        titles = []
        for b in blocks:
            if b.get("type") == 0:
                for l in b.get("lines", []):
                    for s in l.get("spans", []):
                        if s.get("size", 0) > 11:
                            text = s.get("text", "").strip()
                            if text and len(text) > 3:
                                # bbox is (x0, y0, x1, y1)
                                titles.append({
                                    "text": text,
                                    "bbox": s["bbox"]
                                })
        
        # Group titles that are very close vertically to form multiline titles
        grouped_titles = []
        if titles:
            current_title = titles[0]
            for t in titles[1:]:
                # If vertical distance is small, merge them
                if abs(t["bbox"][1] - current_title["bbox"][3]) < 10 and abs(t["bbox"][0] - current_title["bbox"][0]) < 50:
                    current_title["text"] += " " + t["text"]
                    current_title["bbox"] = (
                        min(current_title["bbox"][0], t["bbox"][0]),
                        min(current_title["bbox"][1], t["bbox"][1]),
                        max(current_title["bbox"][2], t["bbox"][2]),
                        max(current_title["bbox"][3], t["bbox"][3])
                    )
                else:
                    grouped_titles.append(current_title)
                    current_title = t
            grouped_titles.append(current_title)
            
        # For each grouped title, find the nearest image ABOVE it
        for idx, title in enumerate(grouped_titles):
            tx0, ty0, tx1, ty1 = title["bbox"]
            best_img = None
            best_dist = 9999
            
            for img in images_info:
                ix0, iy0, ix1, iy1 = img["bbox"]
                # Image should be roughly above the text
                if iy1 <= ty0 + 20: # Allow slight overlap
                    # Check horizontal alignment
                    # Image center should be somewhat close to text center
                    icx = (ix0 + ix1) / 2
                    tcx = (tx0 + tx1) / 2
                    if abs(icx - tcx) < 150: # Adjust threshold as needed
                        dist = ty0 - iy1
                        if 0 <= dist < best_dist:
                            best_dist = dist
                            best_img = img
            
            # If no image found, skip or use a placeholder?
            # Let's extract the image if found
            img_path = "/images/catalog/placeholder.png"
            if best_img:
                xref = best_img["xref"]
                if xref > 0:
                    try:
                        base_image = doc.extract_image(xref)
                        image_bytes = base_image["image"]
                        ext = base_image["ext"]
                        safe_name = "".join(c for c in title["text"] if c.isalnum() or c in " -_").strip()
                        safe_name = safe_name[:30]
                        img_filename = f"p{page_num}_{idx}_{safe_name}.{ext}"
                        img_filepath = os.path.join(OUT_IMG_DIR, img_filename)
                        with open(img_filepath, "wb") as f:
                            f.write(image_bytes)
                        img_path = f"/images/catalog/products/{img_filename}"
                    except Exception as e:
                        print(f"Failed to extract image {xref}: {e}")
            
            # Extract description: Find text blocks below the title but above the next title
            next_ty0 = grouped_titles[idx+1]["bbox"][1] if idx + 1 < len(grouped_titles) else 9999
            
            desc_bullets = []
            for b in blocks:
                if b.get("type") == 0:
                    bx0, by0, bx1, by1 = b["bbox"]
                    if ty1 <= by0 and by1 <= next_ty0:
                        # Check horizontal alignment
                        bcx = (bx0 + bx1) / 2
                        tcx = (tx0 + tx1) / 2
                        if abs(bcx - tcx) < 150:
                            for l in b.get("lines", []):
                                line_text = "".join([s["text"] for s in l.get("spans", [])]).strip()
                                if line_text.startswith("•") or line_text.startswith("-"):
                                    desc_bullets.append(line_text)
            
            desc = " ".join(desc_bullets)
            if not desc:
                desc = title["text"]
                
            product = {
                "id": f"PRD-P{page_num}-{idx}",
                "name": title["text"].replace("'", "\\'").replace('"', '\\"'),
                "price": 0,
                "url": img_path,
                "type": "image",
                "category": category,
                "description": desc.replace("'", "\\'").replace('"', '\\"')[:500]
            }
            products.append(product)
            print(f"Extracted: {product['name']}")

    # Write TS file
    ts_content = f"// Auto-generated individual products from PDF catalog\n\n"
    ts_content += "export const CATALOG_PRODUCTS = [\n"
    for p in products:
        # Ignore junk headers
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
        
    print(f"Successfully extracted {len(products)} individual products.")

if __name__ == "__main__":
    extract_products()
