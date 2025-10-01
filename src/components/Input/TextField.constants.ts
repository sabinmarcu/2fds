import type { Validator } from "./TextField.validation";

export const requiredValidator = (
  (input: string) => input && `${input}`.length > 0 ? undefined : 'Required'
) satisfies Validator;