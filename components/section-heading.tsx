interface SectionHeadingProps {
  number: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ number, children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3 ${className}`}>
      <span className="font-mono text-teal text-xl md:text-2xl">{number}.</span>
      <span className="text-slate-lighter">{children}</span>
      <div className="h-px bg-slate flex-1 ml-6 max-w-xs"></div>
    </h2>
  );
}
