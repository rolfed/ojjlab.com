export const validateElement = <T extends Element>(
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
