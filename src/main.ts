import { toggleCalendarView } from "./functionality/calendar";
import { heroTitleAnimation } from "./animations/title";
import { navAnimation } from './animations/nav.ts';
import { loaderAnimation } from "./animations/load-animation.ts";

let booted = false;
const _loader = loaderAnimation(document);
_loader.play();

const init = (callback: () => void) => {
    if (booted) { return; };
    booted = true;
    callback();
}

const executedFeatures = () => {
    // TODO fix document reference
    toggleCalendarView(document);
    navAnimation(document);
    heroTitleAnimation();
}

const isLoaded = document.readyState === "loading";

isLoaded 
    ? document.addEventListener("DOMContentLoaded", () => init(executedFeatures), { once: true }) 
    : init(executedFeatures);
