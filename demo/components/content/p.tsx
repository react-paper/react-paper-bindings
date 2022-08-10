import clsx from 'clsx';

type Props = React.ComponentProps<'p'>;

export const P = ({ className, children, ...props }: Props) => (
  <p {...props} className={clsx('mb-4', className)}>
    {children}
  </p>
);
