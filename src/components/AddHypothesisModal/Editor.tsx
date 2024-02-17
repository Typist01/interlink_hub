import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState, Editor } from "draft-js";
import "draft-js/dist/Draft.css";

// Interface for uploaded image data
interface UploadImageResult {
  url: string; // URL of the uploaded image
  // additional properties as needed (e.g., size, format)
}

// Function to handle image upload (replace with your implementation)
const uploadImage = (file: File): Promise<UploadImageResult> => {
  // ... your image upload logic
  return new Promise((resolve, reject) => {
    // Replace with your success/error handling
    resolve({ url: "https://example.com/image.png" }); // Placeholder image URL
  });
};

interface MyRichTextEditorProps {}

const MyRichTextEditor: React.FC<MyRichTextEditorProps> = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  //   const handleImageClick = () => {
  //     const selection = editorState.getSelection();
  //     RichUtils.insertImage(editorState, uploadImage, selection);
  //   };

  return (
    <div>
      {/* <button onClick={handleImageClick}>Insert Image</button> */}
      <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  );
};

export default MyRichTextEditor;
