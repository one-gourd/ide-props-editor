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
  const [value,setValue] = useState(formData[prop] || '');

  if(!enumValues || enumValues.length === 0){
    return (<div>不存在枚举值</div>);
  }

  //如果枚举值只有 2 个使用单选框，如果超过使用选择框
  let Widget = enumValues.length > 2 && Select || Radio.Group;
  let WidgetOption = enumValues.length > 2 && Select.Option || Radio.Button;

  const cbChange = valueChange(value,setValue,prop,formData,onChange);


  const EditerMain = (<Widget size="small" style={{width: '100%'}} onChange={cbChange} value={value}>
    {enumValues.map((enumValue)=>{
      return (<WidgetOption value={enumValue}>{enumValue}</WidgetOption>);
    })}
  </Widget>);


  const wrapperProp = Object.assign({},{children: EditerMain},props);
  return (<InlineWrapper {...wrapperProp}/>);
};