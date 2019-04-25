/**
 * 唯一 key 编辑器
 */

import React,{useState,useCallback} from "react";
import {Input,message, Icon, Tooltip} from 'antd';
import {changeFormData, InlineWrapper} from './engine';
import {propEditorType} from "../baseType";

export interface IdEditorProps  extends propEditorType{
  /**
   * id 前缀
   */
  prefix?:string;
}

/**
 * 复制 id
 * @param {string} id
 */
const copy = (id:string)=>{
  if (document.execCommand) {
    const oInput = document.createElement('input');
    oInput.value = id;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    message.success(`${id} 已经复制`);
  }
};

export const IdEditor:React.FunctionComponent<IdEditorProps> = (props)=>{
  const {prop,prefix,formData,onChange} = props;
  const ids:string[] = formData[`${prop}s`] || [];
  const [value,setValue] = useState(formData[prop] || '');
  const cbChange = useCallback((ev)=>{
    let {value} = ev.target;

    //给 id 增加前缀，加\\是为了匹配 $
    if(prefix && !new RegExp(`\\${prefix}`).test(value)){
      value = prefix + value;
    }

    //保证唯一
    if(ids.indexOf(value) > -1){
      message.error(`${value} 已经存在，请重新设置！`);
    }else{
      setValue(value);
      changeFormData(prop,value,formData,onChange);
    }
  },[]);

  const EditerMain = (<div>
    <Input size="small" style={{width: '90%'}} onChange={cbChange} value={value} />
    <Tooltip title={`复制 ${prop} 的值`}>
      <Icon type={'copy'} onClick={()=> copy(value)} style={{float: 'right', fontSize: 16, marginTop: 3}}/>
    </Tooltip>
  </div>);

  const wrapperProp = Object.assign({},{children: EditerMain,hideVarSwitch: true},props);
  return (<InlineWrapper {...wrapperProp}/>);
};