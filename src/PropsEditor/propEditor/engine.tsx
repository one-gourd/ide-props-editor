import React,{useCallback,useState} from "react";
import {Label} from "./label";
import {VarSwitch,VarInput} from "./var";
import {propEditorType, objectType, themeStylesType} from "../baseType";
import {Row,Col} from 'antd';

export interface WrapperProps extends propEditorType,themeStylesType{
  $store?: any;
  children: React.ReactNode,
  varChange?: any;
}

/**
 * 单行容器
 * @param props
 * @returns {any}
 * @constructor
 */
export const InlineWrapper:React.FunctionComponent<WrapperProps> = (props)=>{
  const {title,prop,children,theme,styles,$store,onChange,formData} = props;
  const spanLabel = 6;
  const spanVar = 2;
  const spanMain = !props.hideVarSwitch ? 16 : 16 + 2;
  let initVisibleVarInput = false;
  const value = formData[prop];
  if($store && typeof value === 'string' && value.indexOf('$store.') > -1){
    initVisibleVarInput = true;
  }

  const [visibleVarInput,setVisibleVarInput] = useState(initVisibleVarInput);

  const varSwitchChange = useCallback((visible:boolean)=>{
    setVisibleVarInput(visible);
    if(!visible){
      onChange({value: undefined,prop: prop,formData:formData});
    }
  },[]);

  const varInputChange = useCallback((ev)=>{
    const {value} = ev.target;
    changeFormData(prop,value,formData,onChange);
  },[]);

  return (<Row className='ide-props-editor-field-wrapper' style={{marginBottom: 10}}>
    <Col span={spanLabel}>
      <Label title={title} prop={prop} />
    </Col>
    <Col span={spanMain}>
      <div style={{display: visibleVarInput ? 'none' : 'block'}}>{children}</div>
      <VarInput value={value} $store={$store} visible={visibleVarInput} onChange={varInputChange} />
    </Col>
    {!props.hideVarSwitch ? <Col span={spanVar}><VarSwitch value={initVisibleVarInput} theme={theme} styles={styles} onChange={varSwitchChange} /></Col> : null}
  </Row>);
};

/**
 * 改变表单内容
 * @param {string} prop
 * @param value
 * @param {objectType} formData
 * @param onChange
 * @returns {objectType}
 */
export const changeFormData  = (prop:string,value:any,formData:objectType,onChange:any)=>{
  if(value === null || value === undefined || value === ''){
    delete formData[prop];
  }else{
    formData[prop] = value;
  }
  onChange && onChange({value: value,prop: prop,formData:formData});
  return formData;
};

/**
 * 编辑器值改变后触发的回调
 * @param {string} value
 * @param setValue
 * @param {string} prop
 * @param {objectType} formData
 * @param onChange
 * @returns {any}
 */
export const valueChange = (value:string,setValue:any,prop:string,formData:objectType,onChange:any)=>{
  return useCallback((ev)=>{
    let value = ev;
    if(typeof ev === 'object' && ev.target){
      value = ev.target.value;
    }
    setValue(value);
    changeFormData(prop,value,formData,onChange);
  },[]);
};