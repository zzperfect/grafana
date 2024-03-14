/**
 * @desc: CodeMirror
 * @author zhaozhou
 * @date 2022/7/7
 */
import React from "react";
import { CodeEditor } from "@grafana/ui";
import { StandardEditorProps } from "@grafana/data";

interface Props extends StandardEditorProps<string> {
}

const CssCode: React.FC<Props> = (props) => {
  return (<CodeEditor
    height={100}
    monacoOptions={{
      minimap: { enabled: false },
      wordWrap: 'on',
      autoIndent: 'full',
      wrappingIndent: 'deepIndent',
      smoothScrolling: true,
      // 不要滚动条的边框
      overviewRulerBorder: false,
      scrollBeyondLastLine: false,
      scrollBeyondLastColumn: 0,
      renderFinalNewline: false,
    }}
    language={'css'}
    value={props.value}
    onBlur={props.onChange}/>)
}

export default CssCode;
