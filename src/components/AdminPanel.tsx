import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Schedule, Student, GalleryItem, ActivityLog, ClassConfig } from '../types';

interface AdminPanelProps {
  schedules: Schedule[];
  students: Student[];
  galleryItems: GalleryItem[];
  logs: ActivityLog[];
  classConfig: ClassConfig;
  onUpdateSchedules: (updated: Schedule[]) => void;
  onUpdateStudents: (updated: Student[]) => void;
  onUpdateGallery: (updated: GalleryItem[]) => void;
  onUpdateClassConfig: (updated: ClassConfig) => void;
  onLogout: () => void;
}

type AdminTab = 'dashboard' | 'schedule' | 'gallery' | 'students' | 'settings';

export default function AdminPanel({
  schedules,
  students,
  galleryItems,
  logs,
  classConfig,
  onUpdateSchedules,
  onUpdateStudents,
  onUpdateGallery,
  onUpdateClassConfig,
  onLogout,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modals state
  const [showGalModal, setShowGalModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // New item forms state
  const [newGal, setNewGal] = useState({ title: '', description: '', category: 'Akademik', imageUrl: '' });
  const [galleryFile, setGalleryFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [newSch, setNewSch] = useState({ day: 'Senin', subject: '', room: '', lecturer: '', time: '', type: 'Teori' as Schedule['type'] });
  const [newStudent, setNewStudent] = useState({ nim: '', name: '', role: '', status: 'Aktif' as Student['status'], email: '', phone: '', avatar: '' });

  // Filter query for tab contents
  const [studentSearch, setStudentSearch] = useState('');
  const [logoUploadMode, setLogoUploadMode] = useState<'file' | 'url'>('file');
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  const handleLogoFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64Data = e.target.result as string;
        onUpdateClassConfig({ ...classConfig, logoUrl: base64Data });
        alert('Logo kelas berhasil diperbarui!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setGalleryFile(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Form submit handlers
  const handleAddGallery = (e: FormEvent) => {
    e.preventDefault();
    if (!newGal.title || !newGal.description) return;

    let finalImageUrl = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800';
    if (uploadMode === 'file') {
      if (!galleryFile) {
        alert('Silakan pilih berkas foto untuk diunggah.');
        return;
      }
      finalImageUrl = galleryFile;
    } else {
      if (!newGal.imageUrl) {
        alert('Silakan masukkan tautan URL gambar.');
        return;
      }
      finalImageUrl = newGal.imageUrl;
    }

    const added: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGal.title,
      description: newGal.description,
      category: newGal.category,
      imageUrl: finalImageUrl,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    onUpdateGallery([added, ...galleryItems]);
    setNewGal({ title: '', description: '', category: 'Akademik', imageUrl: '' });
    setGalleryFile(null);
    setShowGalModal(false);
  };

  const handleAddSchedule = (e: FormEvent) => {
    e.preventDefault();
    if (!newSch.subject || !newSch.room || !newSch.lecturer || !newSch.time) return;

    const added: Schedule = {
      id: `sch-${Date.now()}`,
      day: newSch.day,
      subject: newSch.subject,
      room: newSch.room,
      lecturer: newSch.lecturer,
      time: newSch.time,
      type: newSch.type
    };

    onUpdateSchedules([...schedules, added]);
    setNewSch({ day: 'Senin', subject: '', room: '', lecturer: '', time: '', type: 'Teori' });
    setShowScheduleModal(false);
  };

  const handleAddStudent = (e: FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.nim || !newStudent.email) return;

    const added: Student = {
      id: `st-${Date.now()}`,
      nim: newStudent.nim,
      name: newStudent.name,
      role: newStudent.role || undefined,
      status: newStudent.status,
      email: newStudent.email,
      phone: newStudent.phone || undefined,
      avatar: newStudent.avatar || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?w=150`
    };

    onUpdateStudents([added, ...students]);
    setNewStudent({ nim: '', name: '', role: '', status: 'Aktif', email: '', phone: '', avatar: '' });
    setShowStudentModal(false);
  };

  const handleDeleteSchedule = (id: string) => {
    onUpdateSchedules(schedules.filter(s => s.id !== id));
  };

  const handleDeleteStudent = (id: string) => {
    onUpdateStudents(students.filter(s => s.id !== id));
  };

  const handleDeleteGallery = (id: string) => {
    onUpdateGallery(galleryItems.filter(g => g.id !== id));
  };

  // Filter students
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.nim.includes(studentSearch) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f6f9ff] text-slate-800 w-full relative">
      {/* Scrim Overlay for Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-35 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation matching Image 2 with mobile slide-in drawer */}
      <aside className={`bg-[#e8eef6] w-64 border-r border-[#bfc7d2]/50 shadow-xl md:shadow-md flex flex-col p-5 gap-4 z-40 shrink-0 fixed inset-y-0 left-0 transition-transform duration-300 md:static md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-3">
            {/* Hexagonal logo in primary-container rotate-45 */}
            <div className="w-10 h-10 bg-[#3fa9f5] rounded-xl flex items-center justify-center transform rotate-45 shadow-sm shadow-blue-500/20">
              <span className="material-symbols-outlined text-white transform -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                hexagon
              </span>
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide text-primary uppercase font-sans">
                Admin Panel
              </h1>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                SI Management System
              </p>
            </div>
          </div>

          {/* Close button for sidebar on mobile screens */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Tutup Navigasi"
          >
            <span className="material-symbols-outlined text-sm flex items-center justify-center">close</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 flex flex-col gap-1.5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'schedule', label: 'Manage Schedule', icon: 'calendar_month' },
            { id: 'gallery', label: 'Gallery Uploads', icon: 'photo_library' },
            { id: 'students', label: 'Students', icon: 'group' },
            { id: 'settings', label: 'Settings', icon: 'settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as AdminTab);
                setIsSidebarOpen(false);
              }}
              className={`rounded-xl flex items-center gap-3.5 px-4.5 py-3.5 font-bold text-sm cursor-pointer transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-primary to-[#006399] text-white shadow-md shadow-blue-500/10'
                  : 'text-slate-500 hover:bg-slate-300/35 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* CTA Logout */}
        <div className="pt-4 border-t border-[#bfc7d2]/30">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-secondary hover:bg-secondary/5 text-secondary rounded-xl font-bold text-sm cursor-pointer transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Keluar Panel
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto overflow-y-auto w-full">
        {/* Top Header Row */}
        <header className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-8 border-b border-[#bfc7d2]/30 pb-5">
          <div className="flex items-center gap-3">
            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-primary transition-colors cursor-pointer flex items-center justify-center shadow-sm"
              title="Buka Navigasi"
            >
              <span className="material-symbols-outlined text-xl flex items-center justify-center">menu</span>
            </button>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 capitalize font-sans">
                {activeTab === 'dashboard' ? 'Dashboard Overview' : `${activeTab} Management`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {activeTab === 'dashboard' ? 'Welcome back, system administrator.' : `Configure and coordinate ${activeTab} metadata.`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-300 overflow-hidden border border-[#bfc7d2]/60 shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYJ20c2ilmAvk8spxQDtFDBYsQ0EVzvSqsHdxKCC4PWHGv22JN0KoZjSt2u81esSpkgpqnjX-8-79cZfs0KNnqvQGq0YStvZB-oeshgXU0K--dU7ICTIfpCWEh5g1aZZ2mwdN_icC3t1RBIa2KtUJBDA8pJ0V2vOuYzDl8Ilisj9UVfPjFYpSdI5hUgL7V3r-UiQ5cV6z5D_21WxR21UyZt4cjinR-oRh9Qy-ByT2WjCMxR1wv-ERs"
                alt="IT Admin headshot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* TAB CONTROLLERS */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Summary Cards Grid matching Image 2 */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Total Students Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/35 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#3fa9f5]/10 rounded-full blur-xl group-hover:bg-[#3fa9f5]/20 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 text-primary rounded-xl border border-blue-100">
                      <span className="material-symbols-outlined text-3xl">school</span>
                    </div>
                    <span className="bg-[#eef4fc] text-primary text-xs px-2.5 py-1 rounded-lg font-bold">
                      +12% Angkatan
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Students</h3>
                  <p className="text-3xl font-black text-slate-900 font-mono">2,450</p>
                </div>

                {/* Upcoming Events Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/35 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/15 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-50 text-secondary rounded-xl border border-indigo-100">
                      <span className="material-symbols-outlined text-3xl">event_upcoming</span>
                    </div>
                    <span className="bg-[#eef4fc] text-[#1d4ed8] text-xs px-2.5 py-1 rounded-lg font-bold">
                      Besok: MBKM
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Upcoming Events</h3>
                  <p className="text-3xl font-black text-slate-900 font-mono">14</p>
                </div>

                {/* Gallery Uploads Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/35 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group col-span-1 sm:col-span-2 lg:col-span-1">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container/10 rounded-full blur-xl group-hover:bg-tertiary-container/20 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-50 text-tertiary rounded-xl border border-amber-100">
                      <span className="material-symbols-outlined text-3xl">photo_library</span>
                    </div>
                    <span className="bg-[#fff1d6] text-tertiary text-xs px-2.5 py-1 rounded-lg font-bold">
                      Galeri Foto
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Gallery Uploads</h3>
                  <p className="text-3xl font-black text-slate-900 font-mono">{galleryItems.length}</p>
                </div>
              </section>

              {/* Bento Grid with Feed & Quick Actions */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* System Activity Logs list */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#bfc7d2]/35 p-5 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 font-sans">System Activity Logs</h3>
                    <span className="px-3 py-1 bg-[#eef4fc] text-primary text-xs font-bold rounded-lg font-mono">
                      LIVE FEED
                    </span>
                  </div>
                  <div className="space-y-5">
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className={`w-3 h-3 mt-1.5 rounded-full shrink-0 ${
                          log.type === 'primary' ? 'bg-[#3fa9f5] shadow-[0_0_8px_rgba(63,169,245,0.4)]' :
                          log.type === 'secondary' ? 'bg-[#1d4ed8] shadow-[0_0_8px_rgba(29,78,216,0.4)]' :
                          'bg-tertiary shadow-[0_0_8px_rgba(218,148,0,0.4)]'
                        }`} />
                        <div className="flex-1">
                          <p className="text-slate-800 text-sm font-semibold">{log.text}</p>
                          <p className="text-xs text-slate-400 font-medium mt-1 font-sans">
                            Oleh {log.author} • {log.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-gradient-to-br from-white to-[#eef4fc]/40 rounded-2xl border border-[#bfc7d2]/35 p-5 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-sans mb-5">Quick Actions</h3>
                    <div className="space-y-3.5">
                      <button
                        onClick={() => setShowGalModal(true)}
                        className="w-full flex items-center justify-between bg-[#006399] hover:bg-primary text-white px-5 py-3.5 rounded-xl font-bold text-xs md:text-sm shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer"
                      >
                        <span>Unggah Foto Galeri</span>
                        <span className="material-symbols-outlined text-lg">upload</span>
                      </button>

                      <button
                        onClick={() => setShowScheduleModal(true)}
                        className="w-full flex items-center justify-between bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary px-5 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm cursor-pointer"
                      >
                        <span>Tambah Jadwal Kuliah</span>
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                      </button>

                      <button
                        onClick={() => setShowStudentModal(true)}
                        className="w-full flex items-center justify-between bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary px-5 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm cursor-pointer"
                      >
                        <span>Daftarkan Mahasiswa</span>
                        <span className="material-symbols-outlined text-lg">person_add</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#bfc7d2]/20 text-[10px] text-slate-400 font-mono text-center tracking-wider">
                    SECURED PORTAL // ENCRYPTION AES-256
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* SCHEDULE MANAGEMENT TAB */}
          {activeTab === 'schedule' && (
            <motion.div
              key="schedule-tab"
              className="bg-white rounded-2xl border border-[#bfc7d2]/35 p-8 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Daftar Jadwal Perkuliahan</h3>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Tambah Jadwal
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm text-slate-600 font-sans">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 border-b border-slate-100">
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Hari</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Mata Kuliah</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Dosen</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Ruang</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Waktu</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center">Tipe</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((sch) => (
                      <tr key={sch.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-4 px-4 font-bold text-slate-800">{sch.day}</td>
                        <td className="py-4 px-4 font-semibold text-primary">{sch.subject}</td>
                        <td className="py-4 px-4">{sch.lecturer}</td>
                        <td className="py-4 px-4 font-mono text-xs">{sch.room}</td>
                        <td className="py-4 px-4 text-xs font-mono">{sch.time}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase font-mono ${
                            sch.type === 'Teori' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-green-50 text-green-700 border border-green-100'
                          }`}>
                            {sch.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleDeleteSchedule(sch.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* GALLERY MANAGEMENT TAB */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery-tab"
              className="bg-white rounded-2xl border border-[#bfc7d2]/35 p-8 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Manajemen Galeri Foto</h3>
                <button
                  onClick={() => setShowGalModal(true)}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">upload</span>
                  Unggah Foto
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((g) => (
                  <div key={g.id} className="border border-slate-200/70 rounded-xl overflow-hidden shadow-sm relative group bg-white">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 cursor-pointer transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1 text-[10px] font-mono text-slate-400">
                        <span>{g.category}</span>
                        <span>{g.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 truncate">{g.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{g.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STUDENTS DATABASE TAB */}
          {activeTab === 'students' && (
            <motion.div
              key="students-tab"
              className="bg-white rounded-2xl border border-[#bfc7d2]/35 p-8 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold">Direktori Mahasiswa Sistem Informasi</h3>
                  <p className="text-xs text-slate-400 mt-1">Saring atau daftarkan personil angkatan aktif.</p>
                </div>

                <div className="flex gap-3">
                  <div className="relative w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Cari NIM/Nama..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    onClick={() => setShowStudentModal(true)}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    Tambah
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm text-slate-600 font-sans">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Mahasiswa</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">NIM</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Jabatan / Peran</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">Email</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((st) => (
                      <tr key={st.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img src={st.avatar} alt={st.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                          <span className="font-bold text-slate-800">{st.name}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs">{st.nim}</td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-500">
                          {st.role || <span className="text-slate-300 font-normal">Anggota Kelas</span>}
                        </td>
                        <td className="py-3.5 px-4 text-xs">{st.email}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            st.status === 'Aktif' ? 'bg-green-50 text-green-700 border border-green-100' :
                            st.status === 'Cuti' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleDeleteStudent(st.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* CLASS SETTINGS TAB */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings-tab"
              className="bg-white rounded-2xl border border-[#bfc7d2]/35 p-8 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-lg font-bold mb-6 border-b border-slate-100 pb-3">Konfigurasi Profil Kelas & Universitas</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Kelas / Prodi</label>
                  <input
                    type="text"
                    value={classConfig.className}
                    onChange={(e) => onUpdateClassConfig({ ...classConfig, className: e.target.value })}
                    className="p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Universitas</label>
                  <input
                    type="text"
                    value={classConfig.university}
                    onChange={(e) => onUpdateClassConfig({ ...classConfig, university: e.target.value })}
                    className="p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Fakultas</label>
                  <input
                    type="text"
                    value={classConfig.faculty}
                    onChange={(e) => onUpdateClassConfig({ ...classConfig, faculty: e.target.value })}
                    className="p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Akreditasi</label>
                  <input
                    type="text"
                    value={classConfig.accreditation}
                    onChange={(e) => onUpdateClassConfig({ ...classConfig, accreditation: e.target.value })}
                    className="p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Logo Kelas Upload Section */}
              <div className="flex flex-col gap-3 mb-6 p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">image</span> Logo Kelas
                </h4>
                
                {/* Method selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl max-w-sm">
                  <button
                    type="button"
                    onClick={() => setLogoUploadMode('file')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      logoUploadMode === 'file'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Upload Berkas Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoUploadMode('url')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      logoUploadMode === 'url'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Gunakan Link URL
                  </button>
                </div>

                {logoUploadMode === 'file' ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                      isDraggingLogo ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary hover:bg-slate-50'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(true);
                    }}
                    onDragLeave={() => setIsDraggingLogo(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(false);
                      if (e.dataTransfer.files?.[0]) {
                        handleLogoFileChange(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => {
                      document.getElementById('logo-file-input')?.click();
                    }}
                  >
                    <input
                      id="logo-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleLogoFileChange(e.target.files[0]);
                        }
                      }}
                    />
                    {classConfig.logoUrl ? (
                      <div className="flex items-center justify-center gap-4">
                        <img src={classConfig.logoUrl} alt="Logo Kelas" className="w-16 h-16 object-cover rounded-xl shadow-sm border border-slate-100 bg-white" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-700">Logo Kelas Aktif</p>
                          <p className="text-[10px] text-slate-400">Klik atau seret logo baru untuk mengganti</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 py-1">
                        <span className="material-symbols-outlined text-2xl text-slate-400">upload_file</span>
                        <p className="text-xs font-bold text-slate-700">Pilih berkas logo atau seret ke sini</p>
                        <p className="text-[9px] text-slate-400">Mendukung PNG, JPG, JPEG, WEBP</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/logo.png"
                      value={classConfig.logoUrl || ''}
                      onChange={(e) => onUpdateClassConfig({ ...classConfig, logoUrl: e.target.value })}
                      className="flex-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase">Visi Kelas / Prodi</label>
                <textarea
                  value={classConfig.vision}
                  onChange={(e) => onUpdateClassConfig({ ...classConfig, vision: e.target.value })}
                  className="p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary h-24"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 text-slate-500 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl shrink-0">info</span>
                <p className="text-xs leading-normal">
                  <strong>Pemberitahuan Sinkronisasi:</strong> Semua perubahan metadata pengaturan kelas ini akan secara langsung tercermin dan memperbarui tata letak di halaman publik <strong>"Tentang Kelas"</strong> secara real-time.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ALL INTERACTIVE MODAL DIALOGS */}
      
      {/* 2. Upload Gallery Modal */}
      <AnimatePresence>
        {showGalModal && (
          <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" onClick={() => setShowGalModal(false)} />
            <motion.form onSubmit={handleAddGallery} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl border border-slate-100 z-10 flex flex-col gap-4" initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}>
              <h3 className="text-xl font-bold border-b border-slate-100 pb-3 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">photo_library</span> Unggah Foto Galeri Baru
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Judul Foto</label>
                <input type="text" placeholder="Masukkan judul..." required value={newGal.title} onChange={(e) => setNewGal({ ...newGal, title: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Kategori</label>
                <input type="text" placeholder="Contoh: Akademik, Organisasi, Kegiatan..." required value={newGal.category} onChange={(e) => setNewGal({ ...newGal, category: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              {/* Mode Selector for Uploading / URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Metode Input Gambar</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      uploadMode === 'file'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Upload Berkas Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      uploadMode === 'url'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Gunakan Link URL
                  </button>
                </div>
              </div>

              {/* Dynamic Image Input Element */}
              {uploadMode === 'file' ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Pilih Berkas Foto</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary hover:bg-slate-50'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files?.[0]) {
                        handleFileChange(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => {
                      document.getElementById('gallery-file-input')?.click();
                    }}
                  >
                    <input
                      id="gallery-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                    />
                    {galleryFile ? (
                      <div className="relative group max-w-xs mx-auto">
                        <img src={galleryFile} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-sm" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryFile(null);
                          }}
                          className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-md transition-all"
                        >
                          <span className="material-symbols-outlined text-xs flex items-center justify-center">close</span>
                        </button>
                        <p className="text-[10px] text-slate-500 mt-2 font-bold">Klik atau seret gambar baru untuk mengganti</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <span className="material-symbols-outlined text-3xl text-slate-400">cloud_upload</span>
                        <p className="text-xs font-bold text-slate-700">Pilih berkas foto atau seret ke sini</p>
                        <p className="text-[10px] text-slate-400">Mendukung PNG, JPG, JPEG, WEBP hingga 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Gambar URL (Hotlink URL)</label>
                  <input type="text" placeholder="https://images.unsplash.com/..." value={newGal.imageUrl} onChange={(e) => setNewGal({ ...newGal, imageUrl: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Keterangan / Keterangan Singkat</label>
                <textarea placeholder="Tulis deskripsi atau konteks gambar..." required value={newGal.description} onChange={(e) => setNewGal({ ...newGal, description: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary h-24" />
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setShowGalModal(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs md:text-sm cursor-pointer hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs md:text-sm cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 transition-all">Simpan Foto</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Add Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" onClick={() => setShowScheduleModal(false)} />
            <motion.form onSubmit={handleAddSchedule} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl border border-slate-100 z-10 flex flex-col gap-4" initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}>
              <h3 className="text-xl font-bold border-b border-slate-100 pb-3 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">calendar_month</span> Tambah Jadwal Kuliah Baru
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Hari</label>
                  <select value={newSch.day} onChange={(e) => setNewSch({ ...newSch, day: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary">
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Tipe Perkuliahan</label>
                  <select value={newSch.type} onChange={(e) => setNewSch({ ...newSch, type: e.target.value as Schedule['type'] })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary">
                    <option value="Teori">Teori</option>
                    <option value="Praktikum">Praktikum</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Mata Kuliah</label>
                <input type="text" placeholder="Contoh: Pemrograman Web Lanjut" required value={newSch.subject} onChange={(e) => setNewSch({ ...newSch, subject: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Dosen Pengampu</label>
                <input type="text" placeholder="Contoh: Dr. Irwan Santoso" required value={newSch.lecturer} onChange={(e) => setNewSch({ ...newSch, lecturer: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Ruangan</label>
                  <input type="text" placeholder="Contoh: Lab Komputer 3" required value={newSch.room} onChange={(e) => setNewSch({ ...newSch, room: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Waktu / Jam</label>
                  <input type="text" placeholder="Contoh: 08:00 - 10:30" required value={newSch.time} onChange={(e) => setNewSch({ ...newSch, time: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs md:text-sm cursor-pointer hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs md:text-sm cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 transition-all">Simpan Jadwal</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Add Student Modal */}
      <AnimatePresence>
        {showStudentModal && (
          <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" onClick={() => setShowStudentModal(false)} />
            <motion.form onSubmit={handleAddStudent} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl border border-slate-100 z-10 flex flex-col gap-4" initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}>
              <h3 className="text-xl font-bold border-b border-slate-100 pb-3 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">person_add</span> Daftarkan Mahasiswa Baru
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">NIM (Nomor Induk Mahasiswa)</label>
                  <input type="text" placeholder="Contoh: 240901006" required value={newStudent.nim} onChange={(e) => setNewStudent({ ...newStudent, nim: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary font-mono" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Status Akademik</label>
                  <select value={newStudent.status} onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as Student['status'] })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary">
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Lulus">Lulus</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap</label>
                <input type="text" placeholder="Contoh: Sarah Azhari" required value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Jabatan / Peran Kelas (Opsional)</label>
                <input type="text" placeholder="Contoh: Divisi Kehumasan, Anggota Kelas..." value={newStudent.role} onChange={(e) => setNewStudent({ ...newStudent, role: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Email Mahasiswa</label>
                  <input type="email" placeholder="sarah@si-hexagon.ac.id" required value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary text-xs" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">No. Handphone (Opsional)</label>
                  <input type="text" placeholder="0812-xxxx-xxxx" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} className="p-3 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setShowStudentModal(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs md:text-sm cursor-pointer hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs md:text-sm cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 transition-all">Daftarkan</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
