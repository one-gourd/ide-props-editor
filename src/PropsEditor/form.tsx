/**
 * 创建属性编辑表单
 */


import React from "react";
import {Row,Col} from 'antd';
import {editors,editorsType} from "./edtiors";
import {Label} from "./propEditor/label";

export interface useEditorType{
  useEditor(fieldProps:FieldProps,editors:[]): React.FunctionComponent<any>|React.Component<any>;
}

interface FieldProps {
  type:string;
  title:string;
  prop:string;
  useEditor(fieldProps:FieldProps,editors:[]): React.FunctionComponent<any>|React.Component<any>;
}


const Field:React.FunctionComponent<FieldProps> = (fieldProps)=>{
  const {type,title,prop,useEditor} = fieldProps;
  let Editor = useEditor({type,title,prop},editors);
  if(!Editor){
      Editor = editors[type];
      if(Editor){
        Editor = (<Editor />)
      }else{
        Editor = null;
      }
  }

  return (<Row className='ide-props-editor-field'>
    <Col>
        <Label title={title} prop={prop} />
    </Col>
    <Col>
      {Editor}
    </Col>
  </Row>);
};

export interface FormProps {
    /**
     * schema 输入源
     */
    schema: object;
    useEditor?(propSchema:any,editors:any): React.FunctionComponent<any>|React.Component<any,{},any>|null;
    uiSchema?: object;
    styles?: object;
    formData?: object;
    /**
     * 编辑后触发的事件
     */
    onChange?: void;
}

export const DEFAULT_PROPS: FormProps = {
    schema: {},
    uiSchema: {},
    styles: {}
};



export const Form:React.FunctionComponent<FormProps> = (props)=>{
    const mergedProps = Object.assign({},DEFAULT_PROPS,props);
    const {schema,useEditor} = mergedProps;
    const fields:Array<React.FunctionComponent> = [];
    for(const fieldName in schema){
      fields.push(<Field {...schema[fieldName]} prop={fieldName} useEditor={useEditor} />);
    }
    return (<div>
      {fields}
    </div>);
}