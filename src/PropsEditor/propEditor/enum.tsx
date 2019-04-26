/**
 * 枚举值
 */

import React,{useState,useCallback} from "react";
import {Select,Radio} from 'antd';
import {InlineWrapper, valueChange} from './engine';
import {propEditorType} from "../baseType";

export interface EnumEditorProps  extends propEditorType{
  enumValues?:string[];
}

export const EnumEditor:React.FunctionComponent<EnumEditorProps> = (props)=>{
  let {enumValues,prop,formData,onChange} = props;

  if(!enumValues || enumValues.length === 0){
    return (<div>不存在枚举值</div>);
  }
  let initValue = formData[prop];
  if(enumValues.indexOf(initValue) === -1){
    initValue = '';
  }
  const [value,setValue] = useState(initValue);


  //如果枚举值只有 2 个使用单选框，如果超过使用选择框
  let Widget:any = Radio.Group;
  let WidgetOption:any = Radio.Button;

  const cbChange = valueChange(value,setValue,prop,formData,onChange);

  if(enumValues.length > 2){
    Widget = Select;
    WidgetOption = Select.Option;
    enumValues = [''].concat(enumValues);
  }

  const EditerMain = (<Widget size="small" style={{width: '100%'}} onChange={cbChange} value={value}>
    {enumValues.map((enumValue)=>{
      return (<WidgetOption value={enumValue}>{enumValue ==='' && '请选择' || enumValue}</WidgetOption>);
    })}
  </Widget>);


  const wrapperProp = Object.assign({},{children: EditerMain},props);
  return (<InlineWrapper {...wrapperProp}/>);
};