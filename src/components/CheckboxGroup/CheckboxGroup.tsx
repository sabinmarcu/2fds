import {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
} from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import {
  checkboxGroupListStyle,
  checkboxGroupStyle,
} from './CheckboxGroup.css.ts';
import {
  deriveA11yState,
  deriveOwnState,
  detectState,
  toggleState,
  type StatesType,
} from './CheckboxGroup.core.ts';

export namespace CheckboxGroup {
  export type Props = (
    & Omit<Checkbox.Props, 'value' | 'onChange'>
    & { label?: string }
  );
}

export function CheckboxGroup({
  children,
  label,
  ...props
}: CheckboxGroup.Props) {
  const rootReference = useRef<HTMLDivElement>(null);
  const [ids, setIds] = useState<string[]>([]);
  const [states, setStates] = useState<StatesType>([]);
  const ownState = useMemo(
    () => deriveOwnState(states),
    [states],
  );

  useLayoutEffect(
    () => {
      const detectResult = detectState(
        rootReference.current,
        setStates,
      );
      if (!detectResult) {
        return undefined;
      }
      const [detectedIds, cleanup] = detectResult;
      setIds(detectedIds);
      return cleanup;
    },
    [children],
  );

  const ownStateValue = useMemo(
    () => deriveA11yState(ownState),
    [ownState],
  );

  const onToggle = useCallback(
    () => {
      toggleState(rootReference.current, ownState);
    },
    [rootReference, ownState],
  );

  return (
    <div className={checkboxGroupStyle}>
      <Checkbox
        {...props}
        aria-controls={ids.join(' ')}
        aria-checked={ownStateValue}
        value={ownState}
        onChange={onToggle}
      >
        {label}
      </Checkbox>
      <div ref={rootReference} className={checkboxGroupListStyle}>
        {children}
      </div>
    </div>
  );
}
