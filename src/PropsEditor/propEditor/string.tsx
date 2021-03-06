/**
 * 输入框
 */

import React,{useState,useCallback} from "react";
import {Input} from 'antd';
import {valueChange, InlineWrapper} from './engine';
import {propEditorType} from "../baseType";

export interface StringEditorProps  extends propEditorType{}

export const StringEditor:React.FunctionComponent<StringEditorProps> = (props)=>{
  const {prop,formData,onChange} = props;
  const [value,setValue] = useState(formData[prop] || '');
  const cbChange = valueChange(value,setValue,prop,formData,onChange);

  const EditerMain = (<Input size="small" onChange={cbChange} value={value} />);

  const wrapperProp = Object.assign({},{children: EditerMain},props);
  return (<InlineWrapper {...wrapperProp}/>);
};