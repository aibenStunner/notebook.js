import { Cell } from "../state";
import ActionBar from "./action-bar";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import { useContext } from "react";
import {
  CurrentCellContext,
  CurrentCellContextType,
} from "../contexts/currentCellContext";
import styled from "styled-components";

interface CellListItemProps {
  cell: Cell;
  focused: boolean;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell, focused }) => {
  const { updateCurrentCell } = useContext(
    CurrentCellContext
  ) as CurrentCellContextType;

  return (
    <CellListItemWrapper>
      {cell.type === "code" ? (
        <>
          {focused && <ActionBar id={cell.id} />}
          <div onClick={() => updateCurrentCell(cell)}>
            <CodeCell cell={cell} />
          </div>
        </>
      ) : (
        <>
          <div onClick={() => updateCurrentCell(cell)}>
            <TextEditor cell={cell} focused={focused} />
          </div>
          {focused && <ActionBar id={cell.id} />}
        </>
      )}
    </CellListItemWrapper>
  );
};

const CellListItemWrapper = styled.div`
  position: relative;
`;

export default CellListItem;
