import type { Checkbox } from "../Checkbox/Checkbox"
import { validate } from "../Input/TextField.validation"

export type ReportType = {
  name: string,
  email: string,
  age: number,
  terms: boolean,
  commercial: boolean,
  finePrint: boolean
}
export type LooseReportType = {
  name: string,
  email: string,
  age: number | '',
  terms: Checkbox.States,
  commercial: Checkbox.States,
  finePrint: Checkbox.States
}

export const parseReport = (input: LooseReportType) => {
  console.log({input, valid: isValidReport(input)})
  if (isValidReport(input)) {
    return {
      name: input.name,
      email: input.email,
      age: input.age as number,
      terms: input.terms === 1,
      commercial: input.commercial === 1,
      finePrint: input.finePrint === 1,
    } satisfies ReportType;
  }
  return undefined;
}

export const isValidReport = (
  input: LooseReportType
): boolean => {
  const {
    name,
    email,
    age,
    terms,
    commercial,
  } = input; 
  const predicates = [
    [
      name,
      email,
      age,
      terms,
      commercial,
    ].every(it => !!it),
    typeof age !== 'string',
    terms > 0,
    commercial > 0,
  ];
  console.log(predicates)
  return (predicates.every(it => it))
};