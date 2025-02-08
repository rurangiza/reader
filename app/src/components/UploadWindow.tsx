import file_icon from "../assets/upload-file.svg";
import Button from "./Button";
import { FormEvent, ChangeEvent, useState } from "react";

const API_ENDPOINT = 'http://127.0.0.1:8000/api/upload'

interface Props {
  file: File | null;
  setFile: (file: File) => void;
}

const UploadWindow = ({ file, setFile }: Props) => {
  const [fileName, setFileName] = useState("");

  function formatFileName(name: string): string {
    return name.replace(/\.pdf$/i, "").replace(/\./g, " ");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files?.[0]);
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(formatFileName(selectedFile.name));
      console.log(`Saved file: ${fileName}`);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!file || file.type !== "application/pdf") {
      alert("Cannot submit this file: either none or not PDF");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fileName);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'x-reader-allowed': 'true'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Upload successful:', data);

    } catch (error) {
      alert(`Failed to submit PDF: ${error}`)
    }

  }

  const disabled = file ? false : true;

  return (
    <div>
      <form action="" className="" onSubmit={handleSubmit}>
        <label htmlFor="file-upload-form">
          <div
            className={`flex flex-col items-center border-2 border-dashed ${
              disabled ? "border-[#AEBDF2]" : "text-blue-500"
            } border-b-0 p-30 max-w-lg min-w-lg cursor-pointer`}
          >
            {file ? (
              <p className="text-4xl">{fileName}</p>
            ) : (
              <>
                <img src={file_icon} width="50" alt="Upload Document Icon" />
                <p>Click to upload or drag & drop</p>
                <p className="text-blue-500 text-sm">Only pdfs</p>
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          hidden
          name="file-upload-form"
          id="file-upload-form"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <Button type="submit" disabled={file ? false : true}>
          Send File
        </Button>
      </form>
    </div>
  );
};

export default UploadWindow;
