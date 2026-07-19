import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAnalyticsStore } from "./store/useAnalyticsStore";
import SafetyNavbar from "./components/SafetyNavbar";
import SafetyHero from "./components/SafetyHero";
import LogoMarquee from "./components/LogoMarquee";
import HazardDivider from "./components/HazardDivider";
import ProductGrid from "./components/ProductGrid";
import StandardLabels from "./components/StandardLabels";
import FeaturesStrip from "./components/FeaturesStrip";
import ProcessSteps from "./components/ProcessSteps";
import CtaBand from "./components/CtaBand";
import SafetyFooter from "./components/SafetyFooter";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { Toaster } from "sonner";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";

import { useAdminStore } from "./store/useAdminStore";

function AnalyticsTracker() {
  const location = useLocation();
  const trackVisit = useAnalyticsStore(state => state.trackVisit);

  useEffect(() => {
    trackVisit(location.pathname);
  }, [location, trackVisit]);

  return null;
}

function MainApp() {
  const { fetchProducts, settings } = useAdminStore();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (settings?.storeName) {
      document.title = settings.storeName;
    }
  }, [settings?.storeName]);
  return (
    <div className="bg-safety-dark min-h-screen text-safety-light selection:bg-safety-orange selection:text-white">
      <Toaster position="bottom-center" theme="dark" toastOptions={{ style: { background: '#111', border: '1px solid #FF5A00', color: '#fff' } }} />
      <CartDrawer />
      <CheckoutModal />
      <SafetyNavbar />
      <main>
        <SafetyHero />
        <LogoMarquee />
        <HazardDivider />
        <ProductGrid />
        <StandardLabels />
        <FeaturesStrip />
        <HazardDivider />
        <ProcessSteps />
        <CtaBand />
      </main>
      <SafetyFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
