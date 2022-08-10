import clsx from 'clsx';

type Props = React.ComponentProps<'div'>;

export const Container = ({ className, children, ...props }: Props) => (
  <div
    {...props}
    className={clsx(
      'container mx-auto p-4 overflow-hidden max-w-full',
      className
    )}
  >
    {children}
  </div>
);
