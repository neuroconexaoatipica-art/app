interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = "", size = 48 }: LogoIconProps) {
  return (
    <img
      src="/logo-512x512.png"
      alt="NeuroConexão Atípica"
      width={size}
      height={size}
      className={`rounded-xl object-contain ${className}`}
    />
  );
}
