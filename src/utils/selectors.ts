export type Selectors = 'hover' | 'active' | 'focus' | 'focus-within' | 'disabled' | 'checked' | 'unchecked' | 'indeterminate' | 'valid' | 'invalid' | 'read-only';

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

export const parentSelector = (
  selector: string,
  target = 'input',
) => `&:has(${target}${selector.replace(/^&*/, '')})`;

export const parentSelectors = (
  ...selectors: string[]
) => selectors.map((selector) => parentSelector(selector)).join(', ');

const hoverSelectors = getSelector('hover');
const hoverSelectorsArray = hoverSelectors.split(', ');
const activeSelectors = getSelector('active');
const activeSelectorsArray = activeSelectors.split(', ');
const disabledSelectors = getSelector('disabled');
const disabledSelectorsArray = disabledSelectors.split(', ');

export const invalidSelectors = parentSelectors(':invalid', '[aria-invalid]');
const invalidSelectorsArray = invalidSelectors.split(', ');

export const readonlySelectors = parentSelectors('[readonly]');
const readonlySelectorsArray = readonlySelectors.split(', ');

export const fixSelector = (
  selectorArray: string[],
  disableSelectorArray: string[],
) => (
  selectorArray.flatMap(
    (selector) => [
      selector,
      disableSelectorArray.map(
        (disableSelector) => `:not(${disableSelector})`,
      ),
    ].flat().join(''),
  )
).join(', ');

export const fixedHoverSelector = fixSelector(
  hoverSelectorsArray,
  [
    disabledSelectorsArray,
    readonlySelectorsArray,
    invalidSelectorsArray,
  ].flat(),
);
export const fixedActiveSelector = fixSelector(activeSelectorsArray, [
  disabledSelectorsArray,
  readonlySelectorsArray,
  invalidSelectorsArray,
].flat());

export const fixedInvalidSelector = fixSelector(
  invalidSelectorsArray,
  hoverSelectorsArray,
);
