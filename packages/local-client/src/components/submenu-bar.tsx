import { useContext } from "react";
import { Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import {
  CurrentCellContext,
  CurrentCellContextType,
} from "../contexts/currentCellContext";
import { useActions } from "../hooks/use-actions";

const SubMenuBar: React.FC = () => {
  const { currentCell } = useContext(
    CurrentCellContext
  ) as CurrentCellContextType;

  const { insertCellAfter } = useActions();

  return (
    <MenuWrapper attached="top">
      <StyledMenuItem
        onClick={() => insertCellAfter(currentCell?.id || null, "code")}
      >
        <StyledIcon name="add" size="small" />
        <StyledMenuText>Code</StyledMenuText>
      </StyledMenuItem>

      <StyledMenuItem
        onClick={() => insertCellAfter(currentCell?.id || null, "text")}
      >
        <StyledIcon name="add" size="small" />
        <StyledMenuText> Text</StyledMenuText>
      </StyledMenuItem>

      <StyledDivider />
    </MenuWrapper>
  );
};

const MenuWrapper = styled(Menu)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary} !important;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  height: 10px !important;
  margin: 0 !important;
  border-width: 0 0 1px 0 !important;
  border-color: ${({ theme }) => theme.colors.border.primary} !important;

  & :hover {
    background-color: ${({ theme }) =>
      theme.colors.background.secondary} !important;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  cursor: pointer;
  padding: 5px !important;
  margin: 0 10px 0 5px;
  border-radius: 5px;

  ::before {
    display: none !important;
  }
`;

const StyledMenuText = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.icon.primary};
`;

const StyledDivider = styled.div`
  background-color: ${({ theme }) => theme.colors.border.primary};
  height: 25px;
  width: 1px;
`;

export default SubMenuBar;
