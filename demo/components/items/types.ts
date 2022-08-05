export enum ItemName {
  Circle = "Circle",
  Path = "Path",
}

export type Item = {
  id: string;
  type: string;
  pathData?: string;
};

export type ItemData = {
  id?: string;
  type?: string;
  pathData?: string;
};
