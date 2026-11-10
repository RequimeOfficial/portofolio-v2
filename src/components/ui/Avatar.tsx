import React, { useState } from 'react';
import { initials } from '../../lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  className?: string;
}

/** Photo avatar that falls back to coloured initials. */
const Avatar: React.FC<AvatarProps> = ({ name, src, className = 'w-16 h-16 text-lg' }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={name}
        className={`${className} rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white font-bold flex items-center justify-center shrink-0`}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} rounded-full object-cover shrink-0`}
    />
  );
};

export default Avatar;
