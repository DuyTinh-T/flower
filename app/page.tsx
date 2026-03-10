"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ──────────────── Petals ──────────────── */
function FallingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 14,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 5,
        opacity: 0.5 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          🌸
        </span>
      ))}
    </>
  );
}

/* ──────────────── Sparkles ──────────────── */
function Sparkles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 6,
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <>
      {dots.map((d) => (
        <span
          key={d.id}
          className="sparkle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "rgba(255,200,200,0.8)",
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ──────────────── Flower SVG ──────────────── */
function CarnationFlower({ flip = false, size = 70 }: { flip?: boolean; size?: number }) {
  const h = Math.round((size / 70) * 100);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 70 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Stem */}
      <path
        d="M35 55 Q33 70 35 95"
        stroke="#5a9e46"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Leaves */}
      <path
        d="M35 70 Q22 62 18 68 Q24 72 35 70"
        fill="#6ab854"
        opacity="0.8"
      />
      <path
        d="M35 80 Q48 73 52 78 Q46 82 35 80"
        fill="#6ab854"
        opacity="0.8"
      />
      {/* Petals - outer */}
      <ellipse cx="35" cy="32" rx="18" ry="14" fill="#f4a0a8" />
      <ellipse cx="25" cy="28" rx="12" ry="10" fill="#f2889a" />
      <ellipse cx="45" cy="28" rx="12" ry="10" fill="#f2889a" />
      <ellipse cx="30" cy="22" rx="10" ry="9" fill="#e96e85" />
      <ellipse cx="40" cy="22" rx="10" ry="9" fill="#e96e85" />
      {/* Petals - inner */}
      <ellipse cx="35" cy="26" rx="9" ry="8" fill="#f17b94" />
      <ellipse cx="35" cy="20" rx="7" ry="7" fill="#ec6a85" />
      <ellipse cx="32" cy="17" rx="6" ry="6" fill="#e85a78" />
      <ellipse cx="38" cy="17" rx="6" ry="6" fill="#e85a78" />
      <ellipse cx="35" cy="14" rx="5" ry="5" fill="#d94e6c" />
    </svg>
  );
}

