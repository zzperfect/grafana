/**
 * @desc: Echarts
 * @author zhaozhou
 * @date 2022/7/8
 */
import React from "react";
import { PanelData } from "@grafana/data";
import { echartFunctionParams, UdpDataStruct } from "../types";
import { GrafanaThemeType } from "@grafana/data/types/theme";
import { css } from "emotion";
import { debounce } from "lodash";
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PieSeriesOption
  | LegendComponentOption
  >;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
]);



export type EchartsProps = {
  Function?: string;
  originData: PanelData;
  useData: UdpDataStruct[];
  type?: GrafanaThemeType;
  width?: number;
  height?: number;
};

const getStyles = () => ({
  tips: css`
    padding: 0 10%;
    height: 100%;
    background: rgba(128, 128, 128, 0.1);
    overflow: auto;
  `,
  tipsTitle: css`
    margin: 48px 0 32px;
    text-align: center;
  `,
  wrapper: css`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    margin-bottom: 8px;
  `,
});

const Echarts: React.FC<EchartsProps> = (props) => {
  const echartRef = React.useRef<HTMLDivElement>(null);
  const [tips, setTips] = React.useState<Error | undefined>();
  const [chart, setChart] = React.useState<echarts.ECharts>();
  const styles = getStyles();

  React.useEffect(() => {
    if (chart) {
      chart.clear();
      chart.dispose();
    }
    if (echartRef.current) {
      const newChart = echarts.init(echartRef.current, props.type);
      setChart(newChart);
    }
  }, [props.type]);

  React.useEffect(() => {
    chart?.resize();
  }, [props.width, props.height]);

  React.useEffect(() => {
    const resetOption = debounce(
      () => {
        if ( !chart) {
          return;
        }
        if (props.originData.state && props.originData.state !== 'Done') {
          return;
        }
        try {
          setTips(undefined);
          chart.clear();
          let getOption = new Function(echartFunctionParams, `var option; ${props.Function || ''} return option;` || '');
          const o: ECOption = getOption(props.originData, props.useData, chart, echarts);
          o && chart.setOption(o);
        } catch (err) {
          console.error('Editor content error!', err);
          // @ts-ignore
          setTips(err);
        }
      },
      150,
      { leading: true }
    );
    chart && resetOption();
  }, [chart, props.Function, props.originData, props.useData]);

  return (<>
    {tips && (
      <div className={styles.tips}>
        <h5 className={styles.tipsTitle}>Editor content error!</h5>
        {(tips.stack || tips.message).split('\n').map((s, index) => (
          <p key={index}>{s}</p>
        ))}
      </div>
    )}
    <div
      style={{
        width: props.width,
        height: props.height
      }}
      ref={echartRef}/>
  </>);
}

export default Echarts;
