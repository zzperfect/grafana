import React from 'react';
import { GrafanaTheme, PanelProps } from '@grafana/data';
import { SimpleOptions, UdpDataStruct } from 'types';
import { Card, Space, Tooltip } from "antd";
import { css, cx } from "emotion";
import { useStyles, withTheme } from "@grafana/ui";
import Main from "./component/Main";
import { toStyle } from "./utils";

interface SimpleProps extends PanelProps<SimpleOptions> {
  theme: GrafanaTheme;
}

const PartialSimplePanel: React.FC<SimpleProps> = ({ options, data, width, height, theme }) => {
  const [useMyData, setUseMyData] = React.useState <UdpDataStruct[]>([]);
  React.useEffect(() => {
    const useData: UdpDataStruct[] = [];
    // 多个sql执行结果
    try {
      data.series.forEach(sqlRes => {
        // 每个sql执行出的字段
        let nameArr: string[] = [];
        let dataArr: any[] = [];

        sqlRes.fields.forEach(field => {
          // 每个字段值综合成一个数组
          if ( !Array.isArray(nameArr)) {
            nameArr = [field.name];
          } else {
            nameArr.push(field.name);
          }

          if (field.values.toArray().length > 1) {
            if ( !Array.isArray(dataArr)) {
              dataArr = [field.values.toArray()];
            } else {
              dataArr.push(field.values.toArray());
            }
          } else {
            if ( !Array.isArray(dataArr)) {
              dataArr = [field.values.toArray()[0]];
            } else {
              dataArr.push(field.values.toArray()[0]);
            }
          }
        });

        useData.push({
          dataIndex: sqlRes.refId,
          nameData: nameArr,
          data: dataArr,
        });

      });
      setUseMyData(useData);
    } catch (e) {
      console.log('error', e);
    }
  }, [data]);


  const styles = useStyles((theme) => {
    return {
      wrapper: css`
        position: relative;
        padding: 0;
      `,
      card: css`
        width: 100%;
        height: 100%;
        margin: 0;
      `
    };
  });
  return (
    <div
      className={`${cx(
        styles.wrapper,
      )}  ${options.componentClassName}`}
      style={{
        ...toStyle(options.componentStyle),
        width: width + 16,
        height: height + 16,
      }}
    >
      {
        options.isCard ?
          <Card
            style={{
              width: '100%',
              height: options.card?.height || '100%',
              ...toStyle(options.card?.BodyStyle)
            }}
            hoverable={options.card?.hoverable}
            className={`${options.card?.ClassName}`}
            bordered={options.card?.isBorder}

            title={options.card?.Title ?
              <Space direction={"horizontal"}>
                {options.card.Title}
                {options.card.Tooltip && <Tooltip title={options.card.Tooltip}>
                    <svg viewBox="64 64 896 896" color={'grey'} focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"/></svg>
                </Tooltip>}
              </Space>
              : false}
            extra={options.card?.SubTitle || false}
          >
            <Main
              options={options}
              useData={useMyData}
              originData={data}
              theme={theme}
              width={width - 48}
              height={height - ((options.card?.Title || options.card?.SubTitle) ? 58 : 0) - 48}
            />
          </Card>
          :
          <Main options={options}
                theme={theme}
                useData={useMyData}
                originData={data}
                width={width}
                height={height}/>
      }
    </div>
  );
};

export const SimplePanel = withTheme(PartialSimplePanel);
