/**
 * 创建属性编辑表单
 */


import React from "react";
import {editors} from "./edtiors";
import { StyledForm } from "./styles";
import {propType, formDataType, onChangeType, propertiesType, themeStylesType, editorExtraParamType} from "./baseType";

interface FieldProps extends propType, formDataType, onChangeType, themeStylesType {
  useEditor?(propSchema: any, editors: any): any;

  editorExtraParam?: editorExtraParamType;
}


const Field: React.FunctionComponent<FieldProps> = (fieldProps) => {
  const {type, useEditor} = fieldProps;
  //优先使用开发者定义的编辑器
  let Editor = useEditor(fieldProps, editors);
  if (!Editor) {
    Editor = editors[type];
    if (Editor) {
      let props = fieldProps;
      //enum 是 ts 关键字，为了防止报错，使用 enumValues 代替
      if (type === 'enum') {
        props = Object.assign({}, {enumValues: fieldProps.enum}, fieldProps);
      }
      Editor = (<Editor {...props} />)
    } else {
      Editor = null;
    }
  }

  return Editor;
};

export interface FormProps extends formDataType, onChangeType, themeStylesType {
  /**
   * schema 输入源
   */
  schema: any;

  useEditor?(propSchema: any, editors: any): any;

  editorExtraParam?: editorExtraParamType;
}

export const DEFAULT_PROPS: FormProps = {
  schema: {},
  formData: {},
  styles: {}
};

export const Form: React.FunctionComponent<FormProps> = (props) => {
  const mergedProps = Object.assign({}, DEFAULT_PROPS, props);
  const {schema, useEditor, formData, onChange, theme, styles, editorExtraParam} = mergedProps;
  const fields = [];
  for (const fieldName in schema) {
    fields.push(<Field key={`field_${fieldName}`}  {...schema[fieldName]} theme={theme} styles={styles} editorExtraParam={editorExtraParam}
                       prop={fieldName} formData={formData} onChange={onChange} useEditor={useEditor}/>);
  }
  return (<StyledForm style={styles} theme={theme}>
    {fields}
  </StyledForm>);
};