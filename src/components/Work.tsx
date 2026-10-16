import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, ArrowUpRight, Images } from "lucide-react";
import { projects, asset } from "../data/portfolio";
import type { Project, MediaItem } from "../data/portfolio";
import MediaViewer from "./MediaViewer";
import "./Work.css";

const coverOf = (m: MediaItem | undefined): string | undefined => {
  if (!m) return undefined;
  if (m.type === "image") return m.src;
  if (m.type === "video") return m.poster;
  return `https://i.ytimg.com/vi/${m.id}/hqdefault.jpg`;
};

/** Muted inline loop that only plays while on screen */
const InlineVideo: React.FC<{ src: string; webm?: string; poster?: string; label: string }> = ({ src, webm, poster, label }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      poster={poster ? asset(poster) : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      {webm && <source src={asset(webm)} type="video/webm" />}
      <source src={asset(src)} type="video/mp4" />
    </video>
  );
};

/** Shown when a project has no screenshots yet */
const Cover: React.FC<{ p: Project }> = ({ p }) => (
  <div className="cover" aria-hidden="true">
    <span className="cover__title">{p.stack[0]}</span>
    <span className="cover__kind">{p.stack.slice(1, 3).join(", ")}</span>
  </div>
);

const Media: React.FC<{ p: Project; onOpen: (i: number) => void }> = ({ p, onOpen }) => {
  if (p.media.length === 0) return null;
  const first = p.media[0];
  const hasVideo = p.media.some((m) => m.type !== "image");
  const firstVideo = p.media.findIndex((m) => m.type !== "image");

  return (
    <div className="case__media">
      <button
        type="button"
        className="case__frame"
        onClick={() => onOpen(firstVideo >= 0 ? firstVideo : 0)}
        aria-label={hasVideo ? `Play ${p.title} demo` : `View ${p.title} screenshots`}
      >
        {first?.type === "video" ? (
          <InlineVideo src={first.src} webm={first.webm} poster={first.poster} label={first.alt} />
        ) : (
          <img src={asset(coverOf(first) ?? "")} alt={first?.alt ?? ""} loading="lazy" />
        )}
        <span className="case__play">
          {hasVideo ? <Play aria-hidden="true" /> : <Images aria-hidden="true" />}
          {hasVideo ? "Watch demo" : "View screens"}
        </span>
        {p.mediaNote && <span className="case__note">{p.mediaNote}</span>}
      </button>

      {p.media.length > 1 && (
        <ul className="case__thumbs">
          {p.media.map((m, i) => (
            <li key={i}>
              <button type="button" onClick={() => onOpen(i)} aria-label={`Open: ${m.alt}`}>
                <img src={asset(coverOf(m) ?? "")} alt="" loading="lazy" />
                {m.type !== "image" && (
                  <span className="case__thumb-play" aria-hidden="true">
                    <Play />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Links: React.FC<{ p: Project }> = ({ p }) =>
  p.links && p.links.length > 0 ? (
    <ul className="case__links">
      {p.links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  ) : null;

const Work: React.FC = () => {
  const [viewer, setViewer] = useState<{ p: Project; i: number | null } | null>(null);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const open = (p: Project, i: number) => setViewer({ p, i });

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">Selected work</h2>
          <p className="section-lede">
            Products I've designed, built and shipped, from the database schema to the screen people use
            every day.
          </p>
        </div>

        <div className="cases">
          {featured.map((p) => (
            <article key={p.id} className="case" aria-labelledby={`case-${p.id}`}>
              <div className="case__head">
                <h3 className="case__title" id={`case-${p.id}`}>
                  {p.title}
                </h3>
                <p className="case__kind">{p.kind}</p>
                <p className="case__meta">
                  {p.role}, {p.year}
                </p>
              </div>
              <Media p={p} onOpen={(i) => open(p, i)} />
              <div className="case__text">
                <div>
                  <p className="case__summary">{p.summary}</p>
                  <ul className="chips" aria-label="Tech stack">
                    {p.stack.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Links p={p} />
                </div>
                <ul className="case__points">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <h3 className="more__title">More projects</h3>
            <ul className="more">
              {others.map((p) => (
                <li key={p.id} className="more__item">
                  {p.media.length > 0 ? (
                    <button type="button" className="more__thumb" onClick={() => open(p, 0)} aria-label={`View ${p.title} screens`}>
                      <img src={asset(coverOf(p.media[0]) ?? "")} alt="" loading="lazy" />
                    </button>
                  ) : (
                    <div className="more__thumb more__thumb--cover">
                      <Cover p={p} />
                    </div>
                  )}
                  <div className="more__body">
                    <div className="more__row">
                      <h4>{p.title}</h4>
                      <span className="more__year">{p.year}</span>
                    </div>
                    <p className="more__kind">{p.kind}</p>
                    <p>{p.summary}</p>
                    <ul className="chips" aria-label="Tech stack">
                      {p.stack.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Links p={p} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <MediaViewer
        title={viewer?.p.title ?? ""}
        items={viewer?.p.media ?? []}
        index={viewer?.i ?? null}
        onIndex={(i) => setViewer((v) => (v && i !== null ? { ...v, i } : null))}
      />
    </section>
  );
};

export default Work;
