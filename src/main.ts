// // import './style.css';
// // import typescriptLogo from './typescript.svg';
// // import viteLogo from '/vite.svg';
// import "./components/nav-container";
// import "./components/hero-container";
//
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <!-- <header> -->
//   <!--   <nav-container></nav-container> -->
//   <!-- </header> -->
//   <!-- <main> -->
//   <!--   <hero-container></hero-container> -->
//   <!-- </main> -->
//   <!-- <footer> -->
//   <!-- </footer> -->
// `;

import { toggleCalendarView } from "./functionality/calendar";


document.addEventListener("DOMContentLoaded", () => {
    toggleCalendarView(document);
});
