import { useState } from "react";
import { Form } from "../layout";
import { useUserFiles } from "../../hooks/useUserFiles";

export const UploadFileForm = () => {
  const { handleUploadFile } = useUserFiles();
  const [fileToUpload, setFileToUpload] = useState(null);

  return (
    <Form className="container-fluid bg-transparent d-grid">
      <div className="card text-center  ">
        <div className="card-header">
          <h4>Upload new File</h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label htmlFor={"file-input"} className="form-label">
              upload file
            </label>
            <input
              type="file"
              className="form-control"
              id="#file-input"
              style={{ padding: "10% 25%" }}
              onChange={(e) => setFileToUpload(e.target.files[0])}
            />
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary w-100"
            onClick={(e) => handleUploadFile(e, fileToUpload)}
          >
            Upload file
          </button>
        </div>
      </div>
    </Form>
  );
};
