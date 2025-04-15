import { cn } from "../../lib/utils";
import React from "react";
import "../../styles/star-border.css";

export function StarBorder({
  as = "button",
  className,
  color,
  speed = "6s",
  children,
  ...props
}) {
  const Component = as || "button";

  return (
    <Component 
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px]",
        className
      )} 
      {...props}
    >
      <div className="star-border-container">
        <div className="star-border-top" style={{animationDuration: speed}}></div>
        <div className="star-border-bottom" style={{animationDuration: speed}}></div>
        <div className="relative z-10 border border-white/20 text-white text-center py-4 px-6 rounded-[20px] bg-gradient-to-b from-black/70 to-black/50">
          {children}
        </div>
      </div>
    </Component>
  );
}
