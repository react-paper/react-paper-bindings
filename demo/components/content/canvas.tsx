import clsx from 'clsx';
import { forwardRef } from 'react';
import { Canvas as PaperCanvas, CanvasProps } from 'react-paper-bindings';

type Props = Omit<CanvasProps, 'width' | 'height'> & {
  width?: number;
  height?: number;
};

export const Canvas = forwardRef<HTMLCanvasElement, Props>(function Canvas(
  { className, children, width = 320, height = 200, ...other },
  ref
) {
  return (
    <PaperCanvas
      {...other}
      ref={ref}
      width={width}
      height={height}
      className={clsx(
        'inline-block mr-4 mb-4 border border-gray-600',
        className
      )}
    >
      {children}
    </PaperCanvas>
  );
});
