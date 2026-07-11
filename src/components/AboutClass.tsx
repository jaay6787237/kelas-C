import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem, Student } from '../types';
import Lightbox from './Lightbox';
import lendraAvatar from '../assets/images/lendra_class_leader.jpg';
import maleGroup from '../assets/images/male_students_group_1783752225853.jpg';
import femaleGroup from '../assets/images/female_students_group_1783752241370.jpg';

interface AboutClassProps {
  galleryItems: GalleryItem[];
  students: Student[];
}

export default function AboutClass({ galleryItems, students }: AboutClassProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [memberSearch, setMemberSearch] = useState('');
  const [[page, direction], setPage] = useState([0, 0]);
  const classPhotos = [maleGroup, femaleGroup];
  const currentPhotoIdx = page;

  const filteredMembers = students.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.nim.includes(memberSearch)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => [(prev[0] + 1) % classPhotos.length, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, [classPhotos.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPage(([prevPage]) => [
      (prevPage - 1 + classPhotos.length) % classPhotos.length,
      -1
    ]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPage(([prevPage]) => [
      (prevPage + 1) % classPhotos.length,
      1
    ]);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : '0%',
      opacity: 0,
      scale: 1.12,
      rotateY: dir > 0 ? 12 : dir < 0 ? -12 : 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : dir > 0 ? '-100%' : '0%',
      opacity: 0,
      scale: 0.88,
      rotateY: dir < 0 ? 12 : dir > 0 ? -12 : 0,
    })
  };

  const slideTransition = {
    x: { type: 'spring', stiffness: 240, damping: 28 },
    opacity: { duration: 0.4 },
    scale: { duration: 0.5, ease: 'easeInOut' },
    rotateY: { type: 'spring', stiffness: 200, damping: 26 }
  };

  return (
    <div className="w-full relative">
      {/* Scroll Progress Bar at the top of long-form pages */}
      <div className="absolute top-0 right-10 w-72 h-72 hexagon-mask bg-primary/5 -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 left-5 w-48 h-48 hexagon-mask bg-secondary/5 -z-10"></div>

      {/* Hero Section: Profil Kelas */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Left Side Copy */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-primary-container/20 text-[#006399] rounded-full text-xs font-bold font-sans mb-4 tracking-widest uppercase">
            PROFIL KELAS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Dedikasi Akademik dalam <span className="text-primary text-gradient">Sistem Informasi</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-sans">
            Kelas Sistem Informasi kami adalah wadah bagi para inovator muda yang berfokus pada integrasi teknologi informasi dengan solusi bisnis yang presisi. Kami menggabungkan kedisiplinan akademik dengan semangat kolaboratif untuk menciptakan ekosistem belajar yang modern.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col gap-2 border-primary/20 shadow-lg flex-1 min-w-[150px] xs:min-w-[200px]"
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,99,153,0.1)' }}
            >
              <span className="text-primary font-black text-3xl sm:text-4xl font-mono">{students.length}</span>
              <span className="text-slate-400 font-bold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                JUMLAH MAHASISWA
              </span>
            </motion.div>
            <motion.div
              className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col gap-2 border-primary/20 shadow-lg flex-1 min-w-[150px] xs:min-w-[200px]"
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,99,153,0.1)' }}
            >
              <span className="text-primary font-black text-3xl sm:text-4xl font-mono">2025</span>
              <span className="text-slate-400 font-bold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                TAHUN ANGKATAN
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side Parallax Hexagon Media Frame */}
        <motion.div
          className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-square hexagon-mask bg-slate-200 relative overflow-hidden group shadow-2xl soft-glow" style={{ perspective: 1200 }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={currentPhotoIdx}
                src={classPhotos[currentPhotoIdx]}
                alt={`SI Academic Life - ${currentPhotoIdx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#006399]/30 to-transparent pointer-events-none" />

            {/* Navigation buttons inside the frame */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-all pointer-events-auto"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-all pointer-events-auto"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Page indicator dots */}
            <div className="absolute bottom-5 inset-x-0 flex justify-center gap-1.5 z-10">
              {classPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newDirection = idx > currentPhotoIdx ? 1 : -1;
                    setPage([idx, newDirection]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentPhotoIdx ? 'bg-[#3fa9f5] w-5' : 'bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 hexagon-mask bg-secondary/10 backdrop-blur-sm -z-10 animate-float-medium"></div>
        </motion.div>
      </section>

      {/* Bento Grid Institutional & Key Officers Info */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Institution Info */}
          <motion.div
            className="glass-card p-5 sm:p-8 rounded-2xl md:col-span-2 flex flex-col justify-between group shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-[#eef4fc] text-primary shadow-sm border border-blue-100 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[26px]">account_balance</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans">Afiliasi Universitas</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                Informasi lengkap mengenai entitas akademik yang menaungi program studi kami di tingkat universitas.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 border-b border-[#bfc7d2]/30 pb-2.5">
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans shrink-0">
                  Universitas
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 text-left sm:text-right">Universitas Islam Negeri Raden Intan Lampung</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 border-b border-[#bfc7d2]/30 pb-2.5">
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans shrink-0">
                  Fakultas
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 text-left sm:text-right">Fakultas Sains dan Teknologi</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-1">
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans shrink-0">
                  Program Studi
                </span>
                <span className="font-bold text-xs sm:text-sm text-primary text-left sm:text-right">Sistem Informasi</span>
              </div>
            </div>
          </motion.div>

          {/* Ketua Kelas Officers */}
          <motion.div
            className="glass-card p-6 rounded-2xl overflow-hidden group border border-[#bfc7d2]/20 shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-32 h-32 relative mb-4 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-[#3fa9f5]/10 rounded-full blur-md group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-28 h-28 hexagon-mask bg-slate-200 relative overflow-hidden shadow-lg border border-[#3fa9f5]/25">
                <img
                  src={lendraAvatar}
                  alt="Lendra Portrait"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="bg-[#006399] text-white px-3.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm mb-3">
              Ketua Kelas
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-950 mb-1 font-sans">Lendra</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-sans mb-4 italic">
                  "Integritas melalui teknologi dan kolaborasi berkelanjutan."
                </p>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <motion.a
                  href="https://www.instagram.com/syailendraalladuni?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-full border border-[#E1306C]/20 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <Instagram size={15} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Key Goals with Hexagon decorations */}
      <section className="glass-card p-5 sm:p-8 md:p-12 rounded-3xl mb-24 relative overflow-hidden shadow-md">
        <div className="absolute -top-12 -right-12 w-48 h-48 hexagon-mask bg-primary/5"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Misi Bullet points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 font-sans">
              Misi Kelas SI 2025
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white duration-300 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[19px]">check_circle</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-sans mb-1">
                    Keunggulan Teknis
                  </h5>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
                    Menguasai fundamental pemrograman, rekayasa data cerdas, dan arsitektur database untuk kebutuhan transformasi digital industri 4.0.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white duration-300 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[19px]">diversity_3</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-sans mb-1">
                    Kolaborasi Sinergis
                  </h5>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
                    Membangun tim kerja yang tangguh, solid, dan solutif melalui proyek kolaboratif berbasis platform modern dan sharing knowledge berkala.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white duration-300 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[19px]">trending_up</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-sans mb-1">
                    Pertumbuhan Berkelanjutan
                  </h5>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
                    Mempersiapkan setiap mahasiswa dengan landasan sertifikasi global guna merintis karier profesional sebagai analis data maupun konsultan IT yang adaptif.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Right column with large metrics */}
          <motion.div
            className="flex flex-col justify-center gap-8 lg:border-l lg:border-[#bfc7d2]/30 lg:pl-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 hexagon-mask bg-[#3fa9f5] flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-12 shadow-md">
                <span className="material-symbols-outlined text-[32px]">groups</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 font-mono">{students.length} Mahasiswa</span>
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans">
                  Total Angkatan Aktif
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 hexagon-mask bg-[#1d4ed8] flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-12 shadow-md">
                <span className="material-symbols-outlined text-[32px]">event_available</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 font-mono">Angkatan 2025</span>
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans">
                  Tahun Akademik Berjalan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 hexagon-mask bg-tertiary flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-12 shadow-md">
                <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 font-mono">Akreditasi Unggul</span>
                <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase font-sans">
                  Status Program Studi
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profil Anggota Kelas Grid with Search and Filter */}
      <section className="mb-20">
        <motion.div
          className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-block px-4 py-1 bg-primary-container/20 text-[#006399] rounded-full text-xs font-bold font-sans mb-3 tracking-widest uppercase">
              PROFIL ANGGOTA KELAS
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Mengenal Anggota Kelas SI C 2025</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-2xl font-sans">
              Daftar mahasiswa aktif, pengurus kelas, serta divisi fungsional yang bersinergi dalam program studi Sistem Informasi.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200/80 rounded-xl text-xs sm:text-sm bg-white/75 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
            {memberSearch && (
              <button
                onClick={() => setMemberSearch('')}
                className="px-3 py-2 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 text-xs font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* Small, compact Grid for class members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                className="group bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-primary/40 duration-300 transition-all text-center flex flex-col items-center relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              >
                {/* Background soft glow decoration on hover */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/5 blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                {/* Compact profile photo */}
                <div className="w-16 h-16 relative mb-3 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200 shadow-inner z-10">
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Status dot */}
                  <span className={`absolute bottom-0 right-1 w-3.5 h-3.5 border-2 border-white rounded-full z-20 ${
                    member.status === 'Aktif' ? 'bg-emerald-500' : member.status === 'Cuti' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} title={`Status: ${member.status}`} />
                </div>

                {/* Name */}
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors mb-0.5" title={member.name}>
                  {member.name}
                </h4>

                {/* NIM */}
                <span className="text-[10px] font-mono text-slate-400 font-semibold mb-2">
                  {member.nim}
                </span>

                {/* Role badges */}
                {member.role ? (
                  <span className="mt-auto px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-bold rounded-md tracking-wide max-w-full truncate">
                    {member.role}
                  </span>
                ) : (
                  <span className="mt-auto px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-medium rounded-md tracking-wide">
                    Mahasiswa
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMembers.length === 0 && (
          <motion.div
            className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">group_off</span>
            <p className="text-slate-500 text-sm font-medium">Anggota kelas tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba masukkan nama atau NIM yang berbeda.</p>
          </motion.div>
        )}
      </section>

      {/* Lightbox dialog rendering with animation */}
      <Lightbox
        isOpen={selectedImage !== null}
        imageUrl={selectedImage?.imageUrl || ''}
        title={selectedImage?.title || ''}
        description={selectedImage?.description || ''}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
