interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  return (
    <div className={`${center ? "text-center" : ""} mb-10`}>
      <h2 className="text-4xl font-bold text-gray-900">{title}</h2>

      {subtitle && (
        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
