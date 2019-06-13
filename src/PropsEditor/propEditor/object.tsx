/**
 * 数组类型编辑器
 */

import React, {useState, useCallback} from "react";
import {Button, Popconfirm,Input,message} from 'antd';
import {Form} from "../form";
import {InlineWrapper, changeFormData} from './engine';
import {propEditorType} from "../baseType";
const { TextArea } = Input;

export interface ObjectEditorProps extends propEditorType {

}

export const ObjectEditor: React.FunctionComponent<ObjectEditorProps> = (props) => {
  let {properties, prop, formData, onChange, useEditor, theme, styles, editorExtraParam} = props;

  const initValue = formData[prop] || {};
  const [value, setValue] = useState(initValue);
  let newValue = value;

  /**
   * 表单值改变后
   */
  const formChange = useCallback((ev: any) => {
    newValue = ev.formData;
  }, []);

  const onConfirm = useCallback(() => {
    setValue(Object.assign({}, newValue));
    changeFormData(prop, newValue, formData, onChange);
  }, []);

  const textAreaChange = useCallback((ev: any) => {
    const {value} = ev.target;
    try{
      newValue = JSON.parse(value);
    }catch (err){
      message.error('json 解析出错');
    }

  }, []);


  let btnText = '编辑对象';
  let propLength = 0;
  for (let key in newValue) {
    propLength += 1;
  }
  if (propLength > 0) {
    btnText += `（${propLength}个属性）`;
  }

  let form;
  if (!properties) {
    form = (<div><p>object 对象</p><TextArea rows={4} onBlur={textAreaChange} /></div>);
  }else{
    form = (
      <Form onChange={formChange} theme={theme} styles={styles} editorExtraParam={editorExtraParam} schema={properties}
            formData={value} useEditor={useEditor}/>);
  }

  const EditerMain = (
    <Popconfirm onConfirm={onConfirm} icon={null} placement="left" title={form} okText="保存" cancelText="取消">
      <Button type="primary" size="small">{btnText}</Button>
    </Popconfirm>);




  const wrapperProp = Object.assign({}, {children: EditerMain}, props);
  return (<InlineWrapper {...wrapperProp}/>);
};