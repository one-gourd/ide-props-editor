/**
 * true or false
 */

import React,{useState,useCallback} from "react";
import {Switch} from 'antd';
import {InlineWrapper, valueChange} from './engine';
import {propEditorType} from "../baseType";

export interface BooleanEditorProps  extends propEditorType{}

export const BooleanEditor:React.FunctionComponent<BooleanEditorProps> = (props)=>{
  const {prop,formData,onChange} = props;
  const [value,setValue] = useState(formData[prop] || '');
  const cbChange = valueChange(value,setValue,prop,formData,onChange);

  const EditerMain = (<Switch onChange={cbChange} checked={value} />);

  const wrapperProp = Object.assign({},{children: EditerMain},props);
  return (<InlineWrapper {...wrapperProp}/>);
};