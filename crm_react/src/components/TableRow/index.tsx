import React, { Ref } from "react";
import * as Styles from "./styles";

type TableRowProps<H> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  boldText: boolean;
  description: string | number;
  onClick?: () => void;
  index: number;
};

const TableRow = React.forwardRef(
  <H,>(
    { header, boldText, description, onClick, index }: TableRowProps<H>,
    ref: Ref<HTMLDivElement>
  ) => {
    return ref ? (
      <Styles.CellWrapper
        team={header === "Team"}
        boldText={boldText}
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
        boldText={boldText}
        onClick={onClick}
        index={index}
        data-testid="cell"
      >
        {description}
      </Styles.CellWrapper>
    );
  }
);

export default TableRow as <H>(
  props: TableRowProps<H> & {
    ref?: Ref<HTMLDivElement>;
  }
) => JSX.Element;
