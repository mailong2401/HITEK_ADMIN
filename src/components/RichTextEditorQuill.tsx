import { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "lucide-react";
import { supabase } from "@/services/supabase";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditorQuill({ value, onChange }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  // ✅ FIX QUAN TRỌNG: useMemo
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => fileRef.current?.click(),
      },
    },
  }), []);

  const formats = useMemo(() => [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ], []);

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const filePath = `editor/${filename}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection(true);

      if (editor && range) {
        editor.insertEmbed(range.index, "image", data.publicUrl);
      }
    } catch (err) {
      console.error(err);
      alert("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Nhập nội dung blog của bạn..."
        tabIndex={0}
        className="
        bg-white
        [&_.ql-toolbar]:rounded-t-lg
        [&_.ql-toolbar]:border-b
        [&_.ql-container]:min-h-[250px]
        [&_.ql-container]:rounded-b-lg
        [&_.ql-editor]:min-h-[200px]
        [&_.ql-editor]:cursor-text
        [&_.ql-editor]:text-base
        [&_.ql-editor]:leading-relaxed
        [&_.ql-editor]:text-black
        [&_.ql-editor_p]:text-black
        [&_.ql-editor_h1]:text-black
        [&_.ql-editor_h2]:text-black
        [&_.ql-editor_h3]:text-black
        [&_.ql-editor_strong]:text-black
      "

      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            uploadImage(file);
            e.target.value = "";
          }
        }}
      />

      {uploading && (
        <div className="flex items-center gap-2 border-t px-3 py-2 text-sm text-gray-500">
          <Upload className="w-4 h-4" />
          Đang upload ảnh...
        </div>
      )}
    </div>
  );
}
