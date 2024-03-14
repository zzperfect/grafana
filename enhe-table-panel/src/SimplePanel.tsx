import React from 'react';
import { GrafanaTheme, PanelProps } from '@grafana/data';
import { SimpleOptions, UdpDataStruct } from 'types';
import { css, cx } from "emotion";
import { useStyles, withTheme } from "@grafana/ui";
import Main from "./component/Main";
import { toStyle } from "./utils";
import { ColumnsType } from "antd/lib/table";
import { Card } from "antd";

const { default: firstImg } = require('img/1@2x.png');
const { default: secondImg } = require('img/2@2x.png');
const { default: thirdImg } = require('img/3@2x.png');

interface SimpleProps extends PanelProps<SimpleOptions> {
  theme: GrafanaTheme;
}

const PartialSimplePanel: React.FC<SimpleProps> = ({ options, data, width, height, theme }) => {
  const [useMyData, setUseMyData] = React.useState<UdpDataStruct[]>([]);
  React.useEffect(() => {
    const useData: UdpDataStruct[] = [];
    // 多个sql执行结果
    try {
      data.series.forEach(sqlRes => {
        // 每个sql执行出的字段
        let columnsArr: ColumnsType = [
          {
            title: '排行',
            dataIndex: 'rank',
            fixed: false,
            key: 'rank',
            width: '10%',
            align: 'center',
            render: (text, record, index) => {
              switch (index) {
                case 0:
                  return <img src={firstImg} style={{ width: 16, height: 16, display: 'inline-flex' }} alt="first"/>;
                case 1:
                  return <img src={secondImg} style={{ width: 16, height: 16, display: 'inline-flex' }} alt="second"/>;
                case 2:
                  return <img src={thirdImg} style={{ width: 16, height: 16, display: 'inline-flex' }} alt="third"/>;
                default:
                  return index + 1;
              }
            }
          }
        ];
        const dataArr: any[] = [];

        sqlRes.fields.forEach(field => {
          columnsArr.push({
            title: field.name,
            dataIndex: field.name,
            key: field.name,
            fixed: false,
          });
        });

        sqlRes.fields.forEach(field => {
          if (Array.isArray(field.values.toArray())) {
            field.values.toArray().forEach((value, index) => {
              if (dataArr[index] === undefined || dataArr[index] === null) {
                dataArr[index] = {
                  rowKey: `${index}${field.name}key`,
                };
                dataArr[index][field.name] = value;
              } else {
                dataArr[index][field.name] = value;
              }
            });
          }
        });

        useData.push({
          columns: columnsArr,
          data: dataArr,
          tabKey: sqlRes.refId,
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
              height: '100%',
              ...toStyle(options.card?.BodyStyle)
            }}
            hoverable={options.card?.hoverable}
            className={`${options.card?.ClassName}`}
            bordered={options.card?.isBorder}
            title={options.card?.Title || false}
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
