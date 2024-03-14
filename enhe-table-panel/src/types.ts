import { ColumnsType } from "antd/lib/table/interface";

type SeriesSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  Title?: string;
  SubTitle?: string;
  ClassName?: string;
  BodyStyle?: string;
  isBorder?: boolean;
  hoverable?: boolean;
}

export interface TableProps {
  title?: string;
  isBorder?: boolean;
  hasHeader?: boolean;
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
  // 表格属性
  table?: TableProps;
}

export interface UdpDataStruct {
  columns?: ColumnsType<any>;
  data?: any[];

  [key: string]: any;
}
