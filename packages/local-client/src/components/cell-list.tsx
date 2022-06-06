import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { useActions } from "../hooks/use-actions";
import styled from "styled-components";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <CellListWrapper>
      <AddCell previousCellId={null} />
      {renderedCells}
    </CellListWrapper>
  );
};

const CellListWrapper = styled.div`
  margin: 0 25px;
`;

export default CellList;
