/**
 * 编辑函数
 */

import React,{useState,useCallback} from "react";
import {Button,Tooltip} from 'antd';
import {changeFormData, InlineWrapper} from './engine';
import {propEditorType} from "../baseType";

export interface FunctionEditorProps  extends propEditorType{}

export const FunctionEditor:React.FunctionComponent<FunctionEditorProps> = (props)=>{
  const {prop,formData,onChange,editorExtraParam} = props;
  const {clientFnSets,fnNameRule,key} = editorExtraParam;
  const [value,setValue] = useState(formData[prop] || '');
  let fnName = '';
  if(!value){
    //处理函数名称，比如 __$comId_$fnName 变成 __$Button_999_onChange
    fnName = fnNameRule.replace('$fnName',prop);
    fnName = fnName.replace('$comId',formData[key]);
  }else{
    fnName = value;
  }

  //控制删除按钮的显示隐藏
  const [showDel,setShowDel] = useState(value !== '');


  /**
   * 函数内容改变后
   */
  clientFnSets.subscribe('/onSubmitChange', {
    onMessage: (data:any) => {
      const {hasError,fnItem} = data;
      if(!hasError){
        const {name,body} = fnItem;
        setValue(name);
        //函数内容
        formData[name] = body;
        changeFormData(prop,value,formData,onChange);
        setShowDel(true);
      }
    }
  });

  const onClick = useCallback(()=>{
    //唤起函数面板
    clientFnSets.put('/fn-panel', {
      type: 'add',
      name: fnName
    });
  },[]);

  /**
   * 删除函数内容
   */
  const onDel = useCallback(()=>{
    if(value){
      delete formData[value];
      changeFormData(prop,'',formData,onChange);
    }
    setShowDel(false);
  },[value]);

  const EditerMain = (<div>
    <Button type="primary" size="small" onClick={onClick}>编辑函数</Button>
    {showDel ? <Tooltip title="删除函数">
      <Button icon="delete" size="small" onClick={onDel} style={{ marginLeft: 10 }}/>
      </Tooltip> : null}
  </div>);

  const wrapperProp = Object.assign({},{children: EditerMain,hideVarSwitch:true},props);
  return (<InlineWrapper {...wrapperProp}/>);
};