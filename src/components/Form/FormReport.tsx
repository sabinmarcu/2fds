import type { ReportType } from "./FormReport.constants"

export namespace FormReport {
  export type Props = ReportType
}
export function FormReport({
  name,
  email,
  age,
  terms,
  commercial,
  finePrint
}: FormReport.Props) {
  return (
    <>
      <h1>Form Report</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Agreements: {[
        terms && "Terms & Conditions",
        commercial && 'Commercial uses',
        finePrint && 'Sold your soul'
      ].filter(Boolean).join(', ')}</p>
    </>
  )
}