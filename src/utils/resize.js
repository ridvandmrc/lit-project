export const Resize = (observeElement, callback) => {
  const obs = new ResizeObserver((element) => {
    const currentWidth = element[0].contentBoxSize[0].inlineSize;
    callback(currentWidth);
  });

  obs.observe(observeElement);
  return obs;
};
