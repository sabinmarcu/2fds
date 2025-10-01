import type { ChangeEvent } from 'react';
import { TextField } from './TextField';

export namespace TextInput {
  export type Props = (
    & Omit<TextField.Props<string>, `slot${string}` | 'onChange'>
    & {
      onChange?: (input: string) => void;
    }
  );
}
export function TextInput({ onChange, ...props }: TextInput.Props) {
  const localOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onChange?.(value);
  return (<TextField {...props} onChange={localOnChange} />);
}
