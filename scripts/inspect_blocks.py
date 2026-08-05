import fitz

doc = fitz.open(r"C:\Users\fares\Downloads\2020_gosafe_Catalog.pdf")
page = doc.load_page(3) # Page 4

blocks = page.get_text("blocks")
for b in blocks:
    print(f"Type: {b[6]}, BBox: {b[:4]}, Text: {b[4][:30] if b[6]==0 else 'IMAGE'}")
