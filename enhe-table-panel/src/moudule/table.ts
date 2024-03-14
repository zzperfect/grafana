import { PanelOptionsEditorBuilder } from "@grafana/data";
import { SimpleOptions } from "../types";

export function tableOptions<T extends SimpleOptions> (build: PanelOptionsEditorBuilder<T>){
  const category = ['table选项'];
  return build
    .addTextInput({
      category,
      name: '表格标题',
      path: 'table.title',
    })
    .addBooleanSwitch({
      category,
      name: '是否有边框',
      path: 'table.isBorder',
      defaultValue: false,
    })
    .addBooleanSwitch({
      category,
      name: '是否显示表头',
      path: 'table.hasHeader',
      defaultValue: true,
    })
}
