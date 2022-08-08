import React, { ComponentProps } from "react";
import { usePaper } from "../context";
import { UndoIcon } from "./icons/UndoIcon";
import { Button } from "./button";

type Props = ComponentProps<"button">;

export const UndoButton = (props: Props) => {
  const [{ historyIndex }, dispatch] = usePaper();
  return (
    <Button
      {...props}
      disabled={historyIndex === 0}
      onClick={() => dispatch({ type: "undo" })}
    >
      <UndoIcon />
    </Button>
  );
};
