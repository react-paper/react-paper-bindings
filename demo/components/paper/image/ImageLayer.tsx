import React, { FC, useCallback } from "react";
import { Layer, Raster } from "react-paper-bindings";

import { Image } from "./types";
import { usePaper } from "../context";
import { fitImage } from "./fitImage";

type Props = {
  image: Image;
};

export const ImageLayer: FC<Props> = ({ image }) => {
  const [state, dispatch] = usePaper();

  const handleImageLoad = useCallback(
    (raster: paper.Raster) => {
      if (raster && raster.view) {
        raster.fitBounds(0, 0, image.width, image.height);
        fitImage(raster.view, image);
        dispatch({ type: "setImage", image });
      }
    },
    [image, dispatch]
  );

  return (
    <Layer id={image.id} visible={!!state.image}>
      <Raster locked source={image.url} onLoad={handleImageLoad} />
    </Layer>
  );
};
