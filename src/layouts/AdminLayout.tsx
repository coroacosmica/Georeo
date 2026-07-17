import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';
import AdminLogin from '../pages/AdminLogin';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminStore();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex text-safety-light selection:bg-safety-orange selection:text-white font-safetySans">
      {/* Sidebar */}
      <aside className="w-64 bg-safety-dark border-r border-safety-gray/30 flex flex-col">
        <div className="p-6 border-b border-safety-gray/30 flex items-center justify-center">
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
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-safety-orange text-safety-dark font-bold' 
                    : 'text-safety-light/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-safety-gray/30">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5" />
            Exit & Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-safety-dark to-black">
        <Outlet />
      </main>
    </div>
  );
}
