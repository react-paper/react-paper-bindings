export const exportJSON = (scope: paper.PaperScope) => {
  const [, ...layers] = scope.project.layers;
  const json = layers.map((layer) => {
    const items = layer.children.map((item) => {
      return {
        id: item.props.id,
        name: item.props.name,
        type: item.type,
        pathData: item.pathData,
        strokeColor: item.strokeColor?.toCSS(true),
        strokeWidth: item.strokeWidth,
        strokeScaling: item.strokeScaling,
      };
    });
    return {
      id: layer.props.id,
      name: layer.props.name,
      type: 'Layer',
      items,
    };
  });
  return json;
};
