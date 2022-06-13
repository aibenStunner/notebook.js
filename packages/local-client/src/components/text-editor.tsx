import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import styled from "styled-components";

interface TextEditorProps {
  cell: Cell;
  focused: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell, focused }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // prevent click in editor
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  if (editing) {
    return (
      <StyledTextEditor ref={ref} onDoubleClick={() => setEditing(false)}>
        <MDEditor
          height="inherit"
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </StyledTextEditor>
    );
  }

  return (
    <MarkdownWrapper
      className={focused ? "focused" : ""}
      onDoubleClick={() => setEditing(true)}
    >
      <div>
        <MDEditor.Markdown source={cell.content || "Double-click to edit."} />
      </div>
    </MarkdownWrapper>
  );
};

const MarkdownWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: 10px 5px 10px 10px;

  &.focused {
    -webkit-box-shadow: 0 2px 7px -2px #000000;
    -moz-box-shadow: 0 2px 7px -2px #000000;
    box-shadow: 0 2px 7px -2px #000000;
  }
`;

const StyledTextEditor = styled.div`
  -webkit-box-shadow: 0 2px 7px -2px #000000;
  -moz-box-shadow: 0 2px 7px -2px #000000;
  box-shadow: 0 2px 7px -2px #000000;

  .w-md-editor-bar svg {
    display: none;
  }

  .w-md-editor-bar {
    display: none;
  }

  em {
    font-style: italic;
  }

  .wmde-markdown hr {
    border-top: 100 rpx solid red;
  }

  .wmde-markdown ol {
    list-style: decimal;
  }

  .w-md-editor-toolbar {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
    height: 40px;
  }

  .w-md-editor-toolbar li button {
    color: ${({ theme }) => theme.colors.icon.primary};

    :hover {
      color: ${({ theme }) => theme.colors.text.secondary};
      background-color: transparent;
    }
  }

  [data-name="edit"] {
    display: none;
  }

  [data-name="live"] {
    display: none;
  }

  [data-name="preview"] {
    display: none;
  }

  .w-md-editor-toolbar-divider {
    display: none;
  }

  .w-md-editor-toolbar li.active button {
    background-color: ${({ theme }) => theme.colors.text.secondary};
  }

  .w-md-editor-content {
    background-color: ${({ theme }) => theme.colors.background.primary};
  }

  .w-md-editor .w-md-editor-text-pre {
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    font-weight: normal;
    line-height: 19px;
    letter-spacing: 0px;
  }

  .w-md-editor .w-md-editor-text-input {
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    font-weight: normal;
    line-height: 19px;
    letter-spacing: 0px;
    caret-color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor-text-pre .bold {
    color: unset;
  }

  .token.list.punctuation {
    background-color: unset;
  }
`;

export default TextEditor;
