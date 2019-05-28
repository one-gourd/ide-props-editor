/**
 * 编辑函数
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Tooltip } from 'antd';
import { changeFormData, InlineWrapper } from './engine';
import { propEditorType, WRAPPER_TYPE, FN_NAME_WRAPPER } from '../baseType';

export interface FunctionEditorProps extends propEditorType {}

const OPERATION_FROM = 'PROPS_EDITOR'; // 函数操作来源标识，方便函数面板对不同的来源做不同的处理

export const FunctionEditor: React.FunctionComponent<
  FunctionEditorProps
> = props => {
  const { prop, formData, onChange, editorExtraParam } = props;
  const {
    clientFnSets,
    fnNameRule,
    key,
    onCallFnEditor,
    varNameWrapper = FN_NAME_WRAPPER
  } = editorExtraParam;

  // 新增函数名处理函数，有些场景函数名是 `{{$Button_onChange}}`，而另外有些地方是直接 `$Button_onChange`

  const [value, setValue] = useState(
    varNameWrapper(formData[prop] || '', WRAPPER_TYPE.UNWRAP)
  );
  let fnName = '';
  if (!value) {
    //处理函数名称，比如 __$comId_$fnName 变成 __$Button_999_onChange
    fnName = fnNameRule.replace('$fnName', prop);
    fnName = fnName.replace('$comId', formData[key] || formData.id);
  } else {
    fnName = value;
  }

  //控制删除按钮的显示隐藏
  const [showDel, setShowDel] = useState(value !== '');
  // 标记不同的来源
  const fromFlag = `${OPERATION_FROM}:${prop}`;
  /**
   * 函数内容改变后
   */
  useMemo(() => {
    // if (clientFnSets.hasSubscribe('/onSubmitChange')){
    //   clientFnSets.unsubscribe('/onSubmitChange')
    // }
    clientFnSets.subscribe('/onSubmitChange', {
      onMessage: (data: any) => {
        const { hasError, fnItem, from } = data;
        if (!hasError && from === fromFlag) {
          const { name /* body */ } = fnItem;
          setValue(name);
          //函数内容，不需要通知函数内容
          // formData[name] = body;
          // console.log(444, prop, name);
          changeFormData(
            prop,
            varNameWrapper(name, WRAPPER_TYPE.WRAP),
            formData,
            onChange
          );
          setShowDel(true);
        }
      }
    });
  }, [clientFnSets]);

  const onClick = useCallback(() => {
    // 如果有删除按钮，说明函数存在，唤起编辑面板，否则唤起新增面板
    const fnType = showDel ? 'edit' : 'add';
    clientFnSets.put('/fn-panel', {
      type: fnType,
      name: fnName,
      from: fromFlag
    });

    onCallFnEditor && onCallFnEditor(fnType, fnName);
  }, [showDel, fnName, onCallFnEditor]);

  /**
   * 删除函数内容
   */
  const onDel = useCallback(() => {
    if (value) {
      delete formData[value];
      changeFormData(prop, '', formData, onChange);

      // 同时调用函数面板的删除操作
      clientFnSets.del(`/fn-item/${value}`);
    }
    setShowDel(false);
  }, [value]);

  const EditerMain = (
    <div>
      <Button type="primary" size="small" onClick={onClick}>
        编辑函数
      </Button>
      {showDel ? (
        <Tooltip title="删除函数">
          <Button
            icon="delete"
            size="small"
            onClick={onDel}
            style={{ marginLeft: 10 }}
          />
        </Tooltip>
      ) : null}
    </div>
  );

  const wrapperProp = Object.assign(
    {},
    { children: EditerMain, hideVarSwitch: true },
    props
  );
  return <InlineWrapper {...wrapperProp} />;
};
