import React from "react";
import {Icon,Tooltip,Input} from "antd";

export interface VarSwitchProps {

}

export const VarSwitch:React.FunctionComponent<VarSwitchProps> = (props)=>{

  return (<Tooltip title={'使用变量或表达式'}>
    <Icon type={'code-o'} style={{fontSize: 16, marginTop: 3,marginLeft: 4}} onClick={}/>
  </Tooltip>);
};

export interface VarInputProps {

}


export const VarInput:React.FunctionComponent<VarInputProps> = (props)=>{

  return (<Input size="small" />);
};