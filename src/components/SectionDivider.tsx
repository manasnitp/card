export default function SectionDivider({ 
  fillColor = "#FDFBF7", 
  className = "",
  position = "bottom" 
}: { 
  fillColor?: string;
  className?: string;
  position?: "top" | "bottom"
}) {
  return (
    <div className={`absolute left-0 w-full overflow-visible leading-none z-20 pointer-events-none ${position === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px] rotate-180'} ${className}`}>
      <svg 
        className="relative block w-full h-[70px] md:h-[120px]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        {/* Gold Accent / Shadow Layer to give thickness */}
        <path 
          d="M321.39,46.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,21,906.67,62,985.66,82.83c70.05,18.48,146.53,26.09,214.34,3V120H0V17.35A600.21,600.21,0,0,0,321.39,46.44Z" 
          fill="rgba(201,168,106,0.25)"
        ></path>
        
        {/* Main Physical Paper Layer */}
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          fill={fillColor}
          style={{ filter: 'drop-shadow(0px -4px 6px rgba(0,0,0,0.06))' }}
        ></path>
      </svg>
    </div>
  );
}
