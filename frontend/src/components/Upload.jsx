import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileVideo, Image as ImageIcon, UploadCloud, CheckCircle2 } from 'lucide-react';

const Upload = ({ type, onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const isImage = type === 'image';
  const Icon = isImage ? ImageIcon : FileVideo;
  const acceptStr = isImage ? 'image/*' : 'video/*';
  const title = isImage ? 'Upload Image' : 'Upload Video';
  const subtitle = isImage ? 'JPG, PNG, WebP' : 'MP4, AVI, MOV';
  const color = isImage ? '#6366f1' : '#8b5cf6';
  const glow = isImage ? 'rgba(99,102,241,0.3)' : 'rgba(139,92,246,0.3)';

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false); }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) { setFileName(file.name); onFileUpload(file); }
  }, [onFileUpload]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); onFileUpload(file); }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => document.getElementById(`file-upload-${type}`).click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer overflow-hidden h-full"
      style={{
        background: isDragging
          ? `linear-gradient(135deg, ${color}18, ${color}08)`
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${isDragging ? color + '60' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: isDragging ? `0 0 40px ${glow}` : 'none',
        transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Corner glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: isDragging ? 1 : 0 }}
        style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 65%)` }}
      />

      {/* Drag overlay text */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl z-20"
            style={{ background: `${color}10`, border: `2px dashed ${color}80` }}
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud size={36} style={{ color }} />
              <span className="text-white font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Drop to analyze
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        animate={{ boxShadow: [`0 0 0px ${glow}`, `0 0 20px ${glow}`, `0 0 0px ${glow}`] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={34} style={{ color }} />
      </motion.div>

      <h3
        className="text-xl font-black text-white mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h3>

      <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Drag & drop or click to browse your files
      </p>

      {/* Format badge */}
      <div
        className="w-full py-3 px-4 rounded-xl flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="text-slate-500 text-xs uppercase tracking-widest">Formats</span>
        <span className="text-slate-300 text-xs font-semibold">{subtitle}</span>
      </div>

      {/* Selected file name */}
      <AnimatePresence>
        {fileName && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg w-full"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <CheckCircle2 size={13} style={{ color }} className="flex-shrink-0" />
            <span className="text-xs truncate" style={{ color, fontFamily: "'DM Sans', sans-serif" }}>
              {fileName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        id={`file-upload-${type}`}
        type="file"
        accept={acceptStr}
        className="hidden"
        onChange={handleChange}
      />
    </motion.div>
  );
};

export default Upload;