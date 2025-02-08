import "./App.css";
import UploadWindow from "./components/UploadWindow";
import Container from "./components/Container";
import { useState } from "react";

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Container>
        <UploadWindow file={file} setFile={setFile} />
      </Container>
    </>
  );
}

export default App;
