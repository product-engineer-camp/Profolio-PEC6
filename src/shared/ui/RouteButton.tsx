import { ButtonHTMLAttributes } from 'react';
// import { useRouter } from 'next/navigation';


type  RouteButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> & {
  path: string;
}

export function RouteButton({
  path,
  className,
  onClick,
  title,
  ...props
}: RouteButtonProps) {
  // const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    // router.push(path.path);
  };

  return (
    <button
      className={`route-button ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      {title}
    </button>
  );
} 