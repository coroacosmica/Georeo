import { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';
import CatalogSection from '../components/CatalogSection';

export default function HomePage() {
  const { toggleCart, items } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);


  useEffect(() => {
    // Add event listener for cart toggle
    const cartBtn = document.getElementById('user-cart');
    if (cartBtn) {
      cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
      });
    }
  }, [toggleCart]);

  return (
    <div className="min-h-screen bg-white" data-sd-id="1">
      {/* Header Navigation */}
      <header className="bg-white text-gray-900 border-b border-gray-100 sticky top-0 z-50" data-sd-id="2">
        <div className="max-w-[1440px] mx-auto px-6" data-sd-id="3">
          <div className="flex items-center justify-between h-28" data-sd-id="4">
            {/* Logo Section */}
            <div className="flex items-center" data-sd-id="5">
              <a href="#" id="nav-logo-link" className="flex items-center pr-12" data-sd-id="7">
                <img src="/images/Georeo-bk.png" alt="GEOREO SAFETY" className="h-20 w-auto object-contain" data-sd-id="8" />
              </a>
              {/* Navigation Menu */}
              <nav className="hidden lg:flex items-center space-x-10 text-sm font-bold tracking-wider" data-sd-id="10">
                <a href="#" id="nav-home" className="hover:text-[#FF8C00] transition-colors" data-sd-id="11">HOME</a>
                <a href="#" id="nav-shop" className="text-[#FF8C00]" data-sd-id="12">SHOP</a>
                <a href="#" id="nav-services" className="hover:text-[#FF8C00] transition-colors" data-sd-id="13">SERVICES</a>
                <a href="#" id="nav-pages" className="hover:text-[#FF8C00] transition-colors" data-sd-id="14">PAGES</a>
                <a href="#" id="nav-contact" className="hover:text-[#FF8C00] transition-colors" data-sd-id="15">CONTACT</a>
              </nav>
            </div>

            {/* Right Search/Icons */}
            <div className="flex items-center space-x-8" data-sd-id="16">
              <div className="hidden md:flex relative" data-sd-id="17">
                <input type="text" placeholder="What you looking for?" className="bg-gray-50 border border-gray-200 text-sm py-3 px-5 pr-12 w-72 focus:ring-1 focus:ring-[#FF8C00] focus:border-[#FF8C00] outline-none rounded-sm transition-all" data-sd-id="18" />
                <iconify-icon icon="lucide:search" class="absolute right-4 top-3.5 text-gray-400 text-lg"></iconify-icon>
              </div>
              <div className="flex items-center space-x-5 text-2xl text-gray-700" data-sd-id="19">
                <button onClick={toggleLanguage} className="hover:text-[#FF8C00] transition-colors cursor-pointer flex items-center justify-center">
                  <iconify-icon icon="lucide:globe"></iconify-icon>
                </button>
                <a href="#" id="user-account" className="hover:text-[#FF8C00] transition-colors" data-sd-id="20"><iconify-icon icon="lucide:user"></iconify-icon></a>
                <a href="#" id="user-wishlist" className="hover:text-[#FF8C00] relative transition-colors" data-sd-id="21"><iconify-icon icon="lucide:star"></iconify-icon></a>
                <button id="user-cart" className="hover:text-[#FF8C00] transition-colors cursor-pointer relative" data-sd-id="22">
                  <iconify-icon icon="lucide:shopping-bag"></iconify-icon>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF8C00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-publicSans">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main data-sd-id="23">
        {/* Hero Section */}
        <section className="relative h-[700px] bg-black overflow-hidden" data-sd-id="24">
          <img src="/images/placeholders/hero_bg.png" alt="Industrial Worker" className="absolute inset-0 w-full h-full object-cover opacity-80" data-sd-id="25" />
          <div className="absolute inset-0 hero-gradient" data-sd-id="26"></div>
          <div className="relative max-w-[1440px] mx-auto px-8 h-full flex flex-col justify-center items-start" data-sd-id="27">
            <span className="text-[#FF8C00] font-bold tracking-[0.2em] mb-4" data-sd-id="28">WE SUPPLY MANY LEADING BRAND</span>
            <h1 className="text-white text-6xl md:text-8xl font-black mb-8 max-w-2xl leading-[0.9]" data-sd-id="29">
              WORKWEAR FOR<br /><span className="text-[#FF8C00]" data-sd-id="30">PROFESSIONS</span>
            </h1>
            <a href="#" id="hero-cta" className="bg-white hover:bg-[#FF8C00] transition-all duration-300 text-black px-8 py-4 font-bold flex items-center group" data-sd-id="31">
              DISCOVER MORE
              <iconify-icon icon="lucide:move-right" class="ml-3 group-hover:translate-x-1 transition-transform"></iconify-icon>
            </a>
          </div>
        </section>

        {/* Key Benefits Bar */}
        <section className="bg-[#FF8C00] py-4 relative z-10 -mt-2" data-sd-id="32">
          <div className="max-w-[1440px] mx-auto px-6 overflow-hidden" data-sd-id="33">
            <div className="flex justify-between items-center text-sm md:text-base font-black italic whitespace-nowrap space-x-8" data-sd-id="34">
              <div className="flex items-center" data-sd-id="35"><span data-sd-id="36">*</span><span className="ml-2 uppercase" data-sd-id="37">SUSTAINABLE PRODUCT</span></div>
              <div className="flex items-center" data-sd-id="38"><span data-sd-id="39">*</span><span className="ml-2 uppercase" data-sd-id="40">EFFECTIVE SUPPLY CHAIN</span></div>
              <div className="flex items-center" data-sd-id="41"><span data-sd-id="42">*</span><span className="ml-2 uppercase" data-sd-id="43">BUILT FOR SAFE WORK</span></div>
              <div className="flex items-center" data-sd-id="44"><span data-sd-id="45">*</span><span className="ml-2 uppercase" data-sd-id="46">FULLY CONTROLLED</span></div>
              <div className="flex items-center" data-sd-id="47"><span data-sd-id="48">*</span><span className="ml-2 uppercase" data-sd-id="49">CUSTOMIZED SOLUTIONS</span></div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white py-12 border-b" data-sd-id="50">
          <div className="max-w-[1440px] mx-auto px-6" data-sd-id="51">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-sd-id="52">
              <div className="flex items-center space-x-4" data-sd-id="53">
                <iconify-icon icon="lucide:truck" class="text-3xl text-[#FF8C00]"></iconify-icon>
                <div data-sd-id="54">
                  <h4 className="font-bold text-sm uppercase" data-sd-id="55">Worldwide Shipping</h4>
                  <p className="text-xs text-gray-500" data-sd-id="56">Free delivery on order above $299</p>
                </div>
              </div>
              <div className="flex items-center space-x-4" data-sd-id="57">
                <iconify-icon icon="lucide:rotate-ccw" class="text-3xl text-[#FF8C00]"></iconify-icon>
                <div data-sd-id="58">
                  <h4 className="font-bold text-sm uppercase" data-sd-id="59">Moneyback Guarantee</h4>
                  <p className="text-xs text-gray-500" data-sd-id="60">If any issues money back in 30 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-4" data-sd-id="61">
                <iconify-icon icon="lucide:shield-check" class="text-3xl text-[#FF8C00]"></iconify-icon>
                <div data-sd-id="62">
                  <h4 className="font-bold text-sm uppercase" data-sd-id="63">Secure Payments</h4>
                  <p className="text-xs text-gray-500" data-sd-id="64">100% secure checkout verified</p>
                </div>
              </div>
              <div className="flex items-center space-x-4" data-sd-id="65">
                <iconify-icon icon="lucide:headphones" class="text-3xl text-[#FF8C00]"></iconify-icon>
                <div data-sd-id="66">
                  <h4 className="font-bold text-sm uppercase" data-sd-id="67">Online Customer Service</h4>
                  <p className="text-xs text-gray-500" data-sd-id="68">Call our expert: +1 (123) 456 7899</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="py-20" data-sd-id="69">
          <div className="max-w-[1440px] mx-auto px-6" data-sd-id="70">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-sd-id="71">
              {/* Category Card 1 */}
              <div className="relative group overflow-hidden h-[500px]" data-sd-id="72">
                <img src="/images/placeholders/safety_wear.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Safety Wear" data-sd-id="73" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end" data-sd-id="74">
                  <span className="text-[#FF8C00] font-bold text-xs uppercase tracking-widest mb-2" data-sd-id="75">New Arrivals</span>
                  <h3 className="text-white text-3xl font-bold mb-2" data-sd-id="76">PROFESSIONAL<br />SAFETY WEAR</h3>
                  <p className="text-white/80 font-semibold mb-6" data-sd-id="77">START FROM <span className="text-[#FF8C00]" data-sd-id="78">$399</span></p>
                  <a href="#" id="cat-shop-1" className="bg-white text-black font-bold py-3 px-6 inline-block w-fit text-sm hover:bg-[#FF8C00] transition-colors" data-sd-id="79">SHOP NOW</a>
                </div>
              </div>
              {/* Category Card 2 */}
              <div className="relative group overflow-hidden h-[500px]" data-sd-id="80">
                <img src="/images/placeholders/helmets.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Helmets" data-sd-id="81" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end" data-sd-id="82">
                  <span className="text-[#FF8C00] font-bold text-xs uppercase tracking-widest mb-2" data-sd-id="83">Special Offer</span>
                  <h3 className="text-white text-3xl font-bold mb-2" data-sd-id="84">HEAVY DURABLE<br />HELMET & SUIT</h3>
                  <p className="text-white/80 font-semibold mb-6" data-sd-id="85">START FROM <span className="text-[#FF8C00]" data-sd-id="86">$199</span></p>
                  <a href="#" id="cat-shop-2" className="bg-white text-black font-bold py-3 px-6 inline-block w-fit text-sm hover:bg-[#FF8C00] transition-colors" data-sd-id="87">SHOP NOW</a>
                </div>
              </div>
              {/* Category Card 3 */}
              <div className="relative group overflow-hidden h-[500px]" data-sd-id="88">
                <img src="/images/placeholders/hi_vis.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Hi-Vis" data-sd-id="89" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end" data-sd-id="90">
                  <span className="text-[#FF8C00] font-bold text-xs uppercase tracking-widest mb-2" data-sd-id="91">Winter Wear</span>
                  <h3 className="text-white text-3xl font-bold mb-2" data-sd-id="92">HIGH VISIBILITY<br />WORKWEAR</h3>
                  <p className="text-white/80 font-semibold mb-6" data-sd-id="93">START FROM <span className="text-[#FF8C00]" data-sd-id="94">$299</span></p>
                  <a href="#" id="cat-shop-3" className="bg-white text-black font-bold py-3 px-6 inline-block w-fit text-sm hover:bg-[#FF8C00] transition-colors" data-sd-id="95">SHOP NOW</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="bg-gray-50 py-20" data-sd-id="96">
          <div className="max-w-[1440px] mx-auto px-6" data-sd-id="97">
            <h2 className="text-2xl font-bold mb-12 flex items-center" data-sd-id="98">
              <span className="w-8 h-1 bg-[#FF8C00] mr-4" data-sd-id="99"></span>
              DISCOVER MOST POPULAR CATEGORIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-sd-id="100">
              {/* Card 1 */}
              <div className="bg-white p-8 group relative flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all" data-sd-id="101">
                <h3 className="text-2xl font-black mb-8" data-sd-id="102">WORKWEAR</h3>
                <img src="/images/placeholders/safety_wear.png" className="w-48 h-48 object-cover rounded-sm mb-8 group-hover:scale-110 transition-transform" alt="Workwear" data-sd-id="103" />
                <a href="#" id="pop-cat-1" className="bg-[#FF8C00] w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors" data-sd-id="104">
                  <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                </a>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-8 group relative flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all" data-sd-id="105">
                <h3 className="text-2xl font-black mb-8" data-sd-id="106">FOOTWEAR</h3>
                <img src="/images/placeholders/helmets.png" className="w-48 h-48 object-cover rounded-sm mb-8 group-hover:scale-110 transition-transform" alt="Footwear" data-sd-id="107" />
                <a href="#" id="pop-cat-2" className="bg-[#FF8C00] w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors" data-sd-id="108">
                  <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                </a>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-8 group relative flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all" data-sd-id="109">
                <h3 className="text-2xl font-black mb-8" data-sd-id="110">SAFETY</h3>
                <img src="/images/placeholders/hi_vis.png" className="w-48 h-48 object-cover rounded-sm mb-8 group-hover:scale-110 transition-transform" alt="Safety" data-sd-id="111" />
                <a href="#" id="pop-cat-3" className="bg-[#FF8C00] w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors" data-sd-id="112">
                  <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic PDF Catalog Products */}
        <CatalogSection />

        {/* Promotional Banner */}
        <section className="relative py-32 overflow-hidden" data-sd-id="113">
          <img src="/images/placeholders/promo_bg.png" className="absolute inset-0 w-full h-full object-cover" alt="Worker backdrop" data-sd-id="114" />
          <div className="absolute inset-0 bg-black/60" data-sd-id="115"></div>
          <div className="relative max-w-[1440px] mx-auto px-6" data-sd-id="116">
            <div className="max-w-xl text-white" data-sd-id="117">
              <h2 className="text-6xl md:text-8xl font-black mb-4 leading-none" data-sd-id="118">
                UPTO<br /><span className="text-[#FF8C00]" data-sd-id="119">50% OFF</span>
              </h2>
              <p className="text-xl font-medium mb-8 text-white/90 uppercase tracking-wide" data-sd-id="120">Full workwear range in stock. You work hard, so we made this easy. Sign up for special discounts.</p>
              <a href="#" id="promo-shop" className="bg-[#FF8C00] text-black hover:bg-white px-10 py-4 font-bold inline-flex items-center group transition-all" data-sd-id="121">
                SHOP WORKWEAR
                <iconify-icon icon="lucide:arrow-right" class="ml-3 group-hover:translate-x-1 transition-transform"></iconify-icon>
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-white border-t border-gray-100" data-sd-id="122">
          <div className="max-w-4xl mx-auto px-6 text-center" data-sd-id="123">
            <h2 className="text-3xl font-black mb-4 tracking-tight" data-sd-id="124">SUBSCRIBE TO OUR MAILING LIST</h2>
            <p className="text-gray-500 mb-10 uppercase tracking-widest text-sm font-medium" data-sd-id="125">Stay updated with the latest safety standards and product launches</p>
            <form className="flex flex-col md:flex-row gap-0 max-w-2xl mx-auto" data-sd-id="126" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" className="flex-grow bg-gray-100 border-none py-4 px-6 focus:ring-2 focus:ring-[#FF8C00] outline-none text-black" data-sd-id="127" />
              <button type="submit" className="bg-[#FF8C00] text-black font-black px-10 py-4 hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest" data-sd-id="128">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer (Simplified to focus on homepage requirements) */}
      <footer className="bg-[#111111] text-white py-12" data-sd-id="129">
        <div className="max-w-[1440px] mx-auto px-6" data-sd-id="130">
          <div className="flex flex-col md:flex-row justify-between items-center" data-sd-id="131">
            <div className="mb-8 md:mb-0" data-sd-id="132">
              <div className="bg-[#FF8C00] px-6 py-4 flex items-center w-fit rounded-sm" data-sd-id="133">
                <a href="#" id="footer-logo-link" className="flex items-center" data-sd-id="134">
                  <img src="/images/Georeo-bk.png" alt="GEOREO SAFETY" className="h-12 w-auto object-contain drop-shadow-md" data-sd-id="135" />
                </a>
              </div>
            </div>
            <div className="flex space-x-8 text-sm font-bold" data-sd-id="137">
              <a href="#" id="footer-terms" className="hover:text-[#FF8C00] transition-colors" data-sd-id="138">TERMS &amp; CONDITIONS</a>
              <a href="#" id="footer-privacy" className="hover:text-[#FF8C00] transition-colors" data-sd-id="139">PRIVACY POLICY</a>
              <a href="#" id="footer-faq" className="hover:text-[#FF8C00] transition-colors" data-sd-id="140">FAQ</a>
            </div>
            <div className="mt-8 md:mt-0 flex space-x-4" data-sd-id="141">
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#FF8C00] hover:text-black transition-all" data-sd-id="142"><iconify-icon icon="brandico:facebook"></iconify-icon></a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#FF8C00] hover:text-black transition-all" data-sd-id="143"><iconify-icon icon="brandico:twitter-bird"></iconify-icon></a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#FF8C00] hover:text-black transition-all" data-sd-id="144"><iconify-icon icon="brandico:linkedin-rect"></iconify-icon></a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-widest" data-sd-id="145">
            © 2024 GEOREO SAFETY. ALL RIGHTS RESERVED. SMART SAFETY. STRONGER FUTURE.
          </div>
        </div>
      </footer>
    </div>
  );
}
