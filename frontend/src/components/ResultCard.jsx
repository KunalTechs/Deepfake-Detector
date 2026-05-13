import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  BarChart2,
  Eye,
  Clock,
  Cpu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const ResultCard = ({ result, onReset }) => {
  const [showFrames, setShowFrames] = useState(false);

  // ── Fix: case-insensitive check ───────────────────────────────────
  const isFake = result.result?.toUpperCase() === "FAKE";
  const fakeConf = (result.confidence * 100).toFixed(1);
  const realConf = (result.real_confidence * 100).toFixed(1);
  const ShieldIcon = isFake ? ShieldAlert : ShieldCheck;
  const StatusIcon = isFake ? AlertTriangle : CheckCircle2;
  const color = isFake ? "#ef4444" : "#10b981";
  const glow = isFake ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)";
  const frameResults = result.details?.frame_results || [];
  const fakeFrames = frameResults.filter((f) => f.prediction === "FAKE");
  const realFrames = frameResults.filter((f) => f.prediction === "REAL");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* ── Verdict Header ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${color}30`,
          boxShadow: `0 0 40px ${glow}`,
        }}
      >
        <motion.div
          className="h-1 w-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }}
        />

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                <ShieldIcon size={24} style={{ color }} />
              </div>
              <div>
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest mb-1"
                  style={{
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <StatusIcon size={10} />
                  {isFake
                    ? "Deepfake detected by model"
                    : "Model found no manipulation"}
                </div>
                <h2
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {isFake
                    ? "Synthetic face detected"
                    : "No synthetic artifacts found"}
                </h2>
              </div>
            </div>

            {/* Processing time badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(148,163,184,1)",
              }}
            >
              <Clock size={11} />
              {result.details?.processing_ms}ms
            </div>
          </div>

          {/* ── Metric Grid ── */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: "Verdict",
                val: result.result.toUpperCase(),
                color: isFake ? "#ef4444" : "#10b981",
              },
              { label: "Fake confidence", val: `${fakeConf}%`, color },
              {
                label: "Real confidence",
                val: `${realConf}%`,
                color: isFake ? "#10b981" : "#ef4444",
              },
              {
                label: "Frames analyzed",
                val: result.details?.frames_analyzed || 1,
                color: "rgba(148,163,184,1)",
              },
            ].map(({ label, val, color: c }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(100,116,139,1)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: c,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Confidence Bars ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center gap-2 mb-4"
          style={{ color: "rgba(148,163,184,1)" }}
        >
          <BarChart2 size={14} />
          <span
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Confidence breakdown
          </span>
        </div>

        {[
          { label: "Fake", pct: fakeConf, bg: "#ef4444" },
          { label: "Real", pct: realConf, bg: "#10b981" },
        ].map(({ label, pct, bg }) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: 12, color: "rgba(148,163,184,1)" }}>
                {label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: bg }}>
                {pct}%
              </span>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: "100%", borderRadius: 4, background: bg }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Face Detection Info ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center gap-2 mb-3"
          style={{ color: "rgba(148,163,184,1)" }}
        >
          <Eye size={14} />
          <span
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Face detection
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Eye size={18} style={{ color: "rgba(148,163,184,1)" }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
              {frameResults[0]?.face_detected
                ? "1 face detected"
                : "No face detected — full frame used"}
            </p>
            {frameResults[0]?.face_bbox && (
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(100,116,139,1)",
                  marginTop: 2,
                }}
              >
                Bbox: [
                {frameResults[0].face_bbox.map((v) => Math.round(v)).join(", ")}
                ] · 224×224px crop
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Frame-by-frame (video only) ── */}
      {frameResults.length > 1 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            onClick={() => setShowFrames((v) => !v)}
            className="w-full flex items-center justify-between p-5"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(148,163,184,1)",
            }}
          >
            <div className="flex items-center gap-2">
              <BarChart2 size={14} />
              <span
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Frame breakdown
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: `${color}15`, color }}
              >
                {fakeFrames.length} fake / {frameResults.length} total
              </span>
            </div>
            {showFrames ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <AnimatePresence>
            {showFrames && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  overflow: "hidden",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="p-5">
                  {/* Frame dots grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(10, 1fr)",
                      gap: 6,
                      marginBottom: 12,
                    }}
                  >
                    {frameResults.map((f, i) => (
                      <div
                        key={i}
                        title={`Frame ${i + 1}: ${f.fake_confidence}% fake`}
                        style={{
                          height: 28,
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          fontWeight: 600,
                          background:
                            f.prediction === "FAKE"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(16,185,129,0.15)",
                          color:
                            f.prediction === "FAKE" ? "#ef4444" : "#10b981",
                          border: `1px solid ${
                            f.prediction === "FAKE"
                              ? "rgba(239,68,68,0.3)"
                              : "rgba(16,185,129,0.3)"
                          }`,
                        }}
                      >
                        F{i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Per-frame confidence bars (first 8) */}
                  <div className="space-y-2">
                    {frameResults.slice(0, 8).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          style={{
                            fontSize: 10,
                            color: "rgba(100,116,139,1)",
                            width: 28,
                            flexShrink: 0,
                          }}
                        >
                          F{i + 1}
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${f.fake_confidence}%` }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            style={{
                              height: "100%",
                              borderRadius: 3,
                              background:
                                f.prediction === "FAKE" ? "#ef4444" : "#10b981",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            width: 36,
                            textAlign: "right",
                            flexShrink: 0,
                            color:
                              f.prediction === "FAKE" ? "#ef4444" : "#10b981",
                          }}
                        >
                          {f.fake_confidence}%
                        </span>
                      </div>
                    ))}
                    {frameResults.length > 8 && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "rgba(100,116,139,1)",
                          textAlign: "center",
                          paddingTop: 4,
                        }}
                      >
                        +{frameResults.length - 8} more frames
                      </p>
                    )}
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 mt-3">
                    {[
                      {
                        c: "#ef4444",
                        label: `${fakeFrames.length} fake frames`,
                      },
                      {
                        c: "#10b981",
                        label: `${realFrames.length} real frames`,
                      },
                    ].map(({ c, label }) => (
                      <span
                        key={label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 11,
                          color: "rgba(100,116,139,1)",
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 2,
                            background: c,
                            display: "inline-block",
                          }}
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Model info ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center gap-2 mb-3"
          style={{ color: "rgba(148,163,184,1)" }}
        >
          <Cpu size={14} />
          <span
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Model info
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Architecture", val: "EfficientNet-B0" },
            { label: "Training data", val: "CelebDF + FF++" },
            { label: "Val accuracy", val: "98.98% · AUC 0.9992" },
          ].map(({ label, val }) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "8px 10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(100,116,139,1)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 3,
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: "white" }}>
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: `${color}08`,
          border: `1px solid ${color}20`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "rgba(148,163,184,1)",
            lineHeight: 1.7,
          }}
        >
          {isFake
            ? `EfficientNet-B0 classified this media as FAKE with ${fakeConf}% 
               confidence. ${fakeFrames.length} of ${frameResults.length || 1} 
               frame(s) exceeded the 0.5 sigmoid threshold indicating 
               face-swap manipulation artifacts.`
            : `EfficientNet-B0 classified this media as REAL with ${realConf}% 
               confidence. All ${frameResults.length || 1} analyzed frame(s) 
               produced sigmoid scores below 0.5 — no face-swap artifacts detected.`}
        </p>
      </div>

      {/* ── Reset ── */}
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl
                   text-white font-semibold text-sm relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 30px rgba(99,102,241,0.3)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <RefreshCw size={15} />
       Run inference on another file
      </motion.button>
    </motion.div>
  );
};

export default ResultCard;
