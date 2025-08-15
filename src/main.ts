import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';
import "./components/nav-container";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <nav-container></nav-container>
  </main>
`;
