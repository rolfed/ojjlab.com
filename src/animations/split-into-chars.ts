export const splitIntoChars = (element: HTMLElement) => {
    const text = element.textContent ?? "";
    element.setAttribute("aria-label", text);
    element.setAttribute("role", "heading");
    element.innerHTML = ""; // clear text

    const frag = document.createDocumentFragment();

    for (const _char of text) {
        const span = document.createElement("span");
        span.className = "char inline-block will-change-transform";
        span.textContent = _char;
        frag.appendChild(span);
    }

    element.appendChild(frag);
} 
