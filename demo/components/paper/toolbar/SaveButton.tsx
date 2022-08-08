import React, { ComponentProps, FC, useCallback } from "react";
import { usePaper } from "../context";
import { exportJSON } from "./utils";
import { Button } from "./button";
import { SaveIcon } from "./icons/SaveIcon";

type Props = ComponentProps<"button">;

export const SaveButton: FC<Props> = ({ className, ...props }) => {
  const [state] = usePaper();

  const handleClick = useCallback(() => {
    if (state.scope) {
      const json = exportJSON(state.scope!);
      console.log(JSON.stringify(json));
    }
  }, [state.scope]);

  return (
    <Button {...props} onClick={handleClick}>
      <SaveIcon />
    </Button>
  );
};
