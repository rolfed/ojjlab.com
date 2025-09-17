export const splitIntoChars = <T extends Element>(el: T) => {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = ''; // clear

  const frag = document.createDocumentFragment();

  // Split and keep spaces as separate tokens
  const tokens = text.split(/(\s+)/); // captures spaces

  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      // Keep real spaces so wrapping is allowed between words
      frag.appendChild(document.createTextNode(token));
      continue;
    }

    // Word wrapper prevents breaking inside words
    const word = document.createElement('span');
    word.className = 'word inline-block align-baseline';
    // optional but explicit:
    word.style.whiteSpace = 'nowrap';

    // Per-letter spans (animate these)
    for (const ch of [...token]) {
      const c = document.createElement('span');
      c.className = 'char inline-block will-change-transform';
      c.textContent = ch;
      word.appendChild(c);
    }

    frag.appendChild(word);
  }

  el.appendChild(frag);
};
