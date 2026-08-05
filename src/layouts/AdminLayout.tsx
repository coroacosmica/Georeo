import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Globe } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';
import AdminLogin from '../pages/AdminLogin';
import { useTranslation } from '../lib/i18n/translations';
import { useLanguageStore } from '../store/useLanguageStore';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminStore();

  const { t } = useTranslation();
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const links = [
    { name: t('admin.dashboard'), path: '/admin', icon: LayoutDashboard },
    { name: t('admin.orders'), path: '/admin/orders', icon: ShoppingCart },
    { name: t('admin.products'), path: '/admin/products', icon: Package },
    { name: t('admin.settings'), path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-900 selection:bg-[#FF8C00] selection:text-black font-publicSans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col relative">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <Link to="/">
            <img src="/images/Georeo-bk.png" alt="Georeo" className="h-12 object-contain hover:scale-105 transition-transform" />
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-bold uppercase text-sm tracking-widest ${
                  isActive 
                    ? 'bg-[#FF8C00] text-black shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={toggleLanguage} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 font-bold hover:bg-gray-100 hover:text-black transition-colors cursor-pointer text-sm uppercase tracking-widest">
            <Globe className="w-5 h-5" />
            {t('nav.language')}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 font-bold hover:bg-red-50 transition-colors cursor-pointer text-sm uppercase tracking-widest">
            <LogOut className="w-5 h-5" />
            {t('admin.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 relative p-8">
        <Outlet />
      </main>
    </div>
  );
}
