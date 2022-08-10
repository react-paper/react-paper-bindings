import clsx from 'clsx';
import { Canvas as PaperCanvas, CanvasProps } from 'react-paper-bindings';

type Props = Omit<CanvasProps, 'width' | 'height'> & {
  width?: number;
  height?: number;
};

export const Canvas = ({
  className,
  children,
  width = 320,
  height = 200,
  ...props
}: Props) => (
  <PaperCanvas
    {...props}
    width={width}
    height={height}
    className={clsx('inline-block mr-4 mb-4 border border-gray-600', className)}
  >
    {children}
  </PaperCanvas>
);
