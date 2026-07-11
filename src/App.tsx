import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import defaultLogo from './assets/images/refined_s_hexagon_logo_1783309336153.jpg';
import { 
  INITIAL_SCHEDULES, 
  INITIAL_STUDENTS, 
  INITIAL_GALLERY, 
  INITIAL_LOGS, 
  CLASS_CONFIG 
} from './data';
import { Schedule, Student, GalleryItem, ActivityLog, ClassConfig } from './types';
import LoadingScreen from './components/LoadingScreen';
import VelocityScroll from './components/VelocityScroll';
import AboutClass from './components/AboutClass';
import Lightbox from './components/Lightbox';
import AdminPanel from './components/AdminPanel';
import LoginScreen from './components/LoginScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activePage, setActivePage] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Persistent State
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [classConfig, setClassConfig] = useState<ClassConfig>({} as ClassConfig);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Helper to get correct logo source (resolves static asset path for production/Vercel)
  const getLogoSrc = (url?: string) => {
    if (!url || url === '/src/assets/images/refined_s_hexagon_logo_1783309336153.jpg' || url.startsWith('/src/')) {
      return defaultLogo;
    }
    return url;
  };

  // Local storage synchronization and cross-tab/viewport real-time updates
  useEffect(() => {
    const syncData = () => {
      const localSch = localStorage.getItem('si_schedules');
      const localSt = localStorage.getItem('si_students');
      const localGal = localStorage.getItem('si_gallery');
      const localCfg = localStorage.getItem('si_config');
      const localLogs = localStorage.getItem('si_logs');

      if (localSch) setSchedules(JSON.parse(localSch));
      else {
        setSchedules(INITIAL_SCHEDULES);
        localStorage.setItem('si_schedules', JSON.stringify(INITIAL_SCHEDULES));
      }

      if (localSt) setStudents(JSON.parse(localSt));
      else {
        setStudents(INITIAL_STUDENTS);
        localStorage.setItem('si_students', JSON.stringify(INITIAL_STUDENTS));
      }

      if (localGal) setGalleryItems(JSON.parse(localGal));
      else {
        setGalleryItems(INITIAL_GALLERY);
        localStorage.setItem('si_gallery', JSON.stringify(INITIAL_GALLERY));
      }

      if (localCfg) {
        const parsed = JSON.parse(localCfg);
        let needsUpdate = false;
        const updated = { ...parsed };
        if (parsed.className === 'Sistem Informasi') {
          updated.className = 'Sistem Informasi Kelas C';
          needsUpdate = true;
        }
        if (parsed.academicYear === '2024') {
          updated.academicYear = '2025';
          needsUpdate = true;
        }
        if (!parsed.university || parsed.university === 'Universitas Teknologi Digital') {
          updated.university = 'Universitas Islam Negeri Raden Intan Lampung';
          needsUpdate = true;
        }
        if (!parsed.faculty || parsed.faculty === 'Fakultas Ilmu Komputer') {
          updated.faculty = 'Fakultas Sains dan Teknologi';
          needsUpdate = true;
        }

        if (needsUpdate) {
          setClassConfig(updated);
          localStorage.setItem('si_config', JSON.stringify(updated));
        } else {
          setClassConfig(parsed);
        }
      } else {
        setClassConfig(CLASS_CONFIG);
        localStorage.setItem('si_config', JSON.stringify(CLASS_CONFIG));
      }

      if (localLogs) setLogs(JSON.parse(localLogs));
      else {
        setLogs(INITIAL_LOGS);
        localStorage.setItem('si_logs', JSON.stringify(INITIAL_LOGS));
      }
    };

    // Initial load
    syncData();

    const localIsAdmin = localStorage.getItem('si_is_admin');
    if (localIsAdmin === 'true') {
      setIsAdmin(true);
    }

    // Storage event listener to sync across multiple tabs/viewports in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('si_')) {
        syncData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Sync state helpers
  const handleUpdateSchedules = (updated: Schedule[]) => {
    setSchedules(updated);
    localStorage.setItem('si_schedules', JSON.stringify(updated));
    const updatedLogs: ActivityLog[] = [
      { id: `log-${Date.now()}`, text: 'Jadwal Mata Kuliah Diperbarui', time: 'Baru saja', author: 'Admin', type: 'secondary' },
      ...logs
    ];
    setLogs(updatedLogs);
    localStorage.setItem('si_logs', JSON.stringify(updatedLogs));
  };

  const handleUpdateStudents = (updated: Student[]) => {
    setStudents(updated);
    localStorage.setItem('si_students', JSON.stringify(updated));
    const wasAdded = updated.length > students.length;
    const wasRemoved = updated.length < students.length;
    let logText = 'Data Mahasiswa Diperbarui';
    if (wasAdded) {
      const addedStudent = updated[0];
      logText = `Mahasiswa Baru Terdaftar: ${addedStudent.name}`;
    } else if (wasRemoved) {
      logText = 'Anggota Kelas Telah Dihapus';
    }
    const updatedLogs: ActivityLog[] = [
      { id: `log-${Date.now()}`, text: logText, time: 'Baru saja', author: 'Admin', type: 'primary' },
      ...logs
    ];
    setLogs(updatedLogs);
    localStorage.setItem('si_logs', JSON.stringify(updatedLogs));
  };

  const handleUpdateGallery = (updated: GalleryItem[]) => {
    setGalleryItems(updated);
    localStorage.setItem('si_gallery', JSON.stringify(updated));
    const updatedLogs: ActivityLog[] = [
      { id: `log-${Date.now()}`, text: 'Foto Galeri Kelas Baru Ditambahkan', time: 'Baru saja', author: 'Admin', type: 'primary' },
      ...logs
    ];
    setLogs(updatedLogs);
    localStorage.setItem('si_logs', JSON.stringify(updatedLogs));
  };

  const handleUpdateClassConfig = (updated: ClassConfig) => {
    setClassConfig(updated);
    localStorage.setItem('si_config', JSON.stringify(updated));
  };

  // Contacts state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    // Send visual log to admin activity feed
    const updatedLogs: ActivityLog[] = [
      {
        id: `log-${Date.now()}`,
        text: `Pesan Kontak Diterima dari ${contactForm.name}`,
        time: 'Baru saja',
        author: contactForm.email || 'Sistem',
        type: 'warning',
      },
      ...logs,
    ];
    setLogs(updatedLogs);
    localStorage.setItem('si_logs', JSON.stringify(updatedLogs));

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Gallery view page lightbox state
  const [gallerySelected, setGallerySelected] = useState<GalleryItem | null>(null);

  // Parallax / Scroll Progress Indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Schedule filtering by Day
  const [selectedSchDay, setSelectedSchDay] = useState<string>('Senin');

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  // Dynamic Administration View
  if (isAdmin) {
    return (
      <AdminPanel
        schedules={schedules}
        students={students}
        galleryItems={galleryItems}
        logs={logs}
        classConfig={classConfig}
        onUpdateSchedules={handleUpdateSchedules}
        onUpdateStudents={handleUpdateStudents}
        onUpdateGallery={handleUpdateGallery}
        onUpdateClassConfig={handleUpdateClassConfig}
        onLogout={() => {
          setIsAdmin(false);
          localStorage.removeItem('si_is_admin');
        }}
      />
    );
  }

  // Secure Portal Login Screen
  if (isLoggingIn) {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsLoggingIn(false);
        }}
        onCancel={() => setIsLoggingIn(false)}
      />
    );
  }

  return (
    <div className="min-h-screen text-[#161c22] relative flex flex-col font-sans hexagon-pattern">
      {/* 1. Scroll Progress Bar at the absolute top of browser window */}
      <motion.div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-primary via-[#3fa9f5] to-secondary z-[99] origin-left"
        style={{ scaleX }}
      />

      {/* Dynamic Background Glowing Orbs for Soft Glow Effect & Gradient Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-20 left-[15%] w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 left-[20%] w-[350px] h-[350px] bg-cyan-200/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Interactive Decorative Hexagons */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden opacity-10">
        <div className="absolute top-48 left-[5%] w-16 h-16 bg-primary hexagon-mask animate-float-slow" />
        <div className="absolute top-96 right-[8%] w-24 h-24 bg-[#3fa9f5] hexagon-mask animate-float-medium" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[25%] left-[8%] w-20 h-20 bg-[#1d4ed8] hexagon-mask animate-float-fast" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-40 right-[15%] w-14 h-14 bg-primary-container hexagon-mask animate-float-slow" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* 2. Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm select-none">
        <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4.5 max-w-7xl mx-auto">
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="hexagon-mask flex items-center justify-center overflow-hidden cursor-pointer bg-slate-100 shrink-0"
              style={{ width: '48px', height: '48px' }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              onClick={() => {
                setActivePage('home');
                setIsMobileMenuOpen(false);
              }}
            >
              <img 
                style={{ width: '48px', height: '48px' }}
                className="object-cover animate-pulse-slow" 
                src={getLogoSrc(classConfig.logoUrl)} 
                alt="Logo S Hexagon"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <span 
              className="text-sm sm:text-base md:text-lg font-bold text-primary font-sans cursor-pointer tracking-tight truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none"
              onClick={() => {
                setActivePage('home');
                setIsMobileMenuOpen(false);
              }}
            >
              {classConfig.className || 'Sistem Informasi Kelas C'}
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex gap-8 items-center relative">
            {[
              { id: 'home', label: 'Home' },
              { id: 'tentang-kelas', label: 'Tentang Kelas' },
              { id: 'jadwal-kuliah', label: 'Jadwal Perkuliahan' },
              { id: 'galeri', label: 'Galeri' }
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setActivePage(page.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm font-semibold transition-colors duration-300 relative py-1 cursor-pointer ${
                  activePage === page.id ? 'text-primary' : 'text-slate-500 hover:text-primary'
                }`}
              >
                <span>{page.label}</span>
                {activePage === page.id && (
                  <motion.div 
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Controls: Desktop Login or Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3">
            {/* Login Admin Button (Desktop Only) */}
            <motion.button
              id="login-admin-btn"
              onClick={() => setIsLoggingIn(true)}
              className="hidden md:flex bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-md shadow-blue-500/10 cursor-pointer border border-primary/20 hover:bg-[#006399]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Login Admin
            </motion.button>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="flex md:hidden p-2 text-primary hover:text-[#006399] transition-colors focus:outline-none cursor-pointer rounded-lg bg-slate-100 hover:bg-slate-200"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-xl font-bold flex items-center justify-center">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden w-full bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl overflow-hidden flex flex-col px-5 py-4 gap-3 select-none"
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'tentang-kelas', label: 'Tentang Kelas' },
                { id: 'jadwal-kuliah', label: 'Jadwal Perkuliahan' },
                { id: 'galeri', label: 'Galeri' }
              ].map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setActivePage(page.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-xs sm:text-sm font-bold py-2.5 px-3 rounded-lg transition-all ${
                    activePage === page.id 
                      ? 'bg-primary/10 text-primary border-l-4 border-primary pl-4' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  {page.label}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={() => {
                  setIsLoggingIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-[#006399] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md text-center transition-all cursor-pointer active:scale-95"
              >
                Login Admin Portal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. Hero Parallax / Splash Header on Public Pages */}
      <header className="relative pt-32 pb-16 px-6 overflow-hidden max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Soft Glow Ambient Orbs inside main content */}
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
      </header>

      {/* 4. Main content routing with Smooth Page Transition (AnimatePresence) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-24 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            className="w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* VIEW ROUTE: HOME */}
            {activePage === 'home' && (
              <div className="flex flex-col gap-12">
                {/* Modern Class Hero Banner with Premium Glassmorphism */}
                <motion.div 
                  className="glass-card p-5 sm:p-8 md:p-12 rounded-3xl border border-slate-200/50 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
                  <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />
                  
                  {/* Text Contents */}
                  <div className="flex-1 text-center md:text-left flex flex-col gap-4">
                    <div className="flex items-center gap-2.5 justify-center md:justify-start">
                      <span className="bg-primary-container/20 text-[#006399] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest font-sans uppercase">
                        PORTAL RESMI
                      </span>
                      <span className="w-12 h-px bg-[#bfc7d2]/40 hidden md:inline"></span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                      Selamat Datang di Portal Kelas <span className="text-primary text-gradient">{classConfig.className || 'Sistem Informasi Kelas C'}</span>
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                      Selamat datang di platform kolaboratif digital program studi {classConfig.className || 'Sistem Informasi Kelas C'} angkatan {classConfig.academicYear || '2025'} {classConfig.university || 'Universitas Islam Negeri Raden Intan Lampung'}. Akses semua data jadwal perkuliahan, direktori mahasiswa, dan dokumentasi foto kegiatan secara real-time.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                      <button 
                        onClick={() => { setActivePage('jadwal-kuliah'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#006399] transition-all cursor-pointer active:scale-95"
                      >
                        Lihat Jadwal Kuliah
                      </button>
                      <button 
                        onClick={() => { setActivePage('tentang-kelas'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                      >
                        Profil Akademik
                      </button>
                    </div>
                  </div>

                  {/* Aesthetic Right-side Logo Representation */}
                  <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative flex items-center justify-center">
                    {/* Glowing effect following the hexagon shape */}
                    <div className="absolute inset-2 bg-gradient-to-br from-[#3fa9f5] to-[#006399] opacity-20 blur-2xl hexagon-mask"></div>
                    <motion.div 
                      className="w-40 h-40 md:w-48 md:h-48 bg-white p-1.5 hexagon-mask flex items-center justify-center shadow-xl border border-slate-200/50"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-full h-full hexagon-mask bg-slate-50 flex items-center justify-center overflow-hidden">
                        <img 
                          className="w-full h-full object-cover"
                          src={getLogoSrc(classConfig.logoUrl)}
                          alt="Logo Kelas S Hexagon"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Quick Info Grid representing class features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                    <div className="w-12 h-12 hexagon-mask bg-gradient-to-br from-[#3fa9f5]/15 to-[#006399]/15 text-primary flex items-center justify-center shrink-0 border border-[#3fa9f5]/25 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 font-sans mb-1">Jadwal Terintegrasi</h3>
                      <p className="text-xs text-slate-400 leading-normal">Akses jadwal harian teori dan praktikum secara fleksibel.</p>
                    </div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                    <div className="w-12 h-12 hexagon-mask bg-gradient-to-br from-[#3fa9f5]/15 to-[#006399]/15 text-primary flex items-center justify-center shrink-0 border border-[#3fa9f5]/25 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">group</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 font-sans mb-1">Profil &amp; Organisasi</h3>
                      <p className="text-xs text-slate-400 leading-normal">Kenali jajaran pengurus, dosen pembina, dan anggota aktif.</p>
                    </div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                    <div className="w-12 h-12 hexagon-mask bg-gradient-to-br from-[#3fa9f5]/15 to-[#006399]/15 text-primary flex items-center justify-center shrink-0 border border-[#3fa9f5]/25 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">photo_library</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 font-sans mb-1">Kenangan &amp; Galeri</h3>
                      <p className="text-xs text-slate-400 leading-normal">Dokumentasi momen berharga dari perkuliahan dan event kelas.</p>
                    </div>
                  </div>
                </div>

                {/* Velocity Scroll Ticker element */}
                <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-4">
                  <VelocityScroll />
                </div>
              </div>
            )}

            {/* VIEW ROUTE: TENTANG KELAS */}
            {activePage === 'tentang-kelas' && (
              <AboutClass galleryItems={galleryItems} students={students} />
            )}

            {/* VIEW ROUTE: JADWAL KULIAH */}
            {activePage === 'jadwal-kuliah' && (
              <div className="w-full">
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary-container/20 text-[#006399] px-3.5 py-1 rounded-full text-xs font-bold font-sans uppercase">
                      AKADEMIK
                    </span>
                    <span className="w-12 h-px bg-slate-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-sans">
                    Jadwal Perkuliahan Kelas
                  </h2>
                  <p className="text-slate-500 text-sm mt-2 max-w-2xl font-sans">
                    Sistem informasi kalender kuliah aktif mingguan kelas Sistem Informasi. Silakan saring berdasarkan hari untuk mengakses agenda detail.
                  </p>
                </div>

                {/* Day selector tabs */}
                <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-200 pb-5">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedSchDay(day)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                        selectedSchDay === day
                          ? 'bg-primary text-white border-primary shadow-lg shadow-blue-500/10'
                          : 'bg-white text-slate-500 hover:text-primary hover:bg-[#eef4fc]/40 border-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Schedules list cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schedules.filter(s => s.day === selectedSchDay).length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                      <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">calendar_today</span>
                      <p className="text-slate-500 text-sm">Tidak ada perkuliahan aktif di hari {selectedSchDay}.</p>
                    </div>
                  ) : (
                    schedules.filter(s => s.day === selectedSchDay).map((sch) => (
                      <motion.div
                        key={sch.id}
                        className="glass-card p-6 rounded-2xl border border-slate-200/50 shadow-sm relative group flex flex-col justify-between hover:border-primary duration-300 transition-all"
                        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0,99,153,0.06)' }}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg">
                              {sch.time}
                            </span>
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase font-mono ${
                              sch.type === 'Teori' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-green-50 text-green-700 border border-green-100'
                            }`}>
                              {sch.type}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                            {sch.subject}
                          </h4>
                          <p className="text-xs text-slate-500 mt-2 font-sans font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">person</span>
                            Dosen: {sch.lecturer}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                            <span>Ruang: {sch.room}</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase text-slate-400">SI-CLASS // 2025</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* VIEW ROUTE: GALERI */}
            {activePage === 'galeri' && (
              <div className="w-full">
                {/* Header */}
                <div className="mb-12 text-center">
                  <div className="inline-block px-4 py-1.5 bg-primary-container/20 text-[#006399] rounded-full text-xs font-bold font-sans tracking-widest uppercase mb-4">
                    ALBUM VISUAL
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-sans">
                    Galeri Dokumentasi Sistem Informasi
                  </h2>
                  <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                    Menyimpan rekam jejak digital serta kenangan seputar aktivitas kelas, organisasi kemahasiswaan, praktikum, kunjungan riset, hingga perayaan wisuda.
                  </p>
                </div>

                {/* Photo Grid with Zoom Hover Effects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryItems.map((photo) => (
                    <motion.div
                      key={photo.id}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-md shadow-slate-100 hover:shadow-xl hover:border-primary duration-300 transition-all cursor-zoom-in h-60"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setGallerySelected(photo)}
                    >
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end text-white text-left">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-blue-300 mb-1">{photo.category} // {photo.date}</span>
                        <h4 className="text-sm font-bold truncate leading-snug">{photo.title}</h4>
                        <p className="text-[10px] text-slate-300 line-clamp-1 mt-1">{photo.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Lightbox Trigger Dialog */}
                <Lightbox
                  isOpen={gallerySelected !== null}
                  imageUrl={gallerySelected?.imageUrl || ''}
                  title={gallerySelected?.title || ''}
                  description={gallerySelected?.description || ''}
                  onClose={() => setGallerySelected(null)}
                />
              </div>
            )}


          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Footer matching design styles */}
      <footer className="w-full py-12 bg-[#ffffff] border-t border-[#bfc7d2]/30 select-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {/* Column 1 Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 hexagon-mask bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <img 
                  className="w-full h-full object-cover" 
                  src={getLogoSrc(classConfig.logoUrl)} 
                  alt="Footer Logo" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-slate-800 font-sans tracking-tight">SI Kelas</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-sans">
              Sistem Manajemen Informasi terintegrasi untuk mendukung keunggulan akademik dan operasional di era digital kelas {classConfig.className || 'Sistem Informasi'}.
            </p>
          </div>

          {/* Column 2 Nav Links */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest font-sans mb-5">Navigasi</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-secondary cursor-pointer">
                  Dashboard Utama
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('tentang-kelas'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-secondary cursor-pointer">
                  Profil &amp; Akademik
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('jadwal-kuliah'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-secondary cursor-pointer">
                  Kalender Kuliah
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('galeri'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-secondary cursor-pointer">
                  Galeri Foto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 Contacts info */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest font-sans mb-5">Hubungi Kami</h4>
            <div className="flex items-start gap-2 text-slate-400 text-xs font-semibold leading-relaxed">
              <span className="material-symbols-outlined text-primary text-sm shrink-0">location_on</span>
              <span>Fakultas Sains dan Teknologi Tower 1 UIN Raden Intan Lampung</span>
            </div>
            
            <div className="flex flex-col gap-3 mt-4">
              <a 
                href="https://saintek.radenintan.ac.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Saintek UIN RIL"
                className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-base shrink-0">public</span>
                <span>https://saintek.radenintan.ac.id</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#bfc7d2]/20 text-center text-slate-400 text-xs font-semibold font-sans">
          © 2025 {classConfig.university || 'Sistem Informasi'}. Academic Precision &amp; Collaborative Growth.
        </div>
      </footer>
    </div>
  );
}
