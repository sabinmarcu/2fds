import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { containers } from './frameworkConfig.ts';

ReactDOM.createRoot(
  document.querySelector(`#${containers.react}`) as HTMLElement,
).render(
  <App />,
);
