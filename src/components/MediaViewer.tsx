import React, { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaItem } from "../data/portfolio";
import { asset } from "../data/portfolio";
import "./MediaViewer.css";

interface Props {
  title: string;
  items: MediaItem[];
  index: number | null; // null = closed
  onIndex: (i: number | null) => void;
}

/** Full-screen gallery for screenshots, MP4 recordings and YouTube demos */
const MediaViewer: React.FC<Props> = ({ title, items, index, onIndex }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <dialog
      ref={ref}
      className="mv"
      aria-label={`${title} media`}
      onClose={() => onIndex(null)}
      onClick={(e) => e.target === ref.current && onIndex(null)}
    >
      {item && (
        <div className="mv__body">
          <header className="mv__head">
            <p>
              <strong>{title}</strong>
              {items.length > 1 && (
                <span className="mv__count">
                  {index! + 1} of {items.length}
                </span>
              )}
            </p>
            <button type="button" className="mv__btn" onClick={() => onIndex(null)} aria-label="Close">
              <X aria-hidden="true" />
            </button>
          </header>

          <div className="mv__stage">
            {item.type === "image" && <img src={asset(item.src)} alt={item.alt} />}
            {item.type === "video" && (
              <video
                key={item.src}
                poster={item.poster ? asset(item.poster) : undefined}
                controls
                autoPlay
                playsInline
                aria-label={item.alt}
              >
                {item.webm && <source src={asset(item.webm)} type="video/webm" />}
                <source src={asset(item.src)} type="video/mp4" />
              </video>
            )}
            {item.type === "youtube" && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`}
                title={item.alt}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <footer className="mv__foot">
            <p className="mv__caption">{item.alt}</p>
            {items.length > 1 && (
              <div className="mv__nav">
                <button type="button" className="mv__btn" onClick={() => step(-1)} aria-label="Previous">
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button type="button" className="mv__btn" onClick={() => step(1)} aria-label="Next">
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            )}
          </footer>
        </div>
      )}
    </dialog>
  );
};

export default MediaViewer;
