import clsx from 'clsx';

type Props = React.ComponentProps<'div'>;

export const Toolbar = ({ className, children, ...props }: Props) => (
  <div {...props} className={clsx('flex mb-4', className)}>
    {children}
  </div>
);
