type SeriesSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  Title?: string;
  Tooltip?: string;
  SubTitle?: string;
  ClassName?: string;
  BodyStyle?: string;
  isBorder?: boolean;
  hoverable?: boolean;
  height?: number;
}

export interface StaticProps {
  ValueStyle?: string;
  PrefixImg?: {
    prefixUrl?: {
      url: string
    }[];
  }
  TitleClassName?: string;
  Map?: {
    MapField?: string;
  }
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
  // 数值属性
  static?: StaticProps;
}

export interface UdpDataStruct {
  nameData: string[];
  data?: any[];
  dataIndex?: string;
  [key: string]: any;
}
