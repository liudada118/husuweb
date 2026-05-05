type Props = {
  className?: string;
  label?: string;
};

export function IndustriesCard({ className = "", label = "PRIVATE EQUITY" }: Props) {
  return (
    <div
      className={`relative bg-[#d9d9d9] overflow-hidden flex items-center justify-center ${className}`}
    >
      <span
        className="font-['Poppins:Medium',sans-serif] uppercase text-white text-center"
        style={{ fontSize: "clamp(1.75rem, 3.2vw, 4rem)", letterSpacing: "0.02em" }}
      >
        {label}
      </span>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
