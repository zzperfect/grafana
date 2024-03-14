/**
 * @desc: Main
 * @author zhaozhou
 * @date 2022/7/7
 */
import React from "react";
import { SimpleOptions, UdpDataStruct } from "../types";
import { GrafanaTheme, PanelData } from "@grafana/data";
import Echarts from "./Echarts";

export type MainProps = {
  options: SimpleOptions;
  useData: UdpDataStruct[];
  originData: PanelData;
  theme: GrafanaTheme;
  width?: number;
  height?: number;
};

const Main: React.FC<MainProps> = ({ options, useData, originData, theme, width, height }) => {
  return <Echarts
    type={options.echarts?.useGrafanaTheme ? theme.type : undefined}
    useData={useData}
    originData={originData}
    height={height}
    width={width}
    Function={options.echarts?.Function}/>;
};

export default Main;
