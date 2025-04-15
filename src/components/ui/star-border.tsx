import React from 'react';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ zIndex: 1 }}>
      {/* Top border */}
      <div className="star-border-top" style={{top: 0, left: 0, width: '100%', height: '8px'}} />
      {/* Right border */}
      <div className="star-border-right" style={{top: 0, right: 0, width: '8px', height: '100%'}} />
      {/* Bottom border */}
      <div className="star-border-bottom" style={{bottom: 0, left: 0, width: '100%', height: '8px'}} />
      {/* Left border */}
      <div className="star-border-left" style={{top: 0, left: 0, width: '8px', height: '100%'}} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
