import * as React from 'react';
import { render } from 'react-dom';
import { PropsEditor, PropsEditorFactory, IPropsEditorProps } from '../src/';
import { editorsType } from '../src/PropsEditor/edtiors';
const { ComponentWithStore: PropsEditorWithStore, client } = PropsEditorFactory();

const schema: object = {
  "group": [
    {
      "name": "base",
      "defaultOpen": true,
      "title": "基础属性",
      "properties": ["children","size","loading"]
    }
  ],
  "properties": {
      "children":{
        "type": "string",
        "title": "文案"
      },
      "size": {
        "type": "enum",
        "enum": ["small","medium","large"]
      },
      "loading": {
        "type": "boolean",
        "title": "载入状态"
      }
  }
};

// function onClickWithStore(value) {
//   client.put(`/model`, {
//     name: 'text',
//     value: `gggg${Math.random()}`.slice(0, 8)
//   });

// }

function useEditor(propSchema:any,editors:editorsType):React.FunctionComponent<any>|React.Component<any,any>|null{
  const {type,prop} = propSchema;
  // let Editor:React.FunctionComponent<any>|React.Component<any>|null;
  if(type === 'string'){
    const Editor =  editors.string as React.FunctionComponent<any>;
    return <Editor />;
  }
  return null;
}

const props: IPropsEditorProps = {
  visible: true,
  schema: schema,
  styles: {
    container: {
      width: 300
    }
  },
  useEditor: useEditor
};

render(
  <PropsEditor {...props} />,
  document.getElementById('example') as HTMLElement
);
