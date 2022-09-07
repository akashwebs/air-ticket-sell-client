import JoditEditor from "jodit-react";
import React, { useRef } from "react";
const config = ["bold", "italic", "underline", "link", "unlink"];

const RichText = ({ setContent }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      tabIndex={8}
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default RichText;
