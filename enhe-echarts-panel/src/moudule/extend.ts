import { PanelOptionsEditorBuilder } from "@grafana/data";
import { SimpleOptions } from "../types";
import EchartsCode from "../optionComponent/EchartsCode";

export function extendOptions<T extends SimpleOptions>(build: PanelOptionsEditorBuilder<T>) {
  const category = ['echart配置项'];
  return build
    .addBooleanSwitch({
      category,
      path: 'echarts.useGrafanaTheme',
      name: '是否使用Grafana主题',
      defaultValue: false
    })
    .addCustomEditor({
      id: 'dataFormatFunc',
      category,
      path: 'echarts.Function',
      name: '数据处理函数',
      description: '数据处理函数,参照echarts官网，复制代码粘贴到此处 option = {...}',
      defaultValue: '// originData: 原始数据，dealData: 处理后的数据，echartsInstance: echarts实例，echarts: echarts库',
      editor: EchartsCode
    })
    ;
}
