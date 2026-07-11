import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export default function LoginScreen({ onLoginSuccess, onCancel }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate fields
    if (!username.trim()) {
      setError('Username atau Email wajib diisi.');
      return;
    }
    if (!password) {
      setError('Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against the database/accounts
    setTimeout(() => {
      setIsLoading(false);
      
      const normalizedUsername = username.trim().toLowerCase();
      const isCorrectAccount = 
        (normalizedUsername === 'sispo25c') && 
        password === 'CFORCOMPACCT';

      if (isCorrectAccount) {
        setIsSuccess(true);
        // Persist session
        localStorage.setItem('si_is_admin', 'true');
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        setError('Kredensial login salah. Silakan coba lagi.');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0c1015] text-[#f1f5f9] flex items-center justify-center p-3 overflow-hidden hexagon-pattern select-none">
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-container/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Hexagon Decorative Frames */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-5">
        <div className="absolute top-8 left-8 w-16 h-16 bg-primary hexagon-mask animate-float-slow" />
        <div className="absolute bottom-16 right-8 w-20 h-20 bg-[#3fa9f5] hexagon-mask animate-float-medium" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container - Optimized with max-w-[350px] and tighter padding */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-[350px] bg-slate-900/85 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-2xl shadow-blue-500/5 overflow-hidden"
      >
        {/* Animated Success Overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400 border border-green-500/20"
              >
                <CheckCircle className="w-7 h-7" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-lg font-black text-white mb-1"
              >
                Login Berhasil!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-slate-400 text-[11px]"
              >
                Membuka portal manajemen sistem informasi...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="flex items-center justify-between w-full mb-4">
            <button
              onClick={onCancel}
              className="group flex items-center gap-1 text-slate-400 hover:text-white transition-colors duration-200 text-[10px] font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Kembali</span>
            </button>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20 text-[9px] font-extrabold text-primary uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure</span>
            </div>
          </div>

          <motion.div
            className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center mb-2.5 transform rotate-12"
            whileHover={{ rotate: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Lock className="w-4.5 h-4.5 transform -rotate-12" />
          </motion.div>

          <h2 className="text-base font-black text-white tracking-tight">
            Portal Admin Kelas
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5 max-w-[260px]">
            Masuk untuk mengelola jadwal kuliah, galeri, dan profil kelas
          </p>
        </div>

        {/* Error Alert Panel */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              className="mb-4 overflow-hidden"
            >
              <div className="p-3 bg-red-500/10 border border-red-500/15 rounded-xl flex items-start gap-2 text-red-400 text-[11px] leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold">Gagal:</span> {error}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-300 tracking-wider uppercase pl-1">
              Username atau Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center justify-center text-slate-500 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                disabled={isLoading}
                className="w-full bg-slate-950/40 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-300 tracking-wider uppercase pl-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center justify-center text-slate-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full bg-slate-950/40 border border-slate-800 text-white rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute inset-y-0 right-3.5 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors duration-150 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 bg-primary hover:bg-[#006399] disabled:bg-primary/50 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/5 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </motion.button>
        </form>


      </motion.div>
    </div>
  );
}
