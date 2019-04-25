/**
 * 数值编辑器
 */

import React,{useState,useCallback} from "react";
import {InputNumber} from 'antd';
import {valueChange, InlineWrapper} from './engine';
import {propEditorType} from "../baseType";

export interface NumberEditorProps  extends propEditorType{}

export const NumberEditor:React.FunctionComponent<NumberEditorProps> = (props)=>{
  const {prop,formData,onChange} = props;
  const [value,setValue] = useState(formData[prop] || '');
  const cbChange = valueChange(value,setValue,prop,formData,onChange);

  const EditerMain = (<InputNumber size="small" onChange={cbChange} value={value} />);

  const wrapperProp = Object.assign({},{children: EditerMain},props);
  return (<InlineWrapper {...wrapperProp}/>);
};