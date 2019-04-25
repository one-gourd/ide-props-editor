import React, { useCallback } from "react";
import { Collapse } from "antd";
import { IBaseTheme, IBaseComponentProps } from "ide-lib-base-component";

import { TComponentCurrying } from "ide-lib-engine";

import { StyledContainer } from "./styles";
import { ISubProps } from "./subs";
import { Form } from "./form";
import {formDataType, onChangeType} from "./baseType";

const Panel = Collapse.Panel;

export interface IPropsEditorEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IPropsEditorTheme extends IBaseTheme {
  main: string;
}

export interface IPropsEditorProps
  extends IPropsEditorEvent,
    ISubProps,
    IBaseComponentProps,formDataType,onChangeType {
  /**
   * schema 输入源
   */
  schema: object;
  /**
   * 是否展现
   */
  visible?: boolean;
  /**
   * 指定使用特定的属性编辑器
   */
  useEditor?(fieldProps:any,editors:any): React.FunctionComponent<any>|React.Component<any>|null;
}

export const DEFAULT_PROPS: IPropsEditorProps = {
  schema: {},
  formData: {},
  visible: true,
  theme: {
    main: "#25ab68"
  },
  styles: {
    container: {
      width: 300
    }
  }
};

export const PropsEditorCurrying: TComponentCurrying<
  IPropsEditorProps,
  ISubProps
> = subComponents => props => {
  const { visible,schema,useEditor, styles,formData,onChange } = props;

  let {group,properties} = schema;

  let FormSchema: Array<Object> = [];
  
  if(group && group.length > 0){
    group.map((item: object)=>{
      const groupProperties: Array = item.properties;
      if(groupProperties && groupProperties.length){
        let newProperties: object = {};
        groupProperties.map((propName:string)=>{
          newProperties[propName] = properties[propName];
        });

        item.properties = newProperties;
        FormSchema.push(item);
      }
    })
  }else{
    FormSchema = [
      {
        "name": "base",
        "defaultOpen": true,
        "title": "属性",
        "properties": properties
      }
    ];
  }

  //设置默认开启的 panel
  let defaultActiveKey:Array = [];
  FormSchema.map((item)=>{
    if(item.defaultOpen){
      defaultActiveKey.push(item.name);
    }
  })


  return (
    <StyledContainer
      style={styles.container}
      visible={visible}
      className="ide-props-editor-container"
    >
      <Collapse defaultActiveKey={defaultActiveKey}>
        {FormSchema.map((item)=>{
            return <Panel header={item.title} key={item.name}>
              <Form schema={item.properties} formData={formData}  useEditor={useEditor} onChange={onChange}  />
            </Panel>;
        })}
        
      </Collapse>
    </StyledContainer>
  );
};