/* ──────────────── Step 1: Closed Envelope ──────────────── */
function EnvelopeClosed({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
      onClick={onClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: 420 }}
    >
      {/* Envelope body */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 260,
          height: 170,
          background: "linear-gradient(145deg, #f4c3c3 0%, #eaa5a5 100%)",
          borderRadius: 12,
          boxShadow: "0 6px 24px rgba(200,100,100,0.2)",
        }}
      >
        {/* Envelope flap (triangle) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: "130px solid transparent",
            borderRight: "130px solid transparent",
            borderTop: "85px solid #e8a3a3",
            borderRadius: "4px",
          }}
        />
        {/* Heart icon */}
        <motion.span
          className="relative z-10"
          style={{ fontSize: 38 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ──────────────── Step 2: Opened Envelope ──────────────── */
function EnvelopeOpen({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="cursor-pointer w-full flex flex-col items-center justify-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: 420, paddingTop: 16, paddingBottom: 16 }}
    >
      {/* Scene: fixed-size container so z-indexes layer correctly */}
      <div style={{ position: "relative", width: 290, height: 340 }}>

        {/* ── Layer 1: Left flower — BEHIND the letter ── */}
        <motion.div
          style={{ position: "absolute", left: -20, top: 30, zIndex: 1, transformOrigin: "bottom center" }}
          initial={{ scale: 0, rotate: -50, y: 40 }}
          animate={{ scale: 1, rotate: -28, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: "easeOut" }}
        >
          <CarnationFlower size={115} />
        </motion.div>

        {/* ── Layer 2: Letter — slides up from inside envelope ── */}
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          style={{
            position: "absolute",
            left: 28,
            right: 28,
            top: 20,
            zIndex: 2,
            background: "linear-gradient(180deg, #fef8f8 0%, #fce4e4 100%)",
            borderRadius: 10,
            padding: "32px 20px 56px",
            boxShadow: "0 4px 18px rgba(200,100,100,0.18)",
          }}
          initial={{ y: 220 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="italic"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 28,
              color: "#7d3b3b",
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >
            Happy Birthday
          </h1>
          <h2
            className="italic"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 22,
              color: "#7d3b3b",
              lineHeight: 1.5,
            }}
          >
            Phương Anh
            <br />
            Pham
          </h2>
        </motion.div>

        {/* ── Layer 3: Envelope body — covers bottom of letter so it looks "inside" ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 155,
            background: "linear-gradient(160deg, #f4c3c3 0%, #e8a8a8 100%)",
            borderRadius: "0 0 14px 14px",
            zIndex: 3,
            /* valley opening at top — sides high, centre dips inward */
            clipPath: "polygon(0% 0%, 50% 28%, 100% 0%, 100% 100%, 0% 100%)",
            boxShadow: "0 6px 20px rgba(180,80,80,0.18)",
          }}
        />
        {/* envelope left & right walls (strips above the clip) */}
        <div
          style={{
            position: "absolute",
            bottom: 127,
            left: 0,
            width: 14,
            height: 30,
            background: "#f4c3c3",
            zIndex: 3,
            borderRadius: "2px 0 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 127,
            right: 0,
            width: 14,
            height: 30,
            background: "#f4c3c3",
            zIndex: 3,
            borderRadius: "0 2px 0 0",
          }}
        />

        {/* ── Layer 4: Right flower — IN FRONT of letter and envelope ── */}
        <motion.div
          style={{ position: "absolute", right: -20, top: 20, zIndex: 4, transformOrigin: "bottom center" }}
          initial={{ scale: 0, rotate: 50, y: 40 }}
          animate={{ scale: 1, rotate: 28, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: "easeOut" }}
        >
          <CarnationFlower size={115} flip />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ──────────────── Butterfly SVG ──────────────── */
function Butterfly({ flip = false, color = "#f9a8c9" }: { flip?: boolean; color?: string }) {
  return (
    <svg
      width="38" height="30" viewBox="0 0 38 30" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Left wings */}
      <ellipse cx="10" cy="10" rx="10" ry="8" fill={color} opacity="0.85" />
      <ellipse cx="8" cy="22" rx="7" ry="6" fill={color} opacity="0.7" />
      {/* Right wings */}
      <ellipse cx="28" cy="10" rx="10" ry="8" fill={color} opacity="0.85" />
      <ellipse cx="30" cy="22" rx="7" ry="6" fill={color} opacity="0.7" />
      {/* Body */}
      <ellipse cx="19" cy="15" rx="2.5" ry="8" fill="#c06080" opacity="0.9" />
      {/* Antennae */}
      <path d="M19 7 Q14 2 11 1" stroke="#c06080" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M19 7 Q24 2 27 1" stroke="#c06080" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="1" r="1.2" fill="#c06080" />
      <circle cx="27" cy="1" r="1.2" fill="#c06080" />
    </svg>
  );
}

/* ──────────────── Bouquet SVG ──────────────── */
function FlowerBouquet() {
  return (
    <svg width="95" height="120" viewBox="0 0 95 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stems */}
      <path d="M47 70 Q44 85 42 110" stroke="#5a9e46" strokeWidth="2" fill="none" />
      <path d="M47 70 Q50 85 55 110" stroke="#5a9e46" strokeWidth="2" fill="none" />
      <path d="M47 70 Q47 88 47 110" stroke="#5a9e46" strokeWidth="2" fill="none" />
      {/* Leaves */}
      <path d="M44 85 Q32 78 28 83 Q34 88 44 85" fill="#6ab854" opacity="0.85" />
      <path d="M50 90 Q62 83 66 88 Q60 93 50 90" fill="#6ab854" opacity="0.85" />
      {/* Ribbon */}
      <path d="M36 100 Q47 106 58 100 Q58 112 47 115 Q36 112 36 100Z" fill="#f9b8c8" opacity="0.9" />
      <path d="M36 100 Q30 94 33 90 Q40 96 36 100Z" fill="#f48aaa" opacity="0.85" />
      <path d="M58 100 Q64 94 61 90 Q54 96 58 100Z" fill="#f48aaa" opacity="0.85" />
      {/* Left carnation */}
      <ellipse cx="22" cy="38" rx="16" ry="13" fill="#f4a0b0" />
      <ellipse cx="13" cy="34" rx="10" ry="9" fill="#f28898" />
      <ellipse cx="31" cy="34" rx="10" ry="9" fill="#f28898" />
      <ellipse cx="17" cy="27" rx="9" ry="8" fill="#e96e85" />
      <ellipse cx="27" cy="27" rx="9" ry="8" fill="#e96e85" />
      <ellipse cx="22" cy="30" rx="8" ry="7" fill="#f17b94" />
      <ellipse cx="22" cy="24" rx="6" ry="6" fill="#ec6a85" />
      <ellipse cx="19" cy="20" rx="5" ry="5" fill="#e85a78" />
      <ellipse cx="25" cy="20" rx="5" ry="5" fill="#e85a78" />
      <ellipse cx="22" cy="17" rx="4" ry="4" fill="#d94e6c" />
      {/* Center carnation */}
      <ellipse cx="47" cy="28" rx="17" ry="14" fill="#f4a0b0" />
      <ellipse cx="37" cy="24" rx="11" ry="10" fill="#f28898" />
      <ellipse cx="57" cy="24" rx="11" ry="10" fill="#f28898" />
      <ellipse cx="42" cy="17" rx="10" ry="9" fill="#e96e85" />
      <ellipse cx="52" cy="17" rx="10" ry="9" fill="#e96e85" />
      <ellipse cx="47" cy="21" rx="9" ry="8" fill="#f17b94" />
      <ellipse cx="47" cy="15" rx="7" ry="7" fill="#ec6a85" />
      <ellipse cx="44" cy="11" rx="6" ry="6" fill="#e85a78" />
      <ellipse cx="50" cy="11" rx="6" ry="6" fill="#e85a78" />
      <ellipse cx="47" cy="8" rx="5" ry="5" fill="#d94e6c" />
      {/* Right carnation */}
      <ellipse cx="73" cy="38" rx="16" ry="13" fill="#f4a0b0" />
      <ellipse cx="63" cy="34" rx="10" ry="9" fill="#f28898" />
      <ellipse cx="82" cy="34" rx="10" ry="9" fill="#f28898" />
      <ellipse cx="68" cy="27" rx="9" ry="8" fill="#e96e85" />
      <ellipse cx="78" cy="27" rx="9" ry="8" fill="#e96e85" />
      <ellipse cx="73" cy="30" rx="8" ry="7" fill="#f17b94" />
      <ellipse cx="73" cy="24" rx="6" ry="6" fill="#ec6a85" />
      <ellipse cx="70" cy="20" rx="5" ry="5" fill="#e85a78" />
      <ellipse cx="76" cy="20" rx="5" ry="5" fill="#e85a78" />
      <ellipse cx="73" cy="17" rx="4" ry="4" fill="#d94e6c" />
    </svg>
  );
}

/* ──────────────── Step 3: Full Message ──────────────── */
function FullMessage() {
  return (
    <motion.div
      className="cursor-default"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "14px 10px", position: "relative" }}
    >
      {/* Butterflies — left side */}
      <motion.div
        style={{ position: "absolute", left: -6, top: 28, zIndex: 10 }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly color="#f9a8c9" />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ position: "absolute", left: 2, top: 72, zIndex: 10 }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <motion.div
          animate={{ rotate: [6, -6, 6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly color="#fbc4d8" />
        </motion.div>
      </motion.div>

      {/* Butterflies — right side */}
      <motion.div
        style={{ position: "absolute", right: -4, top: 22, zIndex: 10 }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <motion.div
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly flip color="#f9a8c9" />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ position: "absolute", right: 0, top: 68, zIndex: 10 }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.95 }}
      >
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly flip color="#fbc4d8" />
        </motion.div>
      </motion.div>

      {/* Letter card */}
      <motion.div
        style={{
          background: "#fdf0f0",
          border: "2px solid #f3b7b7",
          borderRadius: 14,
          padding: "16px 14px 14px",
          boxShadow: "0 6px 24px rgba(200,100,100,0.14)",
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Scrollable text area — fixed height */}
        <div
          style={{
            height: 190,
            overflowY: "auto",
            fontFamily: "var(--font-poppins)",
            lineHeight: 1.75,
            color: "#4b2d2d",
            fontSize: 13.5,
            paddingRight: 4,
            marginBottom: 12,
            /* subtle scrollbar */
            scrollbarWidth: "thin",
            scrollbarColor: "#f3b7b7 transparent",
            background: "#ffffff",
            padding: 12,
          }}
        >
          <p className="font-semibold mb-2" style={{ fontSize: 14 }}>
            Phương Anh của anh 💖
          </p>
          <p className="mb-2">
            Nhân ngày sinh nhật đặc biệt này 🎂🎉, anh chỉ muốn ngồi lại một chút để viết cho em vài dòng từ tận đáy lòng mình.
          </p>
          <p className="mb-2">
            Cảm ơn em vì đã đến bên anh, nhẹ nhàng nhưng đủ để làm cả thế giới của anh thay đổi ✨. Từ khi có em, những ngày bình thường cũng trở nên đặc biệt, những lúc mệt mỏi cũng có lý do để cố gắng hơn 💪.
          </p>
          <p className="mb-2">
            Phương Anh à, em không chỉ xinh đẹp bên ngoài, mà còn có một trái tim thật ấm áp và chân thành.
          </p>
          <p className="mb-2">
            Anh hy vọng rằng dù sau này thế nào, anh vẫn có thể nhìn thấy nụ cười của em mỗi ngày ❤️
          </p>
        </div>

        {/* Bottom row: Bouquet left + Photo right */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {/* Flower bouquet */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <FlowerBouquet />
          </motion.div>

          {/* Polaroid photo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            style={{
              background: "white",
              padding: "7px 7px 20px",
              borderRadius: 6,
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
              transform: "rotate(-4deg)",
              width: 120,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 106,
                height: 128,
                background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/photo.jpg"
                alt="Phương Anh"
                fill
                style={{ objectFit: "cover", borderRadius: 3 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            {/* Small heart bottom of polaroid */}
            <p style={{ textAlign: "center", marginTop: 4, fontSize: 13, color: "#c06080" }}>♡</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────── Main Page ──────────────── */
export default function Home() {
  const [step, setStep] = useState(1);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (step === 3) {
      setShowEffects(true);
    }
  }, [step]);

  const handleClick = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        minHeight: "100vh",
        background: "#fff5f7",
      }}
    >
      {/* Falling petals & sparkles */}
      {showEffects && (
        <>
          <FallingPetals />
          <Sparkles />
        </>
      )}

      {/* Card container */}
      <div
        style={{
          width: 400,
          minHeight: 420,
          maxHeight: "92vh",
          borderRadius: 16,
          // background: step === 3 ? "transparent" : "#f7cfd2",
          // boxShadow: step === 3 ? "none" : "0 10px 40px rgba(0,0,0,0.15)",
          overflow: step === 3 ? "visible" : "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {step === 1 && <EnvelopeClosed key="step1" onClick={handleClick} />}
          {step === 2 && <EnvelopeOpen key="step2" onClick={handleClick} />}
          {step === 3 && <FullMessage key="step3" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
