/**
 * ImageFrame — every photograph on the site goes through this component.
 *
 * ▸ HOW TO ADD YOUR IMAGES: put the file at the path in the data file
 *   (e.g. /public/images/services/brakes.jpg → "/images/services/brakes.jpg").
 *   Until the file exists, a labelled placeholder is shown instead, so the
 *   layout is always intact and you can see exactly which image goes where.
 *
 * The frame has a fixed aspect ratio / height supplied by the parent's CSS so
 * the page never jumps when an image loads.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageFrameProps {
  src?: string;
  /** Descriptive alt text for real photos. Placeholder is hidden from AT. */
  alt: string;
  /** Human label shown in the placeholder, e.g. "Workshop photograph". */
  label?: string;
  /** Optional lucide icon to show in the placeholder (e.g. the service icon). */
  icon?: ReactNode;
  className?: string;
  eager?: boolean;
}

export function ImageFrame({ src, alt, label = 'Image placeholder', icon, className = '', eager }: ImageFrameProps) {
  const [failed, setFailed] = useState(false);
  // A new src (e.g. user picks another service) deserves a fresh attempt.
  useEffect(() => {
    setFailed(false);
  }, [src]);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`image-frame ${className}`.trim()}>
      {showImage ? (
        <img
          src={src} alt={alt} className="image-frame__img"
          loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)}
        />
      ) : (
        <div className="image-frame__placeholder" role="img" aria-label={alt}>
          {icon ?? <ImageIcon size={32} strokeWidth={1.5} aria-hidden="true" />}
          <span className="image-frame__label">{label}</span>
          {src && <span className="image-frame__path">{src}</span>}
        </div>
      )}
    </div>
  );
}
