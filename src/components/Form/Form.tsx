import { useDebugValue, useMemo, useState, type FormEvent } from "react"
import { TextInput } from "../Input/TextInput"
import { NumberInput } from "../Input/NumberInput"
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup"
import { Checkbox } from "../Checkbox/Checkbox"
import { Button } from "../Button/Button"
import type { Validator } from "../Input/TextField.validation"
import { ageValidators, emailRegex, emailValidators } from "./Form.constants"
import { formStyle } from "./Form.css"
import { parseReport, type ReportType } from "./FormReport.constants"

const useControl = <T extends string | number | boolean>(
  initialValue: T,
  validators: Validator<T>[] = []
) => {
  const [state, setState] = useState<T>(initialValue);
  const onChange = (e: any) => {
    const nextValue = e.target ? e.target.value : e;
    setState(nextValue as any)
  }
  const cleanup = () => setState(initialValue);
  useDebugValue(state);
  return {
    value: state, 
    props: {
      value: state,
      onChange,
      validators,
    },
    cleanup,
  } as const;
}

export namespace Form {
  export type Props = {
    onSubmit: (input: ReportType) => void;
  }
}
export function Form({ onSubmit }: Form.Props) {
  // Could be handled with a form submit through FormData. 
  //
  // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  // }
  //
  // Let's do it with states, though, to control the form data on submit (cleanup).
  const name = useControl<string>('');
  const email = useControl<string>('', emailValidators)
  const age = useControl<number | ''>(0, ageValidators)
  const terms = useControl<Checkbox.States>(0);
  const commercial = useControl<Checkbox.States>(0);
  const finePrint = useControl<Checkbox.States>(0);
  const report = useMemo(
    () => parseReport({
      name: name.value,
      email: email.value,
      age: age.value,
      terms: terms.value,
      commercial: commercial.value,
      finePrint: finePrint.value
    }),
    [
      name.value,
      email.value,
      age.value,
      terms.value,
      commercial.value,
      finePrint.value
    ]
  )
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (report) {
      onSubmit?.(report);
      [name,email,age,terms,commercial,finePrint].forEach(({ cleanup }) => cleanup())
    }
  }
  return (
    <form onSubmit={onSubmitForm} className={formStyle}>
      <TextInput name="name" label="Full Name" {...name.props} />
      <TextInput name="email" label="Email Address" {...email.props} />
      <NumberInput name="age" label="Age" {...age.props} />
      <CheckboxGroup label="Agree to all below">
        <Checkbox name="terms" {...terms.props}>Agree to terms & conditions</Checkbox>
        <Checkbox name="commercial" {...commercial.props}>Agree to commercial uses of PII</Checkbox>
        <span style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <Checkbox name="fine-print" {...finePrint.props}>Agree to sell your soul to the devil</Checkbox>
        </span>
      </CheckboxGroup>
      <Button type="submit" disabled={!report}>Submit!</Button>
    </form>
  )
}