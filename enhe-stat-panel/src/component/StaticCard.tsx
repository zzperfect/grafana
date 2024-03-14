/**
 * @desc: StaticCard
 * @author zhaozhou
 * @date 2022/7/7
 */

import React from "react";
import { StaticProps, UdpDataStruct } from "../types";
import { Avatar, Spin } from "antd";
import { toStyle } from "../utils";

export type StaticCardProps = {
  static?: StaticProps;
  useData: UdpDataStruct[];
  width?: number;
  height?: number;
};

const StaticCard: React.FC<StaticCardProps> = (props) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [props.useData]);


  const hasImage = props.static?.PrefixImg?.prefixUrl?.length || 0 > 0;

  return <Spin spinning={loading}>
    {
      !loading && <div style={{
        height: (props.height || 0) + 16,
        fontSize: (props.height || 0) / 5,
      }}>
            <div
                className={`grid grid-flow-col auto-cols-fr h-full break-normal truncate divide-x divide-grey-500 tracking-wide subpixel-antialiased`}>
              {
                props.useData.map((item, index) => {
                  return <div className="flex flex-col text-center align-middle">
                    {hasImage && <div style={{ height: '30%' }}>
                        <Avatar
                            size={(props.height || 0) / 3}
                            src={props.static?.PrefixImg?.prefixUrl?.[index]?.url || ''}
                        />
                    </div>}
                    <div style={{ height: hasImage ? '30%' : '50%' }}>
                      <span
                        className={`${props.static?.TitleClassName}`}
                        style={{
                          color: '#707070',
                          fontSize: (props.height || 0) / 15,
                        }}
                      >{item.dataIndex}</span>
                    </div>
                    <div style={{ height: hasImage ? '40%' : '50%' }}>
                        <span
                          style={{
                            color: '#4d4d4d',
                            fontSize: (props.height || 0) / 5,
                            ...toStyle(props.static?.ValueStyle),
                          }}
                        >
                          {
                            item.data?.[props.static?.Map?.MapField ? item.nameData?.indexOf(props.static?.Map?.MapField) : 0] || '0'
                          }
                        </span>
                    </div>
                  </div>;
                })
              }
            </div>
        </div>
    }
  </Spin>;
}

export default StaticCard;
