"use client";

import React from 'react';
import { Button } from "@/components/ui/neon-button";

export default function PortfolioButton() {
  const scrollToPortfolio = () => {
    // Find the portfolio section
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      // Use standard scrollIntoView - the scroll-margin-top on the target element handles the offset
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button 
      onClick={scrollToPortfolio} 
      variant="default" 
      size="lg"
      className="text-base font-medium hover:scale-105 transition-transform duration-300 px-10 py-2"
    >
      Portfolio
    </Button>
  );
}
