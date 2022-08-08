import { Route } from "../route";

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
  routes: Route[];
};
