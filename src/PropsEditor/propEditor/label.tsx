/**
 * 属性名描述
 */

import React from "react";
import {Tooltip} from 'antd';
import {themeStylesType} from "../baseType";

export interface LabelProps extends themeStylesType {
  title: string;
  prop: string;
  hideTooltip?: boolean;
}


export const Label: React.FunctionComponent<LabelProps> = (props) => {

  const {title, prop, hideTooltip, styles} = props;

  const main = (<span style={styles.label}>{title}</span>);

  if (hideTooltip) {
    return main;
  } else {
    return (<Tooltip title={prop}>
      {main}
    </Tooltip>);
  }
};