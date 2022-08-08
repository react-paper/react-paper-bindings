import clsx from "clsx";

type Props = React.ComponentProps<"h1">;

export const Title = ({ className, children, ...props }: Props) => (
  <h1 {...props} className={clsx("text-2xl mt-8 mb-4", className)}>
    {children}
  </h1>
);
