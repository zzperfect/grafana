import React from 'react';
import { GrafanaTheme, PanelProps } from '@grafana/data';
import { SimpleOptions, UdpDataStruct } from 'types';
import { Card } from "antd";
import { css, cx } from "emotion";
import { useStyles, withTheme } from "@grafana/ui";
import Main from "./component/Main";
import { toStyle } from "./utils";

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
        let nameArr: string[] | string | number = '';
        let dataArr: any[] = [];

        sqlRes.fields.forEach(field => {
          // 每个字段值综合成一个数组
          if ( !Array.isArray(nameArr)) {
            nameArr = [field.name];
          } else {
            nameArr.push(field.name);
          }
          if ( !Array.isArray(dataArr)) {
            dataArr = [field.values.toArray()];
          } else {
            dataArr.push(field.values.toArray());
          }

        });

        useData.push({
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
              height={height  - ((options.card?.Title || options.card?.SubTitle) ? 58 : 0)  - 48}
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
