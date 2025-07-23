export interface RouteTypes {
  path: string;
  element: React.ReactNode;
  children?: RouteTypes[];
}
