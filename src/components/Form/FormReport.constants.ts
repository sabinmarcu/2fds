import type { States } from '../Checkbox/Checkbox.constants.ts';

export type ReportType = {
  name: string,
  email: string,
  age: number,
  terms: boolean,
  commercial: boolean,
  finePrint: boolean
};
export type LooseReportType = {
  name: string,
  email: string,
  age: number | '',
  terms: typeof States[keyof typeof States],
  commercial: typeof States[keyof typeof States],
  finePrint: typeof States[keyof typeof States],
};

export const isValidReport = (
  input: LooseReportType,
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
    ].every((it) => !!it),
    typeof age !== 'string',
    terms > 0,
    commercial > 0,
  ];
  return (predicates.every(Boolean));
};

export const parseReport = (input: LooseReportType) => {
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
};

