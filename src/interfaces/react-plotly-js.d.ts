/*declare module "react-plotly.js" {
  import Plotly from "plotly.js";
  import { Component } from "react";

  export interface PlotParams {
    data: Plotly.Data[];
    layout?: Partial<Plotly.Layout>;
    config?: Partial<Plotly.Config>;
    frames?: Plotly.Frame[];
    onInitialized?: (figure: Plotly.Figure) => void;
    onUpdate?: (figure: Plotly.Figure) => void;
    useResizeHandler?: boolean;
    style?: React.CSSProperties;
    className?: string;
    divId?: string;
  }

  export default class Plot extends Component<PlotParams> {}
}
r
npm i @types/react-plotly.js
*/