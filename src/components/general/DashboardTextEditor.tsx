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

// Props for ToolbarDropdown
type DropdownProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
};

import React, { useCallback, useMemo } from "react";
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
  BaseEditor,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { css } from "@emotion/css";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Link2,
  Image as LucideImage,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  ChevronDown,
} from "lucide-react";

const ToolbarDropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
}) => (
  <div className={css`
    position: relative;
    display: inline-block;
  `}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={css`
        appearance: none;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        padding: 4px 24px 4px 8px;
        font-size: 13px;
        color: #374151;
        min-width: 100px;
        height: 28px;
        cursor: pointer;
        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        &:hover {
          border-color: #d1d5db;
        }
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown 
      size={14} 
      className={css`
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #6b7280;
      `}
    />
  </div>
);

const ToolbarButton: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  format?: string;
  title?: string;
}> = ({ icon, active, disabled, onClick, format, title }) => (
  <button
    type="button"
    title={title}
    className={css`
      height: 28px;
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      background: ${active ? '#e3f2fd' : 'transparent'};
      border: 1px solid ${active ? '#2196f3' : 'transparent'};
      border-radius: 4px;
      color: ${active ? '#1976d2' : disabled ? '#9ca3af' : '#374151'};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      transition: all 0.15s;
      &:hover:not(:disabled) {
        background: ${active ? '#e3f2fd' : '#f3f4f6'};
        border-color: ${active ? '#2196f3' : '#e5e7eb'};
      }
    `}
    onMouseDown={onClick}
    aria-label={format}
    disabled={disabled}
  >
    {icon}
  </button>
);

const ColorButton: React.FC<{
  value: string;
  onChange: (color: string) => void;
  label: string;
  icon: React.ReactNode;
}> = ({ value, onChange, label, icon }) => (
  <div className={css`
    position: relative;
    display: inline-block;
  `}>
    <button
      type="button"
      title={label}
      className={css`
        height: 28px;
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
        position: relative;
        &:hover {
          background: #f3f4f6;
          border-color: #e5e7eb;
        }
      `}
    >
      {icon}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        `}
      />
      <div
        className={css`
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 3px;
          background-color: ${value};
          border-radius: 1px;
        `}
      />
    </button>
  </div>
);

