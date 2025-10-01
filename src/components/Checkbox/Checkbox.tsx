import { nanoid } from 'nanoid';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from 'react';
import {
  States,
  styleVariantMapping,
} from './Checkbox.constants';
import {
  checkboxStyles,
  checkboxBoxStyle,
  checkboxInputStyle,
  checkboxTextStyle,
} from './Checkbox.css';

export namespace Checkbox {
  export type States = typeof States[keyof typeof States];
  export type Props = PropsWithChildren<(
    & InputHTMLAttributes<HTMLInputElement>
    & {
      onChange?: (state: typeof States[keyof typeof States]) => void,
      value?: typeof States[keyof typeof States]
    }
  )>;
}

const deriveStateFromProps = (
  { value, checked }: Pick<Checkbox.Props, 'value' | 'checked'>,
) => (
  value !== undefined
    ? value
    : (checked ? States.CHECKED : States.UNCHECKED)
);
export function Checkbox({
  children,
  value,
  checked,
  onChange,
  className,
  readOnly,
  ...props
}: Checkbox.Props) {
  const id = useMemo(
    () => nanoid(),
    [],
  );

  const [state, setState] = useState<typeof States[keyof typeof States]>(
    deriveStateFromProps({
      value,
      checked,
    }),
  );

  useEffect(
    () => setState(deriveStateFromProps({
      value,
      checked,
    })),
    [value, checked],
  );

  const inputReference = useRef<HTMLInputElement>(null);
  useEffect(
    () => {
      if (!inputReference.current) {
        return;
      }
      inputReference.current.indeterminate = state === States.INDETERMINATE;
      inputReference.current.checked = state === States.CHECKED;
    },
    [state],
  );

  const localOnChange = () => {
    if (!inputReference.current || inputReference.current.readOnly) {
      return;
    }
    const nextState = (
      (inputReference.current.indeterminate && States.INDETERMINATE)
      || (inputReference.current.checked && States.CHECKED)
      || States.UNCHECKED
    );
    setState(nextState);
    onChange?.(nextState);
  };

  const stateVariant = useMemo(
    () => styleVariantMapping[state],
    [state],
  );

  return (
    <div className={[
      checkboxStyles({ state: stateVariant }),
      className,
    ].filter(Boolean).join(' ')}>
      <input
        {...props}
        ref={inputReference}
        id={id}
        type="checkbox"
        onChange={localOnChange}
        className={checkboxInputStyle}
        readOnly={readOnly}
        value={value}
      />
      <label htmlFor={id} className={checkboxBoxStyle}>
        {state === States.CHECKED
          ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.47417 1.05544C9.7197 1.31733 9.70644 1.72867 9.44455 1.9742L4.11141 6.9742C3.86138 7.2086 3.47232 7.20861 3.22229 6.97422L0.555433 4.47422C0.293531 4.22871 0.280247 3.81737 0.525763 3.55546C0.771278 3.29356 1.18262 3.28028 1.44452 3.52579L3.66681 5.60904L8.55541 1.02582C8.8173 0.780288 9.22864 0.793549 9.47417 1.05544Z" fill="white"/>
          </svg>
          : null}

        {state === States.INDETERMINATE
          ? <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.1499 0.999994C11.1499 1.35898 10.8589 1.64999 10.4999 1.64999L1.4999 1.64999C1.14092 1.64999 0.849903 1.35898 0.849903 0.999993C0.849903 0.641008 1.14092 0.349993 1.4999 0.349993L10.4999 0.349994C10.8589 0.349994 11.1499 0.641009 11.1499 0.999994Z" fill="white"/>
          </svg>

          : null}
      </label>
      <label htmlFor={id} className={checkboxTextStyle}>
        {children}
      </label>
    </div>

  );
}

