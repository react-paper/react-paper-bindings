import Link from 'next/link';
import { Menu } from 'react-daisyui';

type Props = {
  children?: React.ReactNode;
  href: string;
  onClick: () => void;
};

export const MenuItem = ({ children, href, onClick }: Props) => {
  return (
    <Menu.Item>
      <Link href={href} passHref>
        <a onClick={onClick}>{children}</a>
      </Link>
    </Menu.Item>
  );
};
