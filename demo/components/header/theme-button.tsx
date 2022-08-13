import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from 'react-daisyui';
import { ButtonProps } from 'react-daisyui/dist/Button';

type Props = ButtonProps;

export const ThemeButton = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme]
  );

  useEffect(() => setMounted(true), []);

  if (!mounted || !theme) return null;

  return (
    <Button {...props} shape="circle" color="ghost" onClick={handleClick}>
      {theme === 'dark' ? <MoonIcon /> : <SunnyIcon />}
    </Button>
  );
};

const SunnyIcon = () => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-6 h-6 fill-current"
  >
    <title>Sunny</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
    />
    <circle
      cx="256"
      cy="256"
      r="80"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-6 h-6 fill-current"
  >
    <title>Moon</title>
    <path
      d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);
