import * as React from 'react';
import { render } from 'react-dom';
import { PropsEditor, PropsEditorFactory, IPropsEditorProps } from '../src/';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const { ComponentWithStore: PropsEditorWithStore, client } = PropsEditorFactory();

function onClick(value) {
  console.log('当前点击：', value);
}
function onClickWithStore(value) {
  client.put(`/model`, {
    name: 'text',
    value: `gggg${Math.random()}`.slice(0, 8)
  });

}

const props: IPropsEditorProps = {
  visible: true
};

render(
  <Collapse defaultActiveKey={['1']}>
    <Panel header="普通组件" key="0">
      <PropsEditor {...props} onClick={onClick} />
    </Panel>
    <Panel header="包含 store 功能" key="1">
      <PropsEditorWithStore onClick={onClickWithStore} />
    </Panel>
  </Collapse>,
  document.getElementById('example') as HTMLElement
);

client.post('/model', {
  model: {
    visible: true,
    text: `text${Math.random()}`.slice(0, 8)
  }
});
