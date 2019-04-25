import React,{useCallback} from "react";
import {Label} from "./label";
import {VarSwitch} from "./var";
import {propEditorType,objectType} from "../baseType";
import {Row,Col} from 'antd';

export interface WrapperProps extends propEditorType{
  children: React.ReactNode
}

export const InlineWrapper:React.FunctionComponent<WrapperProps> = (props)=>{
  const {title,prop,children} = props;
  const spanLabel = 6;
  const spanVar = 2;
  const spanMain = !props.hideVarSwitch ? 16 : 16 + 2;


  return (<Row className='ide-props-editor-field-wrapper' style={{marginBottom: 10}}>
    <Col span={spanLabel}>
      <Label title={title} prop={prop} />
    </Col>
    <Col span={spanMain}>
      {children}
    </Col>
    {!props.hideVarSwitch ? <Col span={spanVar}><VarSwitch /></Col> : null}
  </Row>);
};

/**
 * 改变表单内容
 * @param {string} prop
 * @param value
 * @param {objectType} formData
 * @param onChange
 * @returns {objectType}
 */
export const changeFormData  = (prop:string,value:any,formData:objectType,onChange:any)=>{
  formData[prop] = value;
  onChange && onChange({value: value,prop: prop,formData:formData});
  return formData;
};

/**
 * 编辑器值改变后触发的回调
 * @param {string} value
 * @param setValue
 * @param {string} prop
 * @param {objectType} formData
 * @param onChange
 * @returns {any}
 */
export const valueChange = (value:string,setValue:any,prop:string,formData:objectType,onChange:any)=>{
  return useCallback((ev)=>{
    let value = ev;
    if(ev.target){
      value = ev.target.value;
    }
    setValue(value);
    changeFormData(prop,value,formData,onChange);
  },[]);
};