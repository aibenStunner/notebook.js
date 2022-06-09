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
      <div
        className="text-editor"
        ref={ref}
        onDoubleClick={() => setEditing(false)}
      >
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
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
  padding: 10px 0 10px 5px;

  &.focused {
    background-color: red;
  }
`;

const StyledTextEditor = styled.div`
  // .w-md-editor-bar svg {
  //   display: none;
  // }

  .w-md-editor-bar {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
    height: 11px;
    cursor: row-resize;
    background-color: #37414b;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    position: relative;
  }

  em {
    font-style: italic;
  }

  .wmde-markdown hr {
    border-top: 1px solid #dee5ed;
  }

  .wmde-markdown ol {
    list-style: decimal;
  }

  .w-md-editor-toolbar {
    background-color: #37414b;
    border-bottom: 1px solid gray;
  }

  .w-md-editor-toolbar li button {
    color: #d4d4d4;
  }

  .w-md-editor-content {
    background-color: #202123;
  }

  .w-md-editor .w-md-editor-text-pre {
    color: #d4d4d4;
  }

  .w-md-editor-text-pre .bold {
    color: unset;
  }

  .token.list.punctuation {
    background-color: unset;
  }
`;

export default TextEditor;
