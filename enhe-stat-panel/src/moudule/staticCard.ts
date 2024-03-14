import { SimpleOptions } from "../types";
import { PanelOptionsEditorBuilder } from "@grafana/data";
import CssCode from "../optionComponent/CssCode";
import MyFieldArray from "../optionComponent/MyFieldArray";

/**
 * @desc: staticCard
 * @author zhaozhou
 * @date 2022/7/7
 */

export function staticCardOptions<T extends SimpleOptions> (build: PanelOptionsEditorBuilder<T>){
  return build
    .addFieldNamePicker({
      category: ['显示属性'],
      name: '映射字段',
      path: 'static.Map.MapField',
    })
    .addCustomEditor({
      category: ['样式属性'],
      name: "titleClassName",
      description: '标题样式,支持tailwindcss和antd',
      id: 'TitleClassName',
      path: 'static.TitleClassName',
      defaultValue: 'text-lg text-gray-400',
      editor: CssCode,
    })
    .addCustomEditor({
      category: ['样式属性'],
      name: "valueStyle",
      description: '数值样式',
      id: 'ValueStyle',
      path: 'static.ValueStyle',
      defaultValue: 'font-size:60px',
      editor: CssCode,
    })
    .addCustomEditor({
      category: ['图片属性'],
      name: "图片",
      description: '图片地址',
      id: 'PrefixImg',
      path: 'static.PrefixImg',
      editor: MyFieldArray,
    });
}
