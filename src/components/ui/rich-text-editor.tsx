import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter content...",
  height = "200px"
}) => {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .rich-text-editor .ql-toolbar {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid hsl(var(--border));
        background: hsl(var(--background));
        padding: 8px 12px;
      }
      
      .rich-text-editor .ql-container {
        border: none;
        background: hsl(var(--background));
        color: hsl(var(--foreground));
        font-family: inherit;
      }
      
      .rich-text-editor .ql-editor {
        padding: 12px;
        min-height: ${height};
        color: hsl(var(--foreground));
      }
      
      .rich-text-editor .ql-editor.ql-blank::before {
        color: hsl(var(--muted-foreground));
        font-style: normal;
      }
      
      .rich-text-editor .ql-toolbar .ql-stroke {
        stroke: hsl(var(--foreground));
      }
      
      .rich-text-editor .ql-toolbar .ql-fill {
        fill: hsl(var(--foreground));
      }
      
      .rich-text-editor .ql-toolbar button:hover {
        background: hsl(var(--accent));
      }
      
      .rich-text-editor .ql-toolbar button.ql-active {
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      
      .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
        stroke: hsl(var(--primary-foreground));
      }
      
      .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
        fill: hsl(var(--primary-foreground));
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [height]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'code-block',
    'link', 'color', 'background', 'align'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
      />
    </div>
  );
};

export default RichTextEditor;