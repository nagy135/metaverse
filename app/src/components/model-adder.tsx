import createModel from "@api/create-model";
import { JwtTokenContext } from "App";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

export default () => {
  const { jwtToken } = useContext(JwtTokenContext);
  const [name, setName] = useState("");
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    // getModels(jwtToken).then((e) => setModels(e));
  }, []);

  const handleUpload = useCallback(() => {
    if (!fileRef.current) {
      alert("No file to upload !!!");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", fileRef.current);

    createModel(jwtToken, formData).then(() => alert("added"));
  }, [name]);

  return (
    <>
      <div className="container mx-auto flex flex-col items-center mt-5">
        <input
          type="text"
          value={name}
          className="input input-bordered w-full max-w-xs mb-3"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          className="input input-bordered w-full max-w-xs mb-3"
          onChange={(e) => {
            if (e.target.files) fileRef.current = e.target.files![0];
          }}
        />
        <button className="btn" onClick={() => handleUpload()}>
          Upload
        </button>
      </div>
    </>
  );
};
