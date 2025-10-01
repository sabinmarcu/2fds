import {
  useState,
} from 'react';
import { NumberInput } from './components/Input/NumberInput.tsx';

import {
  getSelector,
  getSelectors,
} from './utils/selectors.ts';

const Field = (props: Omit<NumberInput.Props, 'value' | 'onChange'>) => {
  const [value, setValue] = useState(0);
  const onChange = (next: number) => setValue(next);
  return (<NumberInput {...props} value={value} onChange={onChange} />);
};

function App() {
  return (
    <>
      <h1>Me React</h1>
      <div style={{
        display: 'grid',
        gridTemplateRows: 'repeat(6, 1fr)',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}>

        <p>Default</p>
        <Field label="Text Input" />

        <p>Hover</p>
        <Field label="Text Input" className={getSelector.class('hover')} />

        <p>Focused</p>
        <Field label="Text Input" className={getSelectors.class('focus', 'focus-within')} />

        <p>Error</p>
        <Field label="Text Input" validators={[() => 'This is an error']} />

        <p>Disabled</p>
        <Field label="Text Input" disabled />

        <p>Read-only</p>
        <Field label="Text Input" readOnly />

      </div>
    </>
  );
}

export default App;
