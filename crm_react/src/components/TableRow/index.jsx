import React from "react";
import * as Styles from "./styles";

const TableRow = ({ header, title, description, onClick, index }) => {
  return (
    <Styles.CellWrapper
      team={header === "Team"}
      title={title}
      onClick={onClick}
      index={index}
      data-testid="cell"
    >
      {description}
    </Styles.CellWrapper>
  );
};

export default TableRow;
