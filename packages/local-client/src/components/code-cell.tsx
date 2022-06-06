import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import { Resizable } from "./resizable";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import styled from "styled-components";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <PreviewWrapper>
          {!bundle || bundle.loading ? (
            <ProgressWrapper>
              <progress max="100">Loading</progress>
            </ProgressWrapper>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </PreviewWrapper>
      </div>
    </Resizable>
  );
};

const PreviewWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  background-color: white;
`;

const ProgressWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background-color: white;
  display: flex;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default CodeCell;
