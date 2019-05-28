export interface themeType {
  main: string;

  [prop: string]: any;
}

export interface themeStylesType {
  theme?: themeType;
  styles?: any;
}

export interface propType {
  type: string;
  title: string;
  prop?: string;

  [prop: string]: any;
}

export interface objectType {
  [prop: string]: any;
}

export interface formDataType {
  /**
   * 已经存在的属性值
   */
  formData?: objectType;
}

export interface onChangeParamType {
  value: any;
  prop: string;
  formData?: objectType;
}

export interface onChangeType {
  /**
   * 已经存在的属性值
   */
  onChange?(ev: onChangeParamType): any;
}

export interface propEditorType extends propType, formDataType, onChangeType {
  /**
   * 是否隐藏变量切换开关
   */
  hideVarSwitch?: boolean;
}

export interface groupType {
  name: string;
  defaultOpen: boolean;
  title: string;
  properties: string[];
}

export interface groupsType {
  length: number;
  map: any;
  [index: number]: groupType;
}

export interface propertiesType {
  [prop: string]: propType;
}

export interface schemaType {
  /**
   * 属性面板分组
   */
  group?: groupsType;
  /**
   * 属性列表
   */
  properties: propertiesType;
}

/* ----------------------------------------------------
    函数名包装/解包装函数
    有些场景下函数名是 `{{$Button_onChange}}`，而另外有些地方是直接 `$Button_onChange`
    因此需要包装函数用用户自定义处理
----------------------------------------------------- */
export enum WRAPPER_TYPE {
  WRAP = 'WRAP',
  UNWRAP = 'UNWRAP'
}
export type TNameWrapper = (fnName: string, type: WRAPPER_TYPE) => string;

export const FN_NAME_WRAPPER: TNameWrapper = (fnName, type) => {
  return fnName;
};
// ========

export interface editorExtraParamType {
  /**
   * 用于标记唯一性的属性名
   */
  key?: string;
  /**
   * mbox 的 store ，用于变量输入框的自动提示
   */
  $store?: any;
  /**
   * 函数编辑器使用，用于调用函数面板
   */
  clientFnSets?: any;
  /**
   * 函数名规则
   */
  fnNameRule?: string;

  /**
   * 点击 "编辑函数" 时的回调函数，用于外部监听
   */
  onCallFnEditor?: (type: string, name: string) => void;

  /**
   * 函数名包装器
   * 有些场景下变量名是 `{{$Button_onChange}}`，而另外有些地方是直接 `$Button_onChange`
    因此需要包装函数用用户自定义处理
   */
  varNameWrapper?: TNameWrapper;

  [prop: string]: any;
}
