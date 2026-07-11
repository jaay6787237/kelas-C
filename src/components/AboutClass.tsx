import { useState } from 'react';
import { motion } from 'motion/react';
import { GalleryItem } from '../types';
import Lightbox from './Lightbox';

interface AboutClassProps {
  galleryItems: GalleryItem[];
}

export default function AboutClass({ galleryItems }: AboutClassProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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
              <span className="text-primary font-black text-3xl sm:text-4xl font-mono">48</span>
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
          className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-square hexagon-mask bg-slate-200 relative overflow-hidden group shadow-2xl soft-glow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLuud095ESdIwNwbl2GQRwEXULa8WfFG5b12sbuszoh7iDAgBVqMzfPEhtX-JnPCcPgdjzojzecT3Bb9PuKDDnnB3NDVQQsShC3lfbnD9X8-3UTd6attHh9hvyZIR5Dsx67rLvonxXLkDK5A8xc4VBddremdE9h6xq85wW50JnvYhE8TBJBxUEndWyM2uidg3K7CP6yuSWcpqoyFXIEQ7QQwUmaAsTx4FPSCh46ULHt-zDi7P8B2Rj"
              alt="SI Academic Life"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#006399]/40 to-transparent" />
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrd-cu5BX7sY1fTiPnJdYYxrXs4qgWmfCzVlsrcjd3oswM2rLMM9sSIHV6H8tKpwHEoQR5eGH4uGtKlQLUKX3RhRz61OTJARh6Lpx8beR4XL1h1QNQKxZNiTxi_QsWmNMRa2zgUIhS4Ep-mhWNj4MsFu6zW3rqPhF-dhDSsikeCGSyVoVGyu3Asj4UZgp-m-wS-b33m35V0XuIdRzZ-GwDdI8nGd1QezUJm02Aie5KOJyUy24FwMER"
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
                  href="mailto:lendra@si-hexagon.ac.id"
                  className="w-8.5 h-8.5 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="material-symbols-outlined text-[17px]">mail</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-8.5 h-8.5 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="material-symbols-outlined text-[17px]">link</span>
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
                <span className="block text-2xl font-black text-slate-900 font-mono">48 Mahasiswa</span>
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

      {/* Dynamic Gallery with Hover Zoom and Lightbox Trigger */}
      <section className="mb-20">
        <motion.div
          className="mb-10 text-center md:text-left"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1 bg-primary-container/20 text-[#006399] rounded-full text-xs font-bold font-sans mb-3 tracking-widest uppercase">
            GALERI KELAS
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Aktivitas & Kolaborasi Dokumentasi</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Merekam jejak kebersamaan, riset laboratorium, kunjungan industri, dan momen prestasi kelas kami.
          </p>
        </motion.div>

        {/* Gallery Grid showing Hover Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-md shadow-slate-100 hover:shadow-xl hover:border-primary duration-300 transition-all cursor-zoom-in h-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
              onClick={() => setSelectedImage(photo)}
            >
              {/* Image Frame */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Immersive backdrop vignette overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Slide-up text caption box */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end text-white text-left">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-blue-300 mb-1">
                    {photo.category} // {photo.date}
                  </span>
                  <h4 className="text-sm font-bold truncate leading-snug">{photo.title}</h4>
                  <p className="text-[10px] text-slate-300 line-clamp-1 mt-1 font-sans">
                    {photo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
