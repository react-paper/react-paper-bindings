import React, { useCallback } from 'react';
import { usePaper } from '../context';
import { exportJSON } from '../utils';
import { IconButton, Props } from './IconButton';
import { SaveIcon } from './icons/SaveIcon';

export const SaveButton = (props: Props) => {
  const [state] = usePaper();

  const handleClick = useCallback(() => {
    if (state.scope) {
      const json = exportJSON(state.scope!);
      console.log(JSON.stringify(json));
    }
  }, [state.scope]);

  return (
    <IconButton {...props} onClick={handleClick}>
      <SaveIcon />
    </IconButton>
  );
};
