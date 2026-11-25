interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'w-8 h-8 text-leopard-amber shrink-0' }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <path
        d="M12 22.5C12 18.5 14.8 15.5 18 15.5C21.2 15.5 24 18.5 24 22.5C24 24.4 22.4 25.5 20.5 25.5C19.3 25.5 18.6 24.9 18 24.9C17.4 24.9 16.7 25.5 15.5 25.5C13.6 25.5 12 24.4 12 22.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="11.5" cy="13.5" r="1.6" fill="currentColor" />
      <circle cx="15.8" cy="10.8" r="1.6" fill="currentColor" />
      <circle cx="20.2" cy="10.8" r="1.6" fill="currentColor" />
      <circle cx="24.5" cy="13.5" r="1.6" fill="currentColor" />
    </svg>
  );
}
