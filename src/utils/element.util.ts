export const searchUpperElementIsTagName = (
  target: HTMLElement | null,
  tagName: string,
): HTMLElement | null => {
  if (!target) return null;
  let res = false;

  if (target.tagName === tagName) res = true;

  return res
    ? target
    : searchUpperElementIsTagName(target.parentElement, tagName);
};

export const searchUpperElementHasAttr = (
  target: HTMLElement | null,
  attributes: { name: string; value: string }[],
): HTMLElement | null => {
  if (!target) return null;
  let res = false;
  attributes.forEach(attribute => {
    if (target.getAttribute(attribute.name) === attribute.value) res = true;
  });

  return res
    ? target
    : searchUpperElementHasAttr(target.parentElement, attributes);
};

export const getContainerEl = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel?.rangeCount) {
      const containerEl = sel.getRangeAt(0).commonAncestorContainer;
      if (containerEl.nodeType === 3) {
        return containerEl.parentNode;
      }
      return containerEl;
    }
  }

  return null;
};
