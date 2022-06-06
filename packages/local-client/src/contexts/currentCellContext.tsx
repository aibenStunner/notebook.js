import React, { createContext, useState } from "react";
import { Cell } from "../state";

export type CurrentCellContextType = {
  currentCell: Cell | null;
  updateCurrentCell: (cell: Cell) => void;
};

interface ICurrentCellContextProvider {
  children: React.ReactNode;
}

export const CurrentCellContext = createContext<CurrentCellContextType | null>(
  null
);

const CurrentCellProvider: React.FC<ICurrentCellContextProvider> = ({
  children,
}) => {
  const [currentCell, setCurrentCell] = useState<Cell | null>(null);

  const updateCurrentCell = (cell: Cell) => setCurrentCell(cell);

  return (
    <CurrentCellContext.Provider
      value={{
        currentCell,
        updateCurrentCell,
      }}
    >
      {children}
    </CurrentCellContext.Provider>
  );
};

export default CurrentCellProvider;
