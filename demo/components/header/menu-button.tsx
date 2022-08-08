import { Button, ButtonProps } from "react-daisyui";

export const MenuButton = (props: ButtonProps) => (
  <Button {...props} shape="square" color="ghost">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-6 h-6 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </Button>
);
