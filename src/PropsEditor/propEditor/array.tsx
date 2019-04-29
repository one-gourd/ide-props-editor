/**
 * 数组类型编辑器
 */

import React, {useState, useCallback} from "react";
import {Button, Modal, Table, Input} from 'antd';
import {InlineWrapper, changeFormData} from './engine';
import {propEditorType} from "../baseType";

export interface ArrayFormProps {
  properties: any;
  dataSource: [];
  onChange: any;
}

/**
 * 数据编辑表格表单
 * @param props
 * @returns {any}
 * @constructor
 */
const ArrayForm: React.FunctionComponent<ArrayFormProps> = (props) => {
  const {properties, dataSource, onChange} = props;
  const columns = [];

  const [value, setValue] = useState(dataSource || []);

  /**
   * 点击添加一行数据
   */
  const onClick = useCallback(() => {
    let props: any = {};
    for (let key in properties) {
      props[key] = '';
    }
    value.push(props);
    setValue([].concat(value));

    onChange && onChange(value);
  }, []);


  /**
   * 渲染列与默认数据
   */
  for (let key in properties) {
    columns.push({
      title: properties[key].title,
      dataIndex: key,
      key: key,
      render: (text: any, record: any, index: number) => {
        return (<Input onChange={(ev) => {
          value[index][key] = ev.target.value;
          setValue([].concat(value));
          onChange && onChange(value);
        }} defaultValue={text}/>)
      }
    });
  }

  columns.push({
    title: '操作',
    dataIndex: 'operation',
    render: (text: any, record: any, index: number) => {
      return (<div>
        <a onClick={() => {
          value.splice(index, 1);
          setValue([].concat(value));
          onChange && onChange(value);
        }}>删除</a>
      </div>);
    }
  });

  return <div>
    <div style={{marginBottom: 10}}>
      <Button type="primary" size="small" onClick={onClick}>添加一行数据</Button>
    </div>
    <Table dataSource={value} columns={columns} pagination={false}/>
  </div>;
};


export interface ArrayEditorProps extends propEditorType {

}

export const ArrayEditor: React.FunctionComponent<ArrayEditorProps> = (props) => {
  let {items, prop, formData, onChange} = props;

  if (!items) {
    return (<div>schema 缺少 items 字段</div>);
  }

  const initValue = formData[prop] || [];

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(initValue);
  let newValue = value;

  const onClick = useCallback(() => {
    setVisible(true);
  }, []);

  const onOk = useCallback(() => {
    setVisible(false);
    setValue([].concat(newValue));
    changeFormData(prop, newValue, formData, onChange);
  }, []);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  let btnText = '编辑数组';
  if (newValue.length > 0) {
    btnText += `（${newValue.length}条数据）`;
  }

  const dataSourceChange = useCallback((value) => {
    newValue = value;
  }, []);

  const EditerMain = (<div>
    <Button type="primary" size="small" onClick={onClick}>{btnText}</Button>
    {visible ? <Modal title={`编辑 ${prop} 属性内容`} visible={true} onOk={onOk} onCancel={onCancel}>
      <ArrayForm properties={items.properties} dataSource={value} onChange={dataSourceChange}/>
    </Modal> : null}

  </div>);


  const wrapperProp = Object.assign({}, {children: EditerMain}, props);
  return (<InlineWrapper {...wrapperProp}/>);
};