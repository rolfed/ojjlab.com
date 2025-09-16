import type { Timeline } from "../model/gsap";
import { getAllElementsByDataAnimation, getElementByDataAnimation } from "./data-animation";
import { splitIntoChars } from "./split-into-chars";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger);

// let smoother = ScrollSmoother.create({
//     smooth: 2,
//     effects: true
// });

const LOCATION = 'whyWeExistSection';

// TODO: Implement content animation functionality
// const contentAnimation = <T extends Element>(element: T) => {
// }

export const whyWeExistAnimation = () => {
    const element = getElementByDataAnimation(LOCATION, 'why-we-exist');
    if (!element) { return; };
    // contentAnimation<HTMLElement>(element)

    const box = getElementByDataAnimation(LOCATION, 'why-we-exist-content');
    const title = getElementByDataAnimation(LOCATION, 'why-we-exist-title');
    const paragraphs = getAllElementsByDataAnimation(LOCATION, 'why-we-exist-paragraph');

    if (!box || !title || !paragraphs) { return; }

    splitIntoChars(title as HTMLHeadingElement);
    const chars = title.querySelectorAll<HTMLElement>(".char")

    // Grow Box On Scroll: height first, then width (scrubbed)
    const growTimeline: Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top 100%",
            end: "top 10%",
            scrub: 0.5, 
            anticipatePin: 1,
            onEnter: () => { 
                console.log("Section entered viewport"); 
                textTimeline.play();
            },
            onLeave: () => { 
                console.log("Section left viewport"); 
                textTimeline.reverse(0);
            }
        }
    });

    gsap.set(box, { autoAlpha: 0 });

    growTimeline
        .to(box, { autoAlpha: 1,  duration: 1.0, ease: "power2.out"})

    const textTimeline: Timeline = gsap.timeline({
        paused: true
    });

    textTimeline
        .from(chars, {
            delay: 1,
            yPercent: 5, 
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.2 
        })
        .from(paragraphs, {
            autoAlpha: 0,
            y: 12,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.25,
        }, "-=0.15");
};
