import { PanelOptionsEditorBuilder } from "@grafana/data";
import { SimpleOptions } from "../types";
import CssCode from "../optionComponent/CssCode";

export function baseOptions<T extends SimpleOptions> (build: PanelOptionsEditorBuilder<T>){
  const category = ['基础选项'];
  return build
    .addCustomEditor({
      category,
      name: "className",
      description: '控件最外层className,支持tailwindcss和antd',
      id: 'componentClassName',
      path: 'componentClassName',
      editor: CssCode,
    })
    .addCustomEditor({
      category,
      name: "styles",
      description: '控件最外层styles(不推荐)',
      id: 'componentStyle',
      path: 'componentStyle',
      editor: CssCode,
    })
    .addBooleanSwitch({
      category,
      name: '是否包裹Card',
      path: 'isCard',
    });
}
