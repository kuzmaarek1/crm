import React from "react";
import * as Styles from "./styles";

const TableRow = ({ header, title, description, onClick }) => {
  return (
    <Styles.CellWrapper
      team={header === "Team"}
      title={title}
      onClick={onClick}
    >
      {description}
    </Styles.CellWrapper>
  );
};

export default TableRow;
