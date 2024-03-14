/**
 * @desc: FieldArray
 * @author zhaozhou
 * @date 2022/7/20
 */
import { Alert, Button, FieldArray, Form, TextArea } from "@grafana/ui";
import React from "react";
import { StandardEditorProps } from "@grafana/data";
import { AlertVariant } from "@grafana/ui/components/Alert/Alert";

interface FieldArrayProps extends StandardEditorProps<Record<string, any>> {
}
const MyFieldArray: React.FC<FieldArrayProps> = (props) => {

  const [severities, setSeverities] = React.useState<{
    title: string;
    type: AlertVariant;
  }[]>([]);

  return <>
    <Form<any> defaultValues={props.value} onSubmit={values => {
      props.onChange(values);
      setSeverities([{
        title: '保存成功',
        type: 'success',
      }]);
      setTimeout(() => {
        setSeverities([]);
      }, 2000);
    }}>
      {({ control, register }) =>
        <FieldArray control={control} name={'prefixUrl'}>
          {({ fields, append, remove }) => {
            return <>
              <div style={{ marginBottom: '12px' }}>
                {fields.map((field, index) => {
                  return <>
                    <div>
                      <span>{index + 1}</span>
                      <TextArea
                        placeholder={'图片地址url'}
                        key={index}
                        {...register(`prefixUrl[${index}].url` as const)}
                        defaultValue={field.url}
                      />
                    </div>
                  </>;
                })}
              </div>
              {severities.map((severity, index) => (
                <>
                  <Alert
                    title={`提示: ${severity.title}`}
                    severity={severity.type}
                    key={index}
                    onRemove={() => {
                      setSeverities([]);
                    }}
                  />
                </>
              ))}
              <Button
                size={'sm'}
                style={{ marginRight: '1rem' }}
                onClick={() => append({ url: '' })}
              >
                新增一个
              </Button>
              {
                fields.length > 0 && <Button
                      size={'sm'}
                      style={{ marginRight: '1rem' }}
                      onClick={() => remove(fields.length - 1)}
                  >
                      移除一个
                  </Button>
              }
              <Button size={"sm"} type="submit">保存</Button>
            </>
          }}
        </FieldArray>
      }
    </Form>
  </>;
}

export default MyFieldArray;