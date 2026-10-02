/** Wordmark — "POWERGLIDE." with the gold full-stop, plus the descriptor line. */
import { Link } from 'react-router-dom';

export function Wordmark({ onDark = false, showTagline = true }: { onDark?: boolean; showTagline?: boolean }) {
  return (
    <Link to="/" className={`wordmark${onDark ? ' wordmark--dark' : ''}`} aria-label="PowerGlide — home">
      <span className="wordmark__name">POWERGLIDE<span className="wordmark__dot">.</span></span>
      {showTagline && <span className="wordmark__tag">PREMIER AUTO SERVICE CENTER</span>}
    </Link>
  );
}
