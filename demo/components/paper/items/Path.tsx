import React, { useCallback } from "react";
import { Path as PaperPath } from "react-paper-bindings";

type Props = {
  id?: string;
  active?: boolean;
  pathData?: string;
  selected?: boolean;
  strokeColor?: string;
  strokeScaling?: boolean;
  strokeWidth?: number;
};

export const Path = (props: Props) => {
  const handleMouseEnter = useCallback(() => {
    if (document.body) {
      document.body.style.cursor = "pointer";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (document.body) {
      document.body.style.cursor = "auto";
    }
  }, []);

  return (
    <PaperPath
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
