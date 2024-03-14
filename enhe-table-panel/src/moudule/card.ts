import { PanelOptionsEditorBuilder } from "@grafana/data";
import { SimpleOptions } from "../types";
import CssCode from "../optionComponent/CssCode";

export function cardOptions<T extends SimpleOptions>(build: PanelOptionsEditorBuilder<T>) {
  const category = ['Card选项'];
  return build
    .addBooleanSwitch({
      category,
      name: '是否有边框',
      path: 'card.isBorder',
      defaultValue: true,
      showIf: (options) => {
        return options.isCard
      }
    })
    .addBooleanSwitch({
      category,
      name: 'hoverable',
      path: 'card.hoverable',
      defaultValue: true,
      showIf: (options) => {
        return options.isCard
      }
    })
    .addTextInput({
      category,
      name: '标题',
      description: '卡片标题',
      path: 'card.Title',
      showIf: (options) => {
        return options.isCard
      }
    })
    .addTextInput({
      category,
      name: '子标题',
      description: '卡片子标题',
      path: 'card.SubTitle',
      showIf: (options) => {
        return options.isCard
      }
    })
    .addCustomEditor({
      category,
      name: "卡片className",
      description: '卡片className,支持tailwindcss和antd',
      id: 'cardClassName',
      path: 'card.ClassName',
      defaultValue: 'rounded-lg',
      editor: CssCode,
      showIf: (options) => {
        return options.isCard
      }
    })
    .addCustomEditor({
      category,
      name: "卡片body样式",
      description: '样式(不推荐)',
      id: 'cardBodyStyle',
      path: 'card.BodyStyle',
      editor: CssCode,
      showIf: (options) => {
        return options.isCard
      }
    });
}
