import type { Validator } from "../Input/TextField.validation"

export const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/

export const emailValidators = [
  (input) => emailRegex.test(input) ? undefined : 'Must be an email'
] satisfies Validator<string>[]

export const ageValidators = [
    (input) => !input || input < 18 ? 'Must be over 18' : undefined,
    (input) => !input || input > 100 ? 'Must be under 100' : undefined,
] satisfies Validator<number | ''>[]