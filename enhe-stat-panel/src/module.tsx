import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { baseOptions } from "./moudule/base";
import { cardOptions } from "./moudule/card";
import { staticCardOptions } from "./moudule/staticCard";

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  // 基础属性
  baseOptions(builder);
  // 卡片属性
  cardOptions(builder);
  // 数值属性
  staticCardOptions(builder);
  return builder;
});
