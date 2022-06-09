import { useActions } from "../hooks/use-actions";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCallback, useContext } from "react";
import {
  CurrentCellContext,
  CurrentCellContextType,
} from "../contexts/currentCellContext";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  const { order: cellsOrder, data: cellsData } = useTypedSelector(
    ({ cells: { order, data } }) => ({ order, data })
  );
  const { updateCurrentCell } = useContext(
    CurrentCellContext
  ) as CurrentCellContextType;

  const removeCell = useCallback(
    (id: string) => {
      const deleledCellIdx = cellsOrder.findIndex((cellId) => cellId === id);
      const newCurrentCell =
        cellsData[cellsOrder[deleledCellIdx + 1]] ||
        cellsData[cellsOrder[deleledCellIdx - 1]];

      deleteCell(id);

      updateCurrentCell(newCurrentCell);
    },
    [cellsData, cellsOrder]
  );

  return (
    <ActionBarWrapper>
      <ActionButton action={() => moveCell(id, "up")} icon="arrow up" />
      <ActionButton action={() => moveCell(id, "down")} icon="arrow down" />
      <ActionButton action={() => removeCell(id)} icon="trash" />
    </ActionBarWrapper>
  );
};

interface ActionButtonProps {
  action: () => void;
  icon: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, icon }) => {
  return (
    <StyledButton onClick={action} active={false} compact>
      <StyledIcon name={icon} size="small" />
    </StyledButton>
  );
};

const ActionBarWrapper = styled.div`
  display: flex;
  flex: row;
  position: absolute;
  top: -10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.background.primary};
  box-shadow: 0px 3px 10px -5px black !important;
  border-radius: 5px;
  z-index: 1;
`;

const StyledButton = styled(Button)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin: 0 !important;
  background: ${({ theme }) => theme.colors.background.primary} !important;
  color: ${({ theme }) => theme.colors.text.primary} !important;

  padding: 0 !important;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.border.active} !important;
  }

  :focus {
    border: none !important;
    box-shadow: none !important;
  }

  :active {
    border: 1px solid ${({ theme }) => theme.colors.border.primary} !important;
  }
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.icon.primary};
  margin: 0 !important;
`;

export default ActionBar;
