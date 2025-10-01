import type { Validator } from "./TextField.validation";

export const numberRegex = /^-?\d+(\.\d+)?(e+\d+)?$/;
export const numberValidator = ((input: any) => (
  numberRegex.test(input) ? undefined : 'Must be a number'
)) satisfies Validator<any>;