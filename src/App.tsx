import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAnalyticsStore } from "./store/useAnalyticsStore";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { Toaster } from "sonner";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";
import MaintenancePage from "./pages/MaintenancePage";
import HomePage from "./pages/HomePage";

import { useAdminStore } from "./store/useAdminStore";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { settings } = useAdminStore();
  if (settings?.maintenanceMode) {
    return <MaintenancePage />;
  }
  return <>{children}</>;
}

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
    <div className="bg-white text-gray-900 min-h-screen relative font-publicSans selection:bg-[#FF8C00] selection:text-black">
      <Toaster position="bottom-center" theme="dark" toastOptions={{ style: { background: '#111', border: '1px solid #FF8C00', color: '#fff' } }} />
      <CartDrawer />
      <CheckoutModal />
      <HomePage />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<PublicRoute><MainApp /></PublicRoute>} />
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
