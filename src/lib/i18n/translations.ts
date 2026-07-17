type Translations = {
  [key: string]: {
    en: string;
    ar: string;
  };
};

export const translations: Translations = {
  // Navigation
  "nav.products": { en: "Products", ar: "المنتجات" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.admin": { en: "Admin", ar: "لوحة التحكم" },
  "nav.getQuote": { en: "Get Quote", ar: "احصل على عرض سعر" },
  "nav.language": { en: "العربية", ar: "English" }, // The button will show the OTHER language

  // Hero
  "hero.badge": { en: "ISO 9001:2015 CERTIFIED MANUFACTURING", ar: "تصنيع معتمد بشهادة أيزو 9001:2015" },
  "hero.title1": { en: "Industrial", ar: "صناعة" },
  "hero.title2": { en: "Safety", ar: "السلامة" },
  "hero.title3": { en: "Signage", ar: "والعلامات" },
  "hero.desc": { en: "Engineered for extreme environments. We manufacture compliant, high-visibility safety signs and 3D customizable boards for heavy industry and construction.", ar: "مصممة للبيئات القاسية. نحن نصنع لوحات سلامة مطابقة للمواصفات وعالية الوضوح، ولوحات ثلاثية الأبعاد قابلة للتخصيص للصناعات الثقيلة والمقاولات." },
  "hero.cta1": { en: "View Products", ar: "عرض المنتجات" },
  "hero.cta2": { en: "Custom Quote", ar: "عرض سعر مخصص" },
  
  // Standard Labels
  "labels.title1": { en: "Standard", ar: "الملصقات" },
  "labels.title2": { en: "Labels", ar: "القياسية" },
  "labels.desc": { en: "High-contrast, durable adhesive labels for quick compliance and safety marking across your facility.", ar: "ملصقات لاصقة عالية التباين ومتينة لضمان الامتثال السريع ووضع علامات السلامة في جميع أنحاء منشأتك." },
  "labels.orderConfirm": { en: "Order confirmation via WhatsApp required", ar: "تأكيد الطلب عبر واتساب مطلوب" },
  "labels.addToCart": { en: "Add to Cart", ar: "أضف للسلة" },
  "labels.loadMore": { en: "Load More", ar: "عرض المزيد" },
  "labels.remaining": { en: "remaining", ar: "متبقي" },

  // Engineered Signage
  "sign.title1": { en: "Engineered", ar: "اللوحات" },
  "sign.title2": { en: "Signage", ar: "الهندسية" },
  "sign.desc": { en: "Heavy-duty PVC and acrylic panels coated with weather-resistant finishes. Designed to endure harsh industrial environments.", ar: "ألواح شديدة التحمل من الـ PVC والأكريليك مغطاة بطبقات مقاومة للعوامل الجوية. مصممة لتحمل البيئات الصناعية القاسية." },
  "sign.spec": { en: "SPEC", ar: "المواصفات" },
  "sign.price": { en: "Price", ar: "السعر" },
  "sign.orderConfirm": { en: "Order confirmation via Call/WhatsApp", ar: "تأكيد الطلب عبر المكالمة/واتساب" },
  "sign.3d": { en: "3D Interactive", ar: "مجسم 3D" },
  "sign.customize": { en: "Customize", ar: "تخصيص اللوحة" },
  "sign.selectLabel": { en: "Select Label Design", ar: "اختر تصميم الملصق" },
  "sign.available": { en: "Available", ar: "متاح" },
  "sign.reset": { en: "[ Reset ]", ar: "[ إعادة ضبط ]" },
  "sign.customNotes": { en: "Custom Notes / Design Requirements", ar: "ملاحظات مخصصة / متطلبات التصميم" },
  "sign.notesPlaceholder": { en: "e.g. Please add our logo to the top right corner...", ar: "مثال: يرجى إضافة شعارنا في الزاوية اليمنى العليا..." },

  // Checkout
  "checkoutCart.title": { en: "Quote Request", ar: "طلب عرض سعر" },
  "checkoutCart.empty": { en: "No items selected for quotation.", ar: "لم يتم اختيار أي عناصر لعرض السعر." },
  "checkoutCart.proceed": { en: "Proceed to Checkout", ar: "متابعة الطلب" },
  "checkout.title": { en: "Complete Your Quote Request", ar: "إكمال طلب عرض السعر" },
  "checkout.desc": { en: "Provide your details below. Our technical team will review your requirements and contact you with a formal quotation.", ar: "أدخل بياناتك أدناه. سيقوم فريقنا الفني بمراجعة متطلباتك والتواصل معك بعرض سعر رسمي." },
  "checkout.fullName": { en: "Full Name / Contact Person", ar: "الاسم بالكامل / الشخص المسؤول" },
  "checkout.company": { en: "Company / Organization Name", ar: "اسم الشركة / المؤسسة" },
  "checkout.phone": { en: "Phone Number (WhatsApp preferred)", ar: "رقم الهاتف (يفضل واتساب)" },
  "checkout.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "checkout.country": { en: "Country", ar: "الدولة" },
  "checkout.address": { en: "Delivery Address / Project Location", ar: "عنوان التوصيل / موقع المشروع" },
  "checkout.cancel": { en: "Cancel", ar: "إلغاء" },
  "checkout.submit": { en: "Submit Quote Request", ar: "إرسال طلب عرض السعر" },
  "checkout.success": { en: "Order Received!", ar: "تم استلام الطلب!" },
  "checkout.successDesc": { en: "Our engineering team has received your request and will contact you shortly with the finalized specs and delivery timeline.", ar: "لقد استلم فريقنا الهندسي طلبك وسيقوم بالتواصل معك قريباً لتأكيد المواصفات وموعد التسليم." },

  // Cart
  "cart.title": { en: "Your Cart", ar: "عربة التسوق" },
  "cart.empty": { en: "Your cart is empty.", ar: "عربة التسوق فارغة." },
  "cart.size": { en: "Size", ar: "المقاس" },
  "cart.total": { en: "Total Estimated Cost", ar: "إجمالي التكلفة التقديرية" },
  "cart.checkout": { en: "Proceed to Checkout", ar: "متابعة الدفع" },

  // Sections
  "logos.trusted": { en: "Trusted By Industry Leaders", ar: "موثوقون لدى رواد الصناعة" },
  "features.title": { en: "Why Choose Georeo?", ar: "لماذا تختار جيرو؟" },
  "features.f1": { en: "Extreme Durability", ar: "متانة فائقة" },
  "features.f1d": { en: "Weather and chemical resistant.", ar: "مقاوم للعوامل الجوية والمواد الكيميائية." },
  "features.f2": { en: "Compliance Guaranteed", ar: "ضمان المطابقة" },
  "features.f2d": { en: "Meets international standards.", ar: "مطابق للمعايير الدولية." },
  "features.f3": { en: "Fast Production", ar: "إنتاج سريع" },
  "features.f3d": { en: "Rapid turnaround times.", ar: "فترات تصنيع قياسية." },
  "features.f4": { en: "Custom Designs", ar: "تصميمات مخصصة" },
  "features.f4d": { en: "Tailored to your needs.", ar: "مصممة حسب احتياجاتك." },

  "process.title": { en: "How It Works", ar: "كيف نعمل" },
  "process.s1": { en: "Select Products", ar: "اختر المنتجات" },
  "process.s1d": { en: "Choose from our catalog or customize your own 3D boards.", ar: "اختر من الكتالوج أو قم بتخصيص لوحاتك ثلاثية الأبعاد." },
  "process.s2": { en: "Submit Request", ar: "أرسل الطلب" },
  "process.s2d": { en: "Provide your project details and contact information.", ar: "قدم تفاصيل مشروعك ومعلومات الاتصال الخاصة بك." },
  "process.s3": { en: "Review Quote", ar: "راجع عرض السعر" },
  "process.s3d": { en: "Our team will send a formal quote and production timeline.", ar: "سيقوم فريقنا بإرسال عرض سعر رسمي وجدول زمني للإنتاج." },
  "process.s4": { en: "Production & Delivery", ar: "الإنتاج والتوصيل" },
  "process.s4d": { en: "We manufacture your order and deliver it to your site.", ar: "نقوم بتصنيع طلبك وتوصيله إلى موقعك." },

  "cta.title": { en: "Secure Your Site Today", ar: "قم بتأمين موقعك اليوم" },
  "cta.desc": { en: "Get a custom quote for industrial-grade safety signage.", ar: "احصل على عرض سعر مخصص للوحات السلامة الصناعية." },
  "cta.btn": { en: "Request Custom Quote", ar: "اطلب عرض سعر مخصص" },

  "footer.company": { en: "Industrial Safety Signage Manufacturing", ar: "تصنيع لوحات السلامة الصناعية" },
  "footer.products": { en: "Products", ar: "المنتجات" },
  "footer.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.email": { en: "Email", ar: "البريد الإلكتروني" },
  "footer.phone": { en: "Phone", ar: "الهاتف" },
  "footer.address": { en: "Address", ar: "العنوان" },
  "footer.addressValue": { en: "Industrial Zone, Cairo, Egypt", ar: "المنطقة الصناعية، القاهرة، مصر" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  // Admin Sidebar
  "admin.dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "admin.orders": { en: "Orders", ar: "الطلبات" },
  "admin.products": { en: "Products", ar: "المنتجات" },
  "admin.settings": { en: "Settings", ar: "الإعدادات" },
  "admin.logout": { en: "Exit & Logout", ar: "خروج وتسجيل خروج" },

  "dashboard.overview": { en: "Analytics Overview", ar: "نظرة عامة على التحليلات" },
  "dashboard.refresh": { en: "Refresh Data", ar: "تحديث البيانات" },
  "dashboard.totalProducts": { en: "Total Products", ar: "إجمالي المنتجات" },
  "dashboard.newRequests": { en: "New Requests", ar: "طلبات جديدة" },
  "dashboard.contacted": { en: "Contacted", ar: "تم التواصل" },
  "dashboard.completed": { en: "Completed", ar: "مكتملة" },
  "dashboard.pageViews": { en: "Total Page Views", ar: "إجمالي مشاهدات الصفحة" },
  "dashboard.uniqueVisitors": { en: "Unique Visitors", ar: "الزوار الفريدون" },
  "dashboard.productsSold": { en: "Products Sold", ar: "المنتجات المباعة" },
  "dashboard.conversionRate": { en: "Conversion Rate", ar: "معدل التحويل" },
  "dashboard.traffic": { en: "Traffic Overview", ar: "نظرة عامة على حركة المرور" },
  "dashboard.topPages": { en: "Top Pages Visited", ar: "أكثر الصفحات زيارة" },
  "dashboard.noPages": { en: "No pages visited yet.", ar: "لم تتم زيارة أي صفحات بعد." },

  // Orders
  "orders.title": { en: "Orders Management", ar: "إدارة الطلبات" },
  "orders.totalItems": { en: "Total Items", ar: "إجمالي المنتجات" },
  "orders.orderId": { en: "Order ID", ar: "رقم الطلب" },
  "orders.noOrders": { en: "No orders found.", ar: "لا توجد طلبات." },
  "orders.customerDetails": { en: "Customer Details", ar: "تفاصيل العميل" },
  "orders.phone": { en: "Phone", ar: "الهاتف" },
  "orders.email": { en: "Email", ar: "البريد الإلكتروني" },
  "orders.address": { en: "Address", ar: "العنوان" },
  "orders.country": { en: "Country", ar: "الدولة" },
  "orders.company": { en: "Company", ar: "الشركة" },
  "orders.items": { en: "Order Items", ar: "منتجات الطلب" },
  "orders.status": { en: "Status", ar: "الحالة" },
  "orders.updateStatus": { en: "Update Status", ar: "تحديث الحالة" },

  // Admin Products
  "adminProducts.title": { en: "Product Catalog Management", ar: "إدارة كتالوج المنتجات" },
  "adminProducts.addProduct": { en: "Add New Product", ar: "إضافة منتج جديد" },
  "adminProducts.editProduct": { en: "Edit Product", ar: "تعديل المنتج" },
  "adminProducts.cancel": { en: "Cancel", ar: "إلغاء" },
  "adminProducts.save": { en: "Save Product", ar: "حفظ المنتج" },
  "adminProducts.deleteConfirm": { en: "Are you sure you want to delete this product?", ar: "هل أنت متأكد من أنك تريد حذف هذا المنتج؟" },
  "adminProducts.formName": { en: "Product Name", ar: "اسم المنتج" },
  "adminProducts.formType": { en: "Category", ar: "الفئة" },
  "adminProducts.formPrice": { en: "Base Price (EGP)", ar: "السعر الأساسي (جنيه)" },
  "adminProducts.formImage": { en: "Upload Image", ar: "رفع صورة" },
  "adminProducts.formImageDesc": { en: "Click or drag an image here", ar: "انقر أو اسحب صورة هنا" },

  // Admin Settings
  "adminSettings.title": { en: "System Settings", ar: "إعدادات النظام" },
  "adminSettings.storeInfo": { en: "Store Information", ar: "معلومات المتجر" },
  "adminSettings.storeName": { en: "Store Name", ar: "اسم المتجر" },
  "adminSettings.contactEmail": { en: "Contact Email", ar: "البريد الإلكتروني للاتصال" },
  "adminSettings.whatsapp": { en: "WhatsApp Confirmation Number", ar: "رقم تأكيد الواتساب" },
  "adminSettings.preferences": { en: "Preferences", ar: "التفضيلات" },
  "adminSettings.enableWhatsapp": { en: "Enable WhatsApp confirmation requirement", ar: "تفعيل متطلب تأكيد الواتساب" },
  "adminSettings.emailAlerts": { en: "Send email notification on new orders", ar: "إرسال إشعار بالبريد الإلكتروني للطلبات الجديدة" },
  "adminSettings.saveChanges": { en: "Save Changes", ar: "حفظ التغييرات" },
  "adminSettings.saveSuccess": { en: "Settings saved successfully!", ar: "تم حفظ الإعدادات بنجاح!" },

  // Admin Login
  "login.title": { en: "Admin Portal", ar: "بوابة المسؤول" },
  "login.subtitle": { en: "AUTHORIZED PERSONNEL ONLY", ar: "للموظفين المصرح لهم فقط" },
  "login.accessCode": { en: "Access Code", ar: "رمز الوصول" },
  "login.submit": { en: "Authenticate", ar: "مصادقة" },
  "login.error": { en: "Invalid access code", ar: "رمز الوصول غير صحيح" },

  // Admin Products
  "adminProd.inventory": { en: "Product Inventory", ar: "مخزون المنتجات" },
  "adminProd.addProduct": { en: "Add Product", ar: "إضافة منتج" },
  "adminProd.totalItems": { en: "Total Items", ar: "إجمالي العناصر" },
  "adminProd.prodName": { en: "Product Name", ar: "اسم المنتج" },
  "adminProd.price": { en: "Price (EGP)", ar: "السعر (جنيه)" },
  "adminProd.imageUrl": { en: "Image (Upload or URL)", ar: "الصورة (رفع أو رابط)" },
  "adminProd.save": { en: "Save", ar: "حفظ" },
  "adminProd.cancel": { en: "Cancel", ar: "إلغاء" },
  "adminProd.products": { en: "Products", ar: "المنتجات" },
  "adminProd.deleteConfirm": { en: "Delete product?", ar: "حذف المنتج؟" },

  // Admin Orders
  "adminOrd.management": { en: "Orders Management", ar: "إدارة الطلبات" },
  "adminOrd.export": { en: "Export to Excel", ar: "تصدير لإكسيل" },
  "adminOrd.total": { en: "Total Orders", ar: "إجمالي الطلبات" },
  "adminOrd.empty": { en: "No orders have been received yet.", ar: "لم يتم تلقي أي طلبات بعد." },
  "adminOrd.pending": { en: "Pending", ar: "قيد الانتظار" },
  "adminOrd.confirmed": { en: "Confirmed", ar: "تم التأكيد" },
  "adminOrd.shipped": { en: "Shipped", ar: "تم الشحن" },
  "adminOrd.cancelled": { en: "Cancelled", ar: "ملغي" },
  "adminOrd.delete": { en: "Delete", ar: "حذف" },
  "adminOrd.deleteConfirm": { en: "Are you sure?", ar: "هل أنت متأكد؟" },
  "adminOrd.customerDetails": { en: "Customer Details", ar: "بيانات العميل" },
  "adminOrd.orderItems": { en: "Order Items", ar: "عناصر الطلب" },
  "adminOrd.qty": { en: "Qty", ar: "الكمية" },
  "adminOrd.type": { en: "Type", ar: "النوع" },
  "adminOrd.size": { en: "Size", ar: "المقاس" },
  "adminOrd.note": { en: "Note", ar: "ملاحظة" },

  // Others
  "common.egp": { en: "EGP", ar: "جنيه" }
};

import { useLanguageStore } from '../../store/useLanguageStore';

export const useTranslation = () => {
  const language = useLanguageStore(state => state.language);
  
  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return { t, language };
};
