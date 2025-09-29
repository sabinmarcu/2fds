export type Selectors = 'hover' | 'active' | 'focus' | 'focus-within' | 'disabled';

const getCSSSelector = <Selector extends Selectors>(selector: Selector) => (
  `:${selector}` as `:${Selector}`
);

const getClassSelector = <Selector extends Selectors>(selector: Selector) => (
  `__${selector}__` as `__${Selector}__`
);

export const getSelector = <Selector extends Selectors>(selector: Selector) => [
  `&${getCSSSelector(selector)}`,
  `&.${getClassSelector(selector)}`,
].join(', ');

getSelector.class = getClassSelector;
getSelector.css = getCSSSelector;

export const getSelectors = <SelectorsInput extends Selectors[]>(
  ...selectors: SelectorsInput
) => (
    selectors.flatMap((selector) => getSelector(selector))
  ).join(', ');

getSelectors.class = <SelectorsInput extends Selectors[]>(
  ...selectors: SelectorsInput
) => (
    selectors.flatMap(
      (selector) => getSelector.class(selector),
    ).join(', ')
  );
getSelectors.css = <SelectorsInput extends Selectors[]>(
  ...selectors: SelectorsInput
) => (
    selectors.flatMap(
      (selector) => getSelector.css(selector),
    ).join(', ')
  );
