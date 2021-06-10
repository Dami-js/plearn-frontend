import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WYSIWYGCKEditor = ({ onChange, data }) => {
  return (
    <div className="custom-ckeditor-editable">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default WYSIWYGCKEditor;
