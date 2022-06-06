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
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const { updateCurrentCell } = useContext(
    CurrentCellContext
  ) as CurrentCellContextType;

  return (
    <CellListItemWrapper onClick={() => updateCurrentCell(cell)}>
      {cell.type === "code" ? (
        <>
          <ActionBar id={cell.id} />
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </CellListItemWrapper>
  );
};

const CellListItemWrapper = styled.div`
  position: relative;
`;

export default CellListItem;
