import { useState } from "react";
import { Form } from "./components/Form/Form";
import type { ReportType } from "./components/Form/FormReport.constants";
import { FormReport } from "./components/Form/FormReport";

function App() {
  const [report, setReport] = useState<ReportType>()
  return (
    <>
      <h1>React Application</h1>
      <Form onSubmit={setReport} />
      {report ? <FormReport {...report} /> : null}
    </>
  );
}

export default App;
