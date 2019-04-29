/**
 * 数组类型编辑器
 */

import React, {useState, useCallback} from "react";
import {Button, Popconfirm} from 'antd';
import {Form} from "../form";
import {InlineWrapper, changeFormData} from './engine';
import {propEditorType} from "../baseType";

export interface ObjectEditorProps extends propEditorType {

}

export const ObjectEditor: React.FunctionComponent<ObjectEditorProps> = (props) => {
  let {properties, prop, formData, onChange, useEditor, theme, styles, editorExtraParam} = props;

  if (!properties) {
    return (<div>schema 缺少 properties 字段</div>);
  }

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


  let btnText = '编辑对象';
  let propLength = 0;
  for (let key in newValue) {
    propLength += 1;
  }
  if (propLength > 0) {
    btnText += `（${propLength}个属性）`;
  }

  styles.form = {
    width: 280
  };

  const form = (
    <Form onChange={formChange} theme={theme} styles={styles} editorExtraParam={editorExtraParam} schema={properties}
          formData={value} useEditor={useEditor}/>);

  const EditerMain = (
    <Popconfirm onConfirm={onConfirm} icon={null} placement="left" title={form} okText="保存" cancelText="取消">
      <Button type="primary" size="small">{btnText}</Button>
    </Popconfirm>);


  const wrapperProp = Object.assign({}, {children: EditerMain}, props);
  return (<InlineWrapper {...wrapperProp}/>);
};