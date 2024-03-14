import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { baseOptions } from "./moudule/base";
import { cardOptions } from "./moudule/card";
import { extendOptions } from "./moudule/extend";
// import OptionCode from "./optionComponent/OptionCode";

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  // 基础属性
  baseOptions(builder);
  // 卡片属性
  cardOptions(builder);
  // 扩展属性
  extendOptions(builder);
  return builder;
});
