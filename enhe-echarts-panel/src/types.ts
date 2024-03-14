type SeriesSize = 'sm' | 'md' | 'lg';

export const echartFunctionParams = 'originData,dealData,echartsInstance,echarts';

export interface CardProps {
  Title?: string;
  SubTitle?: string;
  ClassName?: string;
  BodyStyle?: string;
  isBorder?: boolean;
  hoverable?: boolean;
}

export interface EchartsProps {
  Function?: string;
  useGrafanaTheme: boolean;
}

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  // 是否包裹card
  isCard?: boolean;
  componentClassName?: string;
  componentStyle?: string;

  // 卡片属性
  card?: CardProps;
  echarts?: EchartsProps;
}

export interface UdpDataStruct {
  nameData: string[] | string | number;
  data?: any[];
  [key: string]: any;
}
