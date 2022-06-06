import { Dropdown, Icon, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import SubMenuBar from "./submenu-bar";

const MenuBar: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  return (
    <MenuBarContainer>
      <MenuWrapper attached="top">
        <StyledDropdown item icon="wrench" simple>
          <StyledDropdownMenu id="styled-dropdown">
            <Dropdown.Item>New notebook</Dropdown.Item>
            <Dropdown.Item>Open notebook</Dropdown.Item>
            <Dropdown.Item>Save</Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item>Export</Dropdown.Item>
            <Dropdown.Item>Share</Dropdown.Item>
          </StyledDropdownMenu>
        </StyledDropdown>

        <StyledMenuItem name="theme" position="right" onClick={toggleTheme}>
          <StyledIcon name={isDark ? "moon" : "sun"} />
        </StyledMenuItem>
      </MenuWrapper>

      <SubMenuBar />
    </MenuBarContainer>
  );
};

const MenuBarContainer = styled.div`
  margin: 0 0 5px 0 !important;
`;

const MenuWrapper = styled(Menu)`
  background: ${({ theme }) => theme.colors.background.primary} !important;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  margin: 0 !important;
  border-width: 0 0 1px 0 !important;
  border-color: ${({ theme }) => theme.colors.border.primary} !important;

  & :hover {
    background-color: ${({ theme }) =>
      theme.colors.background.secondary} !important;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  ::before {
    background-color: ${({ theme }) => theme.colors.border.primary} !important;
  }
`;

const StyledDropdown = styled(Dropdown)`
  color: ${({ theme }) => theme.colors.icon.primary} !important;
  cursor: pointer;

  ::before {
    background-color: ${({ theme }) => theme.colors.border.primary} !important;
  }

  & :hover {
    background-color: ${({ theme }) =>
      theme.colors.background.primary} !important;
  }

  #styled-dropdown .item {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  background: ${({ theme }) => theme.colors.background.primary} !important;

  .divider {
    background-color: ${({ theme }) => theme.colors.border.primary} !important;
  }
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.icon.primary};
  cursor: pointer;
`;

export default MenuBar;
