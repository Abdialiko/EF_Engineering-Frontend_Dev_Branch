'use client';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
  variant?: 'up' | 'left' | 'right';
};

const Reveal: React.FC<Props> = ({ children, delay = 0, className = '', variant = 'up' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal-base reveal-${variant} ${visible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;