const ToolbarDivider = () => (
  <div className={css`
    width: 1px;
    height: 20px;
    background: #e5e7eb;
    margin: 0 4px;
  `} />
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
  const textFormatOptions = [
    { value: "paragraph", label: "Normal text" },
    { value: "heading-1", label: "Heading 1" },
    { value: "heading-2", label: "Heading 2" },
    { value: "heading-3", label: "Heading 3" },
  ];

  const fontSizeOptions = [
    { value: "11px", label: "11" },
    { value: "12px", label: "12" },
    { value: "13px", label: "13" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
    { value: "28px", label: "28" },
    { value: "32px", label: "32" },
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getCurrentTextFormat = () => {
    const { selection } = editor;
    if (!selection) return "paragraph";

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n),
      })
    );

    if (match) {
      const element = match[0] as CustomElement;
      if (element.type === "heading") {
        return `heading-${element.level}`;
      }
      return element.type;
    }
    return "paragraph";
  };

  const getCurrentFontSize = () => {
    const marks = Editor.marks(editor) as Record<string, unknown> | null;
    return (marks?.fontSize as string) || "14px";
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

  const setTextFormat = (format: string) => {
    if (format.startsWith("heading-")) {
      const level = parseInt(format.split("-")[1]);
      Transforms.setNodes(
        editor,
        { type: "heading", level } as Partial<CustomElement>,
        { match: (n) => Editor.isBlock(editor, n) }
      );
    } else {
      Transforms.setNodes(
        editor,
        { type: format } as Partial<CustomElement>,
        { match: (n) => Editor.isBlock(editor, n) }
      );
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
        background: #fafafa;
        padding: 8px 12px;
        gap: 4px;
        flex-wrap: wrap;
        min-height: 44px;
      `}
    >
      {/* Text Format Dropdown */}
      <ToolbarDropdown
        value={getCurrentTextFormat()}
        options={textFormatOptions}
        onChange={setTextFormat}
      />
      
      <ToolbarDivider />
      
      {/* Font Size */}
      <ToolbarDropdown
        value={getCurrentFontSize()}
        options={fontSizeOptions}
        onChange={setFontSize}
      />
      
      <ToolbarDivider />

      {/* Text Formatting */}
      <ToolbarButton
        format="bold"
        title="Bold"
        icon={<Bold size={16} />}
        active={isMarkActive(editor, "bold")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "bold");
        }}
      />
      <ToolbarButton
        format="italic"
        title="Italic"
        icon={<Italic size={16} />}
        active={isMarkActive(editor, "italic")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "italic");
        }}
      />
      <ToolbarButton
        format="underline"
        title="Underline"
        icon={<Underline size={16} />}
        active={isMarkActive(editor, "underline")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "underline");
        }}
      />
      <ToolbarButton
        format="strikethrough"
        title="Strikethrough"
        icon={<Strikethrough size={16} />}
        active={isMarkActive(editor, "strikethrough")}
        onClick={(e) => {
          e.preventDefault();
          toggleMark(editor, "strikethrough");
        }}
      />

      <ToolbarDivider />

      {/* Colors */}
      <ColorButton
        value={getCurrentTextColor()}
        onChange={setTextColor}
        label="Text Color"
        icon={<Type size={16} />}
      />
      <ColorButton
        value={getCurrentBackgroundColor()}
        onChange={setBackgroundColor}
        label="Highlight Color"
        icon={<Palette size={16} />}
      />

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        format="align-left"
        title="Align Left"
        icon={<AlignLeft size={16} />}
        active={isBlockActive("align-left")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-left");
        }}
      />
      <ToolbarButton
        format="align-center"
        title="Align Center"
        icon={<AlignCenter size={16} />}
        active={isBlockActive("align-center")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-center");
        }}
      />
      <ToolbarButton
        format="align-right"
        title="Align Right"
        icon={<AlignRight size={16} />}
        active={isBlockActive("align-right")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("align-right");
        }}
      />

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        format="bulleted-list"
        title="Bulleted List"
        icon={<List size={16} />}
        active={isBlockActive("bulleted-list")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("bulleted-list");
        }}
      />
      <ToolbarButton
        format="numbered-list"
        title="Numbered List"
        icon={<ListOrdered size={16} />}
        active={isBlockActive("numbered-list")}
        onClick={(e) => {
          e.preventDefault();
          toggleBlock("numbered-list");
        }}
      />

      <ToolbarDivider />

      {/* Insert Elements */}
      <ToolbarButton
        format="link"
        title="Insert Link"
        icon={<Link2 size={16} />}
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
        title="Insert Image"
        icon={<LucideImage size={16} />}
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

  // Get initial font size/color from marks
  const marks = Editor.marks(editor) as Record<string, unknown> | null;
  const fontSize = (marks?.fontSize as string) || "14px";
  const color = (marks?.color as string) || "#1f2937";

  return (
    <div>
      <h2 className="text-[#000000] text-[15px] font-normal mb-3">{title}</h2>
      <div
        className={css`
          direction: rtl;
          font-family: var(--font-primary);
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          width: 100%;
        `}
      >
        <Toolbar editor={editor} />
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(value) => {
            setBody(JSON.stringify(value));
          }}

        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="اكتب هنا..."
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

// Custom element renderers
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
    case "heading":
      const Tag = `h${el.level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag
          {...attributes}
          style={style}
          className={css`
            margin: 16px 0 8px 0;
            font-weight: 600;
            color: #1f2937;
            line-height: 1.3;
          `}
        >
          {children}
        </Tag>
      );
    case "code":
      return (
        <pre
          {...attributes}
          className={css`
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
            font-size: 14px;
            overflow-x: auto;
            direction: ltr;
            text-align: left;
            margin: 8px 0;
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
            margin: 12px 0;
            padding: 12px 20px;
            background: #f8fafc;
            font-style: italic;
            color: #64748b;
            border-radius: 0 6px 6px 0;
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
            padding-right: 24px;
            margin: 8px 0;
            list-style-type: disc;
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
            padding-right: 24px;
            margin: 8px 0;
            list-style-type: decimal;
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
            line-height: 1.6;
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
            display: block;
            margin: 12px 0;
          `}
        >
          <div contentEditable={false} style={{ position: "relative" }}>
            <img
              src={el.url || ""}
              alt="Inserted image"
              className={css`
                max-width: 100%;
                height: auto;
                border-radius: 6px;
                display: block;
                margin: 0 auto;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
                top: 8px;
                left: 8px;
                background: rgba(239, 68, 68, 0.9);
                border: none;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                z-index: 2;
                font-size: 16px;
                color: white;
                font-weight: 600;
                transition: all 0.15s;
                &:hover {
                  background: #ef4444;
                  transform: scale(1.05);
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
    style.padding = "2px 4px";
    style.borderRadius = "3px";
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

  if (l.code) {
    el = (
      <code
        className={css`
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 0.9em;
          color: #e11d48;
        `}
      >
        {el}
      </code>
    );
  }

  return <span {...attributes} style={style}>{el}</span>;
};

export default DashboardTextEditor;