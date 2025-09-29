// eslint-disable-next-line import/no-named-as-default
import Button from './components/Button/Button.tsx';
import {
  getSelector,
  getSelectors,
} from './utils/selectors.ts';

function App() {
  return (
    <>
      <h1>Me React</h1>
      <div style={{
        display: 'grid',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
      }}>
        <p></p>
        <p>Primary</p>
        <p>Secondary</p>
        <p>Text</p>
        <p>Danger</p>

        <p>Default</p>
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="text">Button</Button>
        <Button variant="danger">Button</Button>

        <p>Hover</p>
        <Button variant="primary" className={getSelector.class('hover')}>Button</Button>
        <Button variant="secondary" className={getSelector.class('hover')}>Button</Button>
        <Button variant="text" className={getSelector.class('hover')}>Button</Button>
        <Button variant="danger" className={getSelector.class('hover')}>Button</Button>

        <p>Pressed</p>
        <Button variant="primary" className={getSelector.class('active')}>Button</Button>
        <Button variant="secondary" className={getSelector.class('active')}>Button</Button>
        <Button variant="text" className={getSelector.class('active')}>Button</Button>
        <Button variant="danger" className={getSelector.class('active')}>Button</Button>

        <p>Focused</p>
        <Button variant="primary" className={getSelectors.class('focus', 'focus-within')}>Button</Button>
        <Button variant="secondary" className={getSelectors.class('focus', 'focus-within')}>Button</Button>
        <Button variant="text" className={getSelectors.class('focus', 'focus-within')}>Button</Button>
        <Button variant="danger" className={getSelectors.class('focus', 'focus-within')}>Button</Button>

        <p>Disabled</p>
        <Button variant="primary" disabled>Button</Button>
        <Button variant="secondary" disabled>Button</Button>
        <Button variant="text" disabled>Button</Button>
        <Button variant="danger" disabled>Button</Button>
      </div>
    </>
  );
}

export default App;
