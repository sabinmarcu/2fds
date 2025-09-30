import { Checkbox } from './components/Checkbox/Checkbox.tsx';
import { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup.tsx';

function App() {
  return (
    <>
      <h1>Me React</h1>
      <CheckboxGroup label="All of them">
        <Checkbox name="stuff">Some Stuff</Checkbox>
        <Checkbox name="other stuff">Some other Stuff</Checkbox>
        <Checkbox name="awesome">Some awesome Stuff</Checkbox>
      </CheckboxGroup>
    </>
  );
}

export default App;
