"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { imageAssetHref } from "../../../lib/site-assets";
import { publicAssetHref } from "../../../lib/site-paths";

const VIDEO_SRC = publicAssetHref("/videos/aquaview-demo.mp4");

function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aquamesh-500"
        >
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
        </button>
        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            src={VIDEO_SRC}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label="AquaView platform demo"
            className="aspect-video w-full"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PlatformHeroMedia() {
  const [modalOpen, setModalOpen] = useState(false);
  const playButtonRef = useRef(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    playButtonRef.current?.focus();
  }, []);

  return (
    <>
      <div className="overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/60 sm:rounded-[20px]">
        <div className="relative">
          <img
            src={imageAssetHref("platform/platform_hero.png")}
            alt="AquaView dashboard showing water quality trends and deployment analytics"
            className="h-auto w-full"
          />
          <button
            ref={playButtonRef}
            type="button"
            onClick={openModal}
            aria-label="Play AquaView demo video"
            className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-all duration-300 hover:bg-black/30"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 sm:h-20 sm:w-20">
              <i
                className="fa-solid fa-play ml-1 text-xl text-white sm:text-2xl"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
      <VideoModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
