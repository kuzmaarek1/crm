import React from "react";
import * as Styles from "./styles";

const TableRow = React.forwardRef(
  ({ header, title, description, onClick, index }, ref) => {
    return ref ? (
      <Styles.CellWrapper
        team={header === "Team"}
        title={title}
        onClick={onClick}
        index={index}
        data-testid="cell"
        ref={ref}
      >
        {description}
      </Styles.CellWrapper>
    ) : (
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
  }
);

export default TableRow;
