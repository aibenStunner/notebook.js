import { useActions } from "../hooks/use-actions";
import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useContext, useEffect } from "react";
import {
  CurrentCellContext,
  CurrentCellContextType,
} from "../contexts/currentCellContext";

interface AddCellProps {
  previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
  const { insertCellAfter } = useActions();
  const { order: cellsOrder, data: cellsData } = useTypedSelector(
    ({ cells: { order, data } }) => ({ order, data })
  );
  const { updateCurrentCell } = useContext(
    CurrentCellContext
  ) as CurrentCellContextType;

  useEffect(() => {
    const currentCellIdx = cellsOrder.findIndex(
      (cellId) => cellId === previousCellId
    );

    updateCurrentCell(cellsData[cellsOrder[currentCellIdx]]);
  }, []);

  return (
    <AddCellWrapper>
      <StyledAddButtonsContainer>
        <StyledButton
          onClick={() => insertCellAfter(previousCellId, "code")}
          compact
        >
          <StyledIcon name="add" size="small" /> Code
        </StyledButton>
        <StyledButton
          onClick={() => insertCellAfter(previousCellId, "text")}
          compact
        >
          <StyledIcon name="add" size="small" /> Text
        </StyledButton>
      </StyledAddButtonsContainer>

      <Divider />
    </AddCellWrapper>
  );
};

const AddCellWrapper = styled.div`
  position: relative;
  opacity: 0;
  transition: opacity 0.3s ease-in 0.1s;
  margin: 0;

  :hover {
    opacity: 1;
  }

  :active {
    opacity: 1 !important;
    transition: opacity 0s;
  }
`;

const StyledAddButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.icon.primary};
`;

const StyledButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  justify-content: center;
  width: 85px;
  height: 26px;
  background: ${({ theme }) => theme.colors.background.primary} !important;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  border: 1px solid ${({ theme }) => theme.colors.border.primary} !important;
  margin: 0 20px !important;
  padding: 0 !important;
  box-shadow: 0px 3px 10px -5px black !important;
  z-index: 1;

  :hover {
    background-color: ${({ theme }) =>
      theme.colors.background.secondary} !important;
  }
`;

const Divider = styled.div`
  position: absolute;
  background: red;
  top: 50%;
  bottom: 50%;
  right: 2.5%;
  left: 2.5%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary};
  width: 95%;
  z-index: 0;
`;

export default AddCell;
