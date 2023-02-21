export type TableRowProps<H> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  boldText: boolean;
  description: string | number;
  onClick?: () => void;
  index: number;
};
