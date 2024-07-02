import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF"];

type Props = {
  pdfFile : any;
  setPdfFile: (pdfFile: any) => void;
}
function DropZone({pdfFile, setPdfFile} : Props) {
  const handleChange = (pdfFile) => {
    setPdfFile(pdfFile);
    console.log(pdfFile);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DropZone;