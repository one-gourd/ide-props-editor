import React, { useCallback } from "react";
import { Collapse } from "antd";
import { IBaseTheme, IBaseComponentProps } from "ide-lib-base-component";

import { TComponentCurrying } from "ide-lib-engine";

import { StyledContainer } from "./styles";
import { ISubProps } from "./subs";
import { Form } from "./form";
import { edtiorsType } from "./edtiors";

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
    IBaseComponentProps {
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
  const { visible,schema,useEditor, text, styles, onClick } = props;

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
    },
    [onClick]
  );

  let {group,properties} = schema;

  let FormSchema: Array<Object> = [];
  
  if(group && group.length > 0){
    group.map((item: object)=>{
      const groupProperties: Array = item.properties;
      if(groupProperties && groupProperties.length){
        let newProperties: object = {};
        groupProperties.map((propName:string)=>{
          newProperties[propName] = properties[propName];
        })

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
              <Form schema={item.properties} useEditor={useEditor}  />
            </Panel>;
        })}
        
      </Collapse>
    </StyledContainer>
  );
};
