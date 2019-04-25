import React, { useState, useCallback,useReducer } from 'react';
import { render } from 'react-dom';
import {Row,Col,Button,Input} from 'antd';
const { TextArea } = Input;
import { PropsEditor, PropsEditorFactory, IPropsEditorProps } from '../src/';
import {onChangeParamType} from "../src/PropsEditor/baseType";
const { ComponentWithStore: PropsEditorWithStore, client } = PropsEditorFactory();

const schema = {
  "group": [
    {
      "name": "base",
      "defaultOpen": true,
      "title": "基础属性",
      "properties": ["key","children","size","loading","shap","width"]
    }
  ],
  "properties": {
      "key":{
        "type": "id",
        "title": "唯一 id",
        "prefix": "$Button_"
      },
      "children":{
        "type": "string",
        "title": "文案"
      },
      "size": {
        "type": "enum",
        "title": "大小",
        "enum": ["small","medium","large"]
      },
      "shap": {
        "type": "enum",
        "title": "形状",
        "enum": ["small","large"]
      },
      "loading": {
        "type": "boolean",
        "title": "载入状态"
      },
      "width": {
        "type": "number",
        "title": "宽度"
      }
  }
};

const formData = {
  "children": "按钮测试",
  "loading": true,
  "size": "medium",
  "key": "$Button_999",
  //用于 id 是否唯一的判断
  "keys": ["$Button_123"],
};

// function onClickWithStore(value) {
//   client.put(`/model`, {
//     name: 'text',
//     value: `gggg${Math.random()}`.slice(0, 8)
//   });

// }

/**
 * 根据属性自定义使用的编辑器
 * @param propSchema
 * @param editors
 * @returns {any}
 */
function useEditor(propSchema:any,editors:any):any{
  const {type} = propSchema;
  let Editor;
  return null;
}

const props: IPropsEditorProps = {
  visible: true,
  schema: schema,
  formData : formData,
  styles: {
    container: {
      width: 300
    }
  },
  useEditor: useEditor
};

function reducer(state,action) {
  return Object.assign({},action.formData);
}

const Demo:React.FunctionComponent<IPropsEditorProps> = (props)=>{
  const [state, dispatch] = useReducer(reducer, formData);
  const handleChange = useCallback((ev:onChangeParamType)=>{
    dispatch({type:'change',formData: ev.formData});
  }, []);
  return (<Row>
    <Col span={12}>
      <div style={{marginRight: 10}}>
        <p>属性值</p>
        <TextArea row={6} value={JSON.stringify(state)} />
        <p style={{marginTop: 10}}>
          <Button size="small">渲染属性编辑器</Button>
        </p>
      </div>
    </Col>
    <Col span={12}>
      <PropsEditor {...props} onChange={handleChange} />
    </Col>
  </Row>);
};

render(
  <Demo {...props} />,
  document.getElementById('example') as HTMLElement
);
