/**
 * 编辑函数
 */

import React,{useState,useCallback} from "react";
import {Button,Tooltip} from 'antd';
import {valueChange, InlineWrapper} from './engine';
import {propEditorType} from "../baseType";

export interface FunctionEditorProps  extends propEditorType{}

export const FunctionEditor:React.FunctionComponent<FunctionEditorProps> = (props)=>{
  const {prop,formData,onChange,editorExtraParam} = props;
  const {clientFnSets,fnNameRule,key} = editorExtraParam;
  const [value,setValue] = useState(formData[prop] || '');
  const [showDel,setShowDel] = useState(true);

  //处理函数名称，比如 __$comId_$fnName 变成 __$Button_999_onChange
  let fnName = fnNameRule.replace('$fnName',prop);
  fnName = fnName.replace('$comId',formData[key]);

  const onClick = useCallback(()=>{
    //唤起函数面板
    clientFnSets.put('/fn-panel', {
      type: 'add',
      name: fnName
    }).then(res => {
      console.log('res: ', res.body.message);
    });
  },[]);

  const onDel = useCallback(()=>{

  },[]);

  const EditerMain = (<div>
    <Button type="primary" size="small" onClick={onClick} value={value}>编辑函数</Button>
    {showDel ? <Tooltip title="删除函数绑定">
      <Button icon="delete" size="small" onClick={onDel} style={{ marginLeft: 10 }}/>
      </Tooltip> : null}
  </div>);

  const wrapperProp = Object.assign({},{children: EditerMain,hideVarSwitch:true},props);
  return (<InlineWrapper {...wrapperProp}/>);
};