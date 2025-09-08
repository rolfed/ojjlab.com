import { getAllElementsByDataAnimation, getElementByDataAnimation } from "./data-animation";
import { splitIntoChars } from "./split-into-chars";

const LOCATION = 'whyWeExistSection';

const contentAnimation = <T extends Element>(element: T) => {
}

export const whyWeExistAnimation = () => {
    const element = getElementByDataAnimation(LOCATION, 'why-we-exist');
    if (!element) { return; };
    contentAnimation<HTMLElement>(element)

    const box = getElementByDataAnimation(LOCATION, 'why-we-exist-content');
    const title = getElementByDataAnimation(LOCATION, 'why-we-exist-title');
    const paragraphs = getAllElementsByDataAnimation(LOCATION, 'why-we-exist-para');

    if (!box || !title || !paragraphs) { return; }

    splitIntoChars<HTMLHeadingElement>(title);
    const chars = title.querySelectorAll<HTMLElement>(".char")
    console.log(chars);

    console.log([box, title, paragraphs]);
};
