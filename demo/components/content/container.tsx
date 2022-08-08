import clsx from "clsx";

type Props = React.ComponentProps<"p">;

export const Container = ({ className, children, ...props }: Props) => (
  <div {...props} className={clsx("container mx-auto px-4", className)}>
    {children}
  </div>
);
