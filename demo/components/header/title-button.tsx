import Link from 'next/link';
import clsx from 'clsx';

type Props = React.ComponentProps<'a'>;

export const TitleButton = ({ className, ...props }: Props) => (
  <Link href="/" passHref>
    <a
      className={clsx(
        'btn btn-ghost font-normal normal-case text-xl',
        className
      )}
      {...props}
    >
      react-paper-bindings
    </a>
  </Link>
);
