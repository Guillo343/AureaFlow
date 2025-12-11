interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
