import { useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdminStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-safety-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #ff5722 10px, #ff5722 20px)'
        }}
      />
      
      <div className="bg-black/90 p-8 rounded-2xl border-2 border-safety-orange w-full max-w-md relative z-10 backdrop-blur-sm shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-safety-orange/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-safety-orange" />
          </div>
          <h1 className="text-3xl font-safetyDisplay text-white uppercase tracking-wider">Admin Portal</h1>
          <p className="text-safety-light/60 font-safetyMono text-sm mt-2">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-safety-orange font-safetyMono text-sm mb-2">ACCESS CODE</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full bg-safety-dark border-2 border-safety-gray/50 focus:border-safety-orange rounded-lg px-4 py-3 text-white font-safetyMono focus:outline-none transition-colors"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm font-safetyMono">
              <AlertCircle className="w-4 h-4" />
              <span>ACCESS DENIED</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-safety-orange hover:bg-orange-600 text-black font-safetyDisplay text-xl uppercase py-4 rounded-lg transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
