import styled, { ThemeProvider } from "styled-components";
import CellList from "./components/cell-list";
import MenuBar from "./components/menu-bar";
import CurrentCellProvider from "./contexts/currentCellContext";
import { GlobalStyle } from "./global";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CurrentCellProvider>
        <MenuBar />
        <AppContainer>
          <CellList />
        </AppContainer>
      </CurrentCellProvider>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
`;

export default App;
