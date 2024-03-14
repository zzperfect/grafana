/**
 * @desc: Main
 * @author zhaozhou
 * @date 2022/7/7
 */
import React from "react";
import { SimpleOptions, UdpDataStruct } from "../types";
import { GrafanaTheme, PanelData } from "@grafana/data";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider, Table, Tabs, Typography } from "antd";

export type MainProps = {
  options: SimpleOptions;
  useData: UdpDataStruct[];
  originData: PanelData;
  theme: GrafanaTheme;
  width?: number;
  height?: number;
};

const Main: React.FC<MainProps> = ({ options, useData, originData, theme, width, height }) => {

  return <ConfigProvider
    locale={zhCN}
    componentSize={"small"}
  >
    {
      useData.map(item => item.tabKey).length > 1 ? <Tabs>
        {
          useData.map(item => item.tabKey).map((tabKey, index) => {
            return <Tabs.TabPane destroyInactiveTabPane key={tabKey} tab={tabKey}>
              <Table
                style={{
                  height: (height || 0) - 60,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                sticky
                bordered={options.table?.isBorder}
                pagination={false}
                showHeader={options.table?.hasHeader}
                rowKey={'rowKey'}
                key={`${tabKey}-table`}
                columns={useData[index]?.columns}
                dataSource={useData[index]?.data}
              />
            </Tabs.TabPane>;
          })
        }
      </Tabs> : <Table
        style={{
          height: height,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        sticky
        bordered={options.table?.isBorder}
        showHeader={options.table?.hasHeader}
        rowKey={'rowKey'}
        pagination={false}
        title={options.table?.title ? () => <Typography.Title
          level={5}>{options.table?.title}</Typography.Title> : undefined}
        columns={useData[0]?.columns}
        dataSource={useData[0]?.data}
      />
    }
  </ConfigProvider>;
};

export default Main;
