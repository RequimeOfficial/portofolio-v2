import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { fallbackLabel?: string };

/** Lazy-loaded image that shows a neutral placeholder instead of a broken icon when it fails. */
const SmartImage: React.FC<SmartImageProps> = ({ className = '', fallbackLabel, alt = '', ...props }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-dark-secondary to-dark-accent text-gray-400`}
      >
        <ImageOff size={28} aria-hidden="true" />
        {fallbackLabel && <span className="text-xs px-4 text-center">{fallbackLabel}</span>}
      </div>
    );
  }

  return (
    <img loading="lazy" decoding="async" alt={alt} className={className} onError={() => setFailed(true)} {...props} />
  );
};

export default SmartImage;
