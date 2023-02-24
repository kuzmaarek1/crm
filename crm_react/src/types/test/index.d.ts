export type TForm = (
  | {
      name: RegExp;
      value: string;
    }
  | {
      name: string;
      value: string;
    }
)[];
