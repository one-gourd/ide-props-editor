import React, { useState, useCallback, useReducer } from 'react';
import { render } from 'react-dom';
import { Row, Col, Input } from 'antd';

const { TextArea } = Input;
import {
  PropsEditor,
  PropsEditorFactory,
  IPropsEditorProps,
  schemaType,
  WRAPPER_TYPE
} from '../src/';
import { onChangeParamType } from '../src/PropsEditor/baseType';
import {
  defaultFormData,
  defaultSchema,
  defaultStore,
  secondProps
} from './fakeData';

const {
  ComponentWithStore: PropsEditorWithStore,
  client
} = PropsEditorFactory();

//函数编辑面板
import {
  FunctionSets,
  FunctionSetsFactory,
  IFunctionSetsProps
} from 'ide-function-sets';

const {
  ComponentWithStore: FunctionSetsWithStore,
  client: clientFnSets
} = FunctionSetsFactory();

/**
 * 根据属性自定义使用的编辑器
 * @param propSchema
 * @param editors
 * @returns {any}
 */
function useEditor(propSchema: any, editors: any): any {
  const { type } = propSchema;
  let Editor;
  return null;
}

const props: IPropsEditorProps = {
  visible: true,
  schema: defaultSchema,
  formData: defaultFormData,
  useEditor: useEditor,
  editorExtraParam: {
    key: 'key',
    //用于 id 是否唯一的判断
    keys: ['$Button_123'],
    $store: defaultStore,
    clientFnSets: clientFnSets,
    onCallFnEditor: (type, name) => {
      console.log(`${type} ${name}`);
    },
    varNameWrapper: (fnName, type) => {
      if(type === WRAPPER_TYPE.UNWRAP) {
        return fnName.replace(/[\{\}]/g, ''); // 去除大小括号
      } else {
        return `{{${fnName}}}`;
      }
    },
    fnNameRule: '__$comId_$fnName'
  }
};

function reducer(state, action) {
  return Object.assign({}, action.formData);
}

// setTimeout(() => {
//   console.log('new props');
//   props.schema = secondProps.schema;
//   props.formData = secondProps.formData;
// }, 2000);

const Demo: React.FunctionComponent<any> = () => {
  const [state, dispatch] = useReducer(reducer, defaultFormData);
  const handleChange = useCallback((ev: onChangeParamType) => {
    console.log('onChange: ', ev.formData);
    dispatch({ type: 'change', formData: ev.formData });
  }, []);

  return (
    <div>
      <Row>
        <Col span={12}>
          <div style={{ marginRight: 10 }}>
            <p>属性值</p>
            <TextArea style={{ height: 160 }} value={JSON.stringify(state)} />
          </div>
        </Col>
        <Col span={12}>
          <PropsEditor {...props} onChange={handleChange} />
        </Col>
      </Row>
      <div style={{ marginTop: 10 }}>
        <FunctionSetsWithStore />
      </div>
    </div>
  );
};

render(<Demo />, document.getElementById('example') as HTMLElement);
