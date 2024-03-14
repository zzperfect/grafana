import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { baseOptions } from "./moudule/base";
import { cardOptions } from "./moudule/card";
import { tableOptions } from "./moudule/table";

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  // 基础属性
  baseOptions(builder);
  // 卡片属性
  cardOptions(builder);
  // table属性
  tableOptions(builder);
  return builder;
});
