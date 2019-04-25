
export interface propType{
  type:string;
  title:string;
  prop:string;
  [prop: string]: any;
}


export interface objectType{
  [prop: string]: any;
}

export interface formDataType{
  /**
   * 已经存在的属性值
   */
  formData?:objectType;
}

export interface onChangeParamType{
  value: any,
  prop: string,
  formData?: objectType
}

export interface onChangeType{
  /**
   * 已经存在的属性值
   */
  onChange?(ev:onChangeParamType):any;
}

export interface propEditorType extends propType,formDataType,onChangeType{
  /**
   * 是否隐藏变量切换开关
   */
  hideVarSwitch?: boolean;
}