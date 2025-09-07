export const getAnimationSelector = (name: string): string => {
  return `[data-animation="${name}"]`;
}  

const getElement = <T extends Element>(
    location: string = 'undifined location',
    selector: string,
): T | null => {
    const _element = document.querySelector<T>(selector);

    if (!_element) {
        console.error(`${location}: unable to find ${selector}`)
        return null;
    }

    return _element;
}

export const getElementByDataAnimation = <T extends Element>(location: string, selector: string): T | null => {
  const _selector = getAnimationSelector(selector);
  return getElement(location, _selector) as T | null; 
}

