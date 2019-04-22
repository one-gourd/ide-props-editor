/**
 * 属性名描述
 */

import React from "react";
import {Tooltip} from 'antd';

export interface LabelProps {
  title:string;
  prop:string;
  hideTooltip?:boolean;
  styles?:object;
}


export const Label:React.FunctionComponent<LabelProps> = (props)=>{

  const {title,prop,hideTooltip} = props;

  const main = (<span>{title}</span>);

  if(hideTooltip){
    return main;
  }else{
    return (<Tooltip title={prop}>
      {main}
    </Tooltip>);
  }
};