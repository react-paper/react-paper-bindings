import clsx from 'clsx';

type Props = React.ComponentProps<'div'>;

export const Toolbar = ({ className, children, ...props }: Props) => (
  <div
    {...props}
    className={clsx('flex px-3 h-14 border-b border-gray-300', className)}
  >
    {children}
  </div>
);
