export interface themeType{
  main: string;
  [prop: string]: any;
}

export interface themeStylesType{
  theme?:themeType;
  styles?:any;
}

export interface propType{
  type:string;
  title:string;
  prop?:string;
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

export interface groupType{
  name: string;
  defaultOpen: boolean;
  title: string;
  properties: string[];
}

export interface groupsType{
  [index: number]: groupType;
}

export interface propertiesType{
  [prop: string]: propType;
}

export interface schemaType{
  /**
   * 属性面板分组
   */
  group?: groupsType;
  /**
   * 属性列表
   */
  properties: propertiesType;
}