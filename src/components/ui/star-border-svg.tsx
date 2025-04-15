import React, { useRef, useLayoutEffect, useState } from 'react';

interface StarBorderSVGProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  color?: string;
  strokeWidth?: number;
  dashArray?: string;
  animationDuration?: string;
  padding?: number;
}

export const StarBorderSVG: React.FC<StarBorderSVGProps> = ({
  children,
  className = '',
  borderRadius = 24,
  color = 'white',
  strokeWidth = 2,
  dashArray = '2 4', // Tighter dash/gap for denser effect
  animationDuration = '2.2s',
  padding = 6
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    const update = () => {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    };
    update();
    // Listen for resize
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`} style={{ zIndex: 1 }}>
      {size.width > 0 && size.height > 0 && (
        <svg
          className="absolute pointer-events-none"
          style={{
            left: -padding,
            top: -padding,
            width: size.width + padding * 2,
            height: size.height + padding * 2,
            zIndex: 2,
          }}
          width={size.width + padding * 2}
          height={size.height + padding * 2}
          viewBox={`0 0 ${size.width + padding * 2} ${size.height + padding * 2}`}
        >
          <rect
            x={padding}
            y={padding}
            width={size.width}
            height={size.height}
            rx={borderRadius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            style={{
              strokeDashoffset: 0,
              animation: `starBorderMove ${animationDuration} linear infinite`,
              filter: 'drop-shadow(0 0 2px white)',
              opacity: 0.6,
            }}
          />
        </svg>
      )}
      <style>{`
        @keyframes starBorderMove {
          to {
            stroke-dashoffset: -32;
          }
        }
      `}</style>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};
