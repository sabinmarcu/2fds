import { States } from '../Checkbox/Checkbox.constants.ts';

export const deriveState = (target: HTMLInputElement) => {
  const state = (
    (target.indeterminate && States.INDETERMINATE)
    || (target.checked && States.CHECKED)
    || States.UNCHECKED
  );
  return state;
};

export const deriveOwnState = (states: typeof States[keyof typeof States][]) => {
  if (states.every((state) => state === States.CHECKED)) {
    return States.CHECKED;
  }
  if (states.every((state) => state === States.UNCHECKED)) {
    return States.UNCHECKED;
  }
  return States.INDETERMINATE;
};

export type StatesType = typeof States[keyof typeof States][];
export const detectState = (
  rootReference: HTMLDivElement | null,
  updater: (function_: (oldState: StatesType) => StatesType) => void,
) => {
  if (!rootReference) {
    return undefined;
  }
  const inputs = [
    ...rootReference.querySelectorAll('input[type=checkbox]') as any,
  ];

  const ids = inputs.map(
    (input) => input.getAttribute('id'),
  ).filter(Boolean) as string[];

  const cleanup: (() => void)[] = [];
  const currentState: StatesType = [];
  for (const [index, input] of Object.entries(inputs)) {
    const handler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const state = deriveState(target);
      updater((oldStates) => {
        const newStates = [...oldStates];
        newStates.splice(Number.parseInt(index, 10), 1, state);
        return newStates;
      });
    };
    input.addEventListener('change', handler);
    cleanup.push(() => input.removeEventListener('change', handler));
    currentState[Number.parseInt(index, 10)] = deriveState(input as HTMLInputElement);
  }

  updater(() => currentState);
  const cleanupFunction = () => {
    for (const clean of cleanup) {
      clean();
    }
  };
  return [ids, cleanupFunction] as const;
};

export const deriveA11yState = (state: typeof States[keyof typeof States]) => {
  if (state === States.CHECKED) {
    return 'true';
  }
  if (state === States.UNCHECKED) {
    return 'false';
  }
  return 'mixed';
};

export const toggleState = (
  rootReference: HTMLDivElement | null,
  state: typeof States[keyof typeof States],
) => {
  if (!rootReference) {
    return;
  }
  const rootInput = rootReference.parentNode!.querySelector('input[type=checkbox]:first-of-type') as HTMLInputElement;
  const nextState = state === States.CHECKED ? States.UNCHECKED : States.CHECKED;
  const inputs = [
    ...rootReference.querySelectorAll('input[type=checkbox]') as any,
  ];
  const targets = [
    ...rootReference.querySelectorAll('input[type=checkbox] ~ label:first-of-type') as any,
  ];
  for (const [index, input] of Object.entries(inputs)) {
    const target = targets[Number.parseInt(index, 10)];
    if (nextState) {
      if (!(input as HTMLInputElement).checked) {
        target.dispatchEvent(new MouseEvent('click'));
      }
    } else if ((input as HTMLInputElement).checked) {
      target.dispatchEvent(new MouseEvent('click'));
    }
  }
  rootInput.focus();
};
