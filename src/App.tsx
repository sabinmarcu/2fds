import { Checkbox } from './components/Checkbox/Checkbox.tsx';
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
        gridTemplateRows: 'repeat(7, 1fr)',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}>
        <p></p>
        <p>Unchecked</p>
        <p>Checked</p>
        <p>Indeterminate</p>

        <p>Default</p>
        <Checkbox>Checkbox input</Checkbox>
        <Checkbox checked>Checkbox input</Checkbox>
        <Checkbox value={-1}>Checkbox input</Checkbox>

        <p>Hover</p>
        <Checkbox className={getSelector.class('hover')}>Checkbox input</Checkbox>
        <Checkbox className={getSelector.class('hover')} checked>Checkbox input</Checkbox>
        <Checkbox className={getSelector.class('hover')} value={-1}>Checkbox input</Checkbox>

        <p>Focused</p>
        <Checkbox className={getSelectors.class('focus', 'focus-within')}>Checkbox input</Checkbox>
        <Checkbox className={getSelectors.class('focus', 'focus-within')} checked>Checkbox input</Checkbox>
        <Checkbox className={getSelectors.class('focus', 'focus-within')} value={-1}>Checkbox input</Checkbox>

        <p>Error</p>
        <Checkbox aria-invalid>Checkbox input</Checkbox>
        <Checkbox aria-invalid checked>Checkbox input</Checkbox>
        <Checkbox aria-invalid value={-1}>Checkbox input</Checkbox>

        <p>Disabled</p>
        <Checkbox disabled>Checkbox input</Checkbox>
        <Checkbox disabled checked>Checkbox input</Checkbox>
        <Checkbox disabled value={-1}>Checkbox input</Checkbox>

        <p>Read-only</p>
        <Checkbox readOnly>Checkbox input</Checkbox>
        <Checkbox readOnly checked>Checkbox input</Checkbox>
        <Checkbox readOnly value={-1}>Checkbox input</Checkbox>
      </div>
    </>
  );
}

export default App;
