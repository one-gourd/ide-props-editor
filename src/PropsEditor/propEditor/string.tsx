/**
 * 输入框
 */

import React from "react";
import {Tooltip} from 'antd';

export interface StringEditorProps {
  title:string;
  prop:string;
  showTooltip:boolean;
  styles?:object;
}


export const StringEditor:React.FunctionComponent<StringEditorProps> = (props)=>{

  const {title,prop,showTooltip} = props;

  const main = (<span>{title}</span>);

  if(showTooltip){
    return (<Tooltip title={prop}>
      {main}
    </Tooltip>);
  }else{
    return main;
  }
};