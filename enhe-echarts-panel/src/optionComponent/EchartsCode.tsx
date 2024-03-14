import { CodeEditor } from "@grafana/ui";
import React from "react";
import { StandardEditorProps } from "@grafana/data";
import { echartFunctionParams } from "../types";
import { css } from "emotion";

/**
 * @desc: EchartsCode
 * @author zhaozhou
 * @date 2022/7/8
 */

interface Props extends StandardEditorProps<string> {
}

const getStyles = () => ({
  span: css`
     display: block;
     padding: 2px;
     background-color: aliceblue;
     opacity: 0.7;
     font-size: 12px;
   `,
});

const EchartsCode: React.FC<Props> = (props) => {
  const styles = getStyles();
  return (<>
    <span className={styles.span}>{`function (${echartFunctionParams}) {`}</span>
    <span className={styles.span}>{`   var option;`}</span>
    <CodeEditor
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
      height={600}
      language={'javascript'}
      value={props.value}
      onBlur={props.onChange}
    />
    <span className={styles.span}>{`   return option;`}</span>
    <span className={styles.span}>{`}`}</span>
  </>);
}

export default EchartsCode;
