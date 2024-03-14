/**
 * @desc: Main
 * @author zhaozhou
 * @date 2022/7/7
 */
import React from "react";
import { SimpleOptions, UdpDataStruct } from "../types";
import StaticCard from "./StaticCard";
import { GrafanaTheme, PanelData } from "@grafana/data";

export type MainProps = {
  options: SimpleOptions;
  useData: UdpDataStruct[];
  originData: PanelData;
  theme: GrafanaTheme;
  width?: number;
  height?: number;
};

const Main: React.FC<MainProps> = ({ options, useData, originData, theme, width, height }) => {
  return <StaticCard static={options.static} useData={useData} width={width} height={height}/>
};

export default Main;
