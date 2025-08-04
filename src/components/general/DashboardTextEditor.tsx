// Props for the main DashboardTextEditor
type DashboardTextEditorProps = {
  title: string;
  body: string;
  setBody: (val: string) => void;
};

// Helper: Deserialize JSON or plain text to Slate value
const deserialize = (body: string): CustomElement[] => {
  if (!body) {
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
  }
  try {
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed)) {
      return parsed as CustomElement[];
    }
  } catch {
    // Not JSON, treat as plain text
    return [
      {
        type: "paragraph",
        children: [{ text: body }],
      },
    ];
  }
  return [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
};

// Helper: Serialize Slate value to string
const serialize = (value: Descendant[]): string => {
  return JSON.stringify(value);
};
// Props for ToolbarDropdown
type DropdownProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};
import React, { useCallback, useMemo } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
  BaseEditor,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { css } from "@emotion/css";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Link2,
  Image as LucideImage,
  Code2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const ToolbarDropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={css`
      border: 1px solid #d1d5db;
      border-radius: 2px;
      padding: 0 2px;
      font-size: 11px;
      background: white;
      color: #374151;
      margin: 0 2px;
      height: 22px;
      min-width: 44px;
      max-width: 44px;
      cursor: pointer;
      vertical-align: middle;
      appearance: none;
      text-align: center;
      &:focus {
        outline: none;
        border-color: #3b82f6;
      }
    `}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const ToolbarButton: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  format?: string;
}> = ({ icon, active, disabled, onClick, format }) => (
  <button
    type="button"
    className={css`
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: color 0.15s;
      background: none;
      border: none;
      margin: 0 2px;
      padding: 0 6px;
      border-radius: 12px;
      &:hover {
        background: #f3f4f6;
      }
    `}
    style={{
      color: active ? "#2563eb" : disabled ? "#9ca3af" : "#374151",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
    onMouseDown={onClick}
    aria-label={format}
    disabled={disabled}
  >
    {icon}
  </button>
);

const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  label: string;
}> = ({ value, onChange, label }) => (
  <div
    className={css`
      position: relative;
      display: inline-block;
    `}
  >
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={css`
        width: 24px;
        height: 24px;
        border: 1px solid #d1d5db;
        border-radius: 3px;
        cursor: pointer;
        margin: 0 1px;
        &::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        &::-webkit-color-swatch {
          border: none;
          border-radius: 2px;
        }
      `}
      title={label}
    />
  </div>
);

// Custom Slate types
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
};
export type CustomElement =
  | { type: "paragraph"; align?: string; children: CustomText[] }
  | { type: "heading"; level: number; align?: string; children: CustomText[] }
  | { type: "image"; url: string; children: CustomText[] }
  | { type: "link"; url: string; children: CustomText[] }
  | { type: "bulleted-list"; align?: string; children: CustomElement[] }
  | { type: "numbered-list"; align?: string; children: CustomElement[] }
  | { type: "list-item"; children: CustomText[] }
  | { type: "code"; children: CustomText[] }
  | { type: "quote"; align?: string; children: CustomText[] };
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Toolbar: React.FC<{ editor: Editor & HistoryEditor }> = ({ editor }) => {
  const fontSizeOptions = [
    { value: "12px", label: "12" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
    { value: "28px", label: "28" },
    { value: "32px", label: "32" },
  ];
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getCurrentFontSize = () => {
    const marks = Editor.marks(editor) as Record<string, unknown> | null;
    return (marks?.fontSize as string) || "16px";
  };

  const getCurrentTextColor = () => {
    const marks = Editor.marks(editor) as Record<string, unknown> | null;
    return (marks?.color as string) || "#000000";
  };

  const getCurrentBackgroundColor = () => {
    const marks = Editor.marks(editor) as Record<string, unknown> | null;
    return (marks?.backgroundColor as string) || "#ffff00";
  };

  const isBlockActive = (format: string) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as CustomElement).type === format,
      })
    );
    return !!match;
  };

  const toggleBlock = (format: string) => {
    const isActive = isBlockActive(format);
    const isList = format === "numbered-list" || format === "bulleted-list";

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        ["numbered-list", "bulleted-list"].includes((n as CustomElement).type),
      split: true,
    });

    const validTypes = [
      "link",
      "paragraph",
      "heading",
      "image",
      "bulleted-list",
      "numbered-list",
      "list-item",
      "code",
      "quote",
    ] as const;
    const newType = isActive
      ? "paragraph"
      : isList
      ? "list-item"
      : validTypes.includes(format as CustomElement["type"])
      ? (format as CustomElement["type"])
      : "paragraph";
    const newProperties: Partial<CustomElement> = {
      type: newType,
    };

    Transforms.setNodes<CustomElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] } as CustomElement;
      Transforms.wrapNodes(editor, block);
    }
  };

  const setFontSize = (fontSize: string) => {
    Editor.addMark(editor, "fontSize", fontSize);
  };

  const setTextColor = (color: string) => {
    Editor.addMark(editor, "color", color);
  };

  const setBackgroundColor = (color: string) => {
    Editor.addMark(editor, "backgroundColor", color);
  };

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e7eb;
        background: none;
        padding: 0 0 4px 0;
        gap: 2px;
        flex-wrap: wrap;
        min-height: 36px;
      `}
    >
      {/* Font Size */}
      <ToolbarDropdown
        value={getCurrentFontSize()}
        options={fontSizeOptions}
        onChange={setFontSize}
      />
      <ColorPicker
        value={getCurrentTextColor()}
        onChange={setTextColor}
        label="Text Color"
      />
      <ColorPicker
        value={getCurrentBackgroundColor()}
        onChange={setBackgroundColor}
        label="Highlight Color"
      />
      <ToolbarButton
        format="bold"
        icon={<Bold size={18} />}
        active={isMarkActive(editor, "bold")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "bold");
        }}
      />
      <ToolbarButton
        format="italic"
        icon={<Italic size={18} />}
        active={isMarkActive(editor, "italic")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "italic");
        }}
      />
      <ToolbarButton
        format="underline"
        icon={<Underline size={18} />}
        active={isMarkActive(editor, "underline")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "underline");
        }}
      />
      <ToolbarButton
        format="strikethrough"
        icon={<Strikethrough size={18} />}
        active={isMarkActive(editor, "strikethrough")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "strikethrough");
        }}
      />
      <ToolbarButton
        format="align-left"
        icon={<AlignLeft size={18} />}
        active={isBlockActive("align-left")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-left");
        }}
      />
      <ToolbarButton
        format="align-center"
        icon={<AlignCenter size={18} />}
        active={isBlockActive("align-center")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-center");
        }}
      />
      <ToolbarButton
        format="align-right"
        icon={<AlignRight size={18} />}
        active={isBlockActive("align-right")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-right");
        }}
      />
      <ToolbarButton
        format="numbered-list"
        icon={<ListOrdered size={18} />}
        active={isBlockActive("numbered-list")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("numbered-list");
        }}
      />
      <ToolbarButton
        format="bulleted-list"
        icon={<List size={18} />}
        active={isBlockActive("bulleted-list")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("bulleted-list");
        }}
      />
      <ToolbarButton
        format="link"
        icon={<Link2 size={18} />}
        onClick={(e) => {
          e.preventDefault();
          const url = window.prompt("Enter URL:");
          if (url) {
            Editor.addMark(editor, "link", url);
          }
        }}
      />
      <ToolbarButton
        format="image"
        icon={<LucideImage size={18} />}
        onClick={(e) => {
          e.preventDefault();
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const url = reader.result as string;
              const image = {
                type: "image",
                url,
                children: [{ text: "" }],
              } as CustomElement;
              Transforms.insertNodes(editor, image);
            };
            reader.readAsDataURL(file);
          }
          e.target.value = "";
        }}
      />
      <ToolbarButton
        format="code"
        icon={<Code2 size={18} />}
        active={isBlockActive("code")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("code");
        }}
      />
      <ToolbarButton
        format="quote"
        icon={<Quote size={18} />}
        active={isBlockActive("quote")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("quote");
        }}
      />
      <ToolbarButton
        format="undo"
        icon={<Undo2 size={18} />}
        onClick={(e) => {
          e.preventDefault();
          HistoryEditor.undo(editor);
        }}
      />
      <ToolbarButton
        format="redo"
        icon={<Redo2 size={18} />}
        onClick={(e) => {
          e.preventDefault();
          HistoryEditor.redo(editor);
        }}
      />
    </div>
  );
};

// Mark helpers
const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, unknown> | null;
  return marks ? marks[format] === true : false;
};
const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const DashboardTextEditor = ({
  title,
  body,
  setBody,
}: DashboardTextEditorProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = useMemo(() => deserialize(body), [body]);
  const renderElement = useCallback(
    (props: import("slate-react").RenderElementProps) => (
      <Element {...props} editor={editor} />
    ),
    [editor]
  );
  const renderLeaf = useCallback(
    (props: React.ComponentProps<typeof Leaf>) => <Leaf {...props} />,
    []
  );

  // Handle controlled value
  const handleChange = (val: Descendant[]) => {
    setBody(serialize(val));
  };

  // Get initial font size/color from marks for placeholder/first input
  const marks = Editor.marks(editor) as Record<string, unknown> | null;
  const fontSize = (marks?.fontSize as string) || "16px";
  const color = (marks?.color as string) || "#1f2937";
  return (
    <div>
      <h2 className="text-[#000000] text-[15px] font-normal">{title}</h2>
    <div
      className={css`
        direction: rtl;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #fff;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 0;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
      `}
    >
      <div
        className={css`
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
          padding: 16px 16px 0 16px;
          text-align: right;
        `}
      >
      </div>
      <Toolbar editor={editor} />
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي يستخدم بشكل شائع لتوضيح الشكل الجرافيكي للمستند أو الخط دون الاعتماد على محتوى ذي معنى. يمكن استخدام لوريم إيبسوم قبل نشر النسخة النهائية"
          className={css`
            min-height: 200px;
            padding: 16px;
            font-size: ${fontSize};
            color: ${color};
            line-height: 1.6;
            outline: none;
            background: #fff;
            direction: rtl;
            text-align: right;
            font-family: inherit;
            resize: vertical;
            overflow-y: auto;
            max-height: 400px;
            border: none;
            box-shadow: none;
            &::placeholder {
              color: #9ca3af !important;
              opacity: 1;
              -webkit-text-fill-color: #9ca3af !important;
            }
            &::-webkit-input-placeholder {
              color: #9ca3af !important;
            }
            &::-webkit-scrollbar {
              width: 6px;
            }
            &::-webkit-scrollbar-track {
              background: #f1f5f9;
            }
            &::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 3px;
            }
            &::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `}
          spellCheck
          autoFocus={false}
        />
      </Slate>
    </div>
    </div>

  );
};

// Custom element renderers (expand for lists, images, code, etc.)
import { RenderElementProps, RenderLeafProps } from "slate-react";

const Element = ({
  attributes,
  children,
  element,
  editor,
}: RenderElementProps & { editor: Editor }) => {
  const el = element as CustomElement;
  const style: React.CSSProperties = {};

  // Handle alignment
  if ("align" in el && el.align) {
    style.textAlign = el.align as "left" | "center" | "right" | "justify";
  }

  switch (el.type) {
    case "code":
      return (
        <pre
          {...attributes}
          className={css`
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 12px;
            font-family: "Courier New", monospace;
            font-size: 14px;
            overflow-x: auto;
            direction: ltr;
            text-align: left;
          `}
        >
          <code>{children}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote
          {...attributes}
          style={style}
          className={css`
            border-right: 4px solid #3b82f6;
            margin: 8px 0;
            padding: 8px 16px;
            background: #f8fafc;
            font-style: italic;
            color: #64748b;
          `}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          {...attributes}
          style={style}
          className={css`
            padding-right: 20px;
            margin: 8px 0;
          `}
        >
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol
          {...attributes}
          style={style}
          className={css`
            padding-right: 20px;
            margin: 8px 0;
          `}
        >
          {children}
        </ol>
      );
    case "list-item":
      return (
        <li
          {...attributes}
          className={css`
            margin: 4px 0;
          `}
        >
          {children}
        </li>
      );
    case "image":
      return (
        <div
          {...attributes}
          className={css`
            position: relative;
            display: inline-block;
          `}
        >
          <div contentEditable={false} style={{ position: "relative" }}>
            <img
              src={el.url || ""}
              alt="Inserted image"
              className={css`
                max-width: 100%;
                height: auto;
                border-radius: 4px;
                display: block;
                margin: 8px auto;
              `}
            />
            <button
              type="button"
              onClick={() => {
                const path = ReactEditor.findPath(
                  editor as ReactEditor,
                  element
                );
                Transforms.removeNodes(editor, { at: path });
              }}
              className={css`
                position: absolute;
                top: 4px;
                left: 4px;
                background: rgba(255, 255, 255, 0.85);
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                z-index: 2;
                font-size: 16px;
                color: #ef4444;
                transition: background 0.15s;
                &:hover {
                  background: #fee2e2;
                }
              `}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      );
    // align-left, align-center, align-right cases removed (not valid element types)
    default:
      return (
        <p
          {...attributes}
          style={style}
          className={css`
            margin: 8px 0;
            line-height: 1.6;
          `}
        >
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const l = leaf as CustomText;
  let el = children;

  const style: React.CSSProperties = {};

  // Apply text formatting
  if (l.fontSize) {
    style.fontSize = l.fontSize;
  }

  if (l.color) {
    style.color = l.color;
  }

  if (l.backgroundColor) {
    style.backgroundColor = l.backgroundColor;
  }

  if (l.bold) {
    el = <strong>{el}</strong>;
  }

  if (l.italic) {
    el = <em>{el}</em>;
  }

  if (l.underline) {
    el = <u>{el}</u>;
  }

  if (l.strikethrough) {
    el = <s>{el}</s>;
  }

  // Handle links
  // Remove link property usage from CustomText

  return (
    <span
      {...attributes}
      style={style}
      className={css`
        ${l.backgroundColor ? "padding: 2px 4px; border-radius: 2px;" : ""}
      `}
    >
      {el}
    </span>
  );
};

export default DashboardTextEditor;
