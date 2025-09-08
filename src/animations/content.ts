import { getAllElementsByDataAnimation, getElementByDataAnimation } from "./data-animation";

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

    console.log([box, title, paragraphs]);
};
