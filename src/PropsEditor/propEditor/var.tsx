import React, {useCallback, useState, useReducer} from "react";
import {Icon, Tooltip, Input, Mention, message} from "antd";
import {themeStylesType} from "../baseType";

const {toString, toContentState} = Mention;

export interface VarSwitchProps extends themeStylesType {
  onChange(visible: boolean): void;

  value: boolean;
}

export const VarSwitch: React.FunctionComponent<VarSwitchProps> = (props) => {
  const {onChange, theme, styles, value} = props;
  const [use, setUse] = useState(value);
  const color = use && theme.main || theme.iconDefaultColor;

  return (<Tooltip title={'使用变量或表达式'}>
    <Icon type={'code-o'} style={Object.assign({}, styles.varIcon, {color})} onClick={() => {
      setUse(!use);
      onChange && onChange(!use);
    }}/>
  </Tooltip>);
};

export interface VarInputProps {
  $store?: any;
  visible?: boolean;
  onChange?: any;
  value: any;
}

const getSuggestionsFormObject = (path: string, $store: any) => {
  let suggestions: string[] = [];
  const dataSource = eval(path.replace(/\.$/, ''));
  for (const item in dataSource) {
    suggestions.push(item);
  }
  return suggestions;
};

function reducer(state, action) {
  return Object.assign({}, {value: action.value});
}

export const VarInput: React.FunctionComponent<VarInputProps> = (props) => {
  const {$store, visible, onChange, value} = props;
  if (!visible) return null;
  if (!$store) {
    return <Input size="small" onChange={onChange}/>
  } else {

    const prefix = '$store.';
    const initValue = typeof value === 'string' && value || prefix;
    const [state, dispatch] = useReducer(reducer, {value: toContentState(initValue)});
    const initSuggestions = getSuggestionsFormObject(prefix, $store);
    const [suggestions, setSuggestions] = useState(initSuggestions);
    let sValue = '';
    const onSearchChange = useCallback((value: string, trigger: string) => {
      let newSuggestions: string[] = [];
      if (value) {
        const storeFullPath: string = trigger + value;
        let storePaths: string[] = storeFullPath.split('.');
        //抛弃最后一个单词
        const lastPath: string = storePaths.pop();
        const wholeSuggestions = getSuggestionsFormObject(storePaths.join('.'), $store);
        if (!lastPath) {
          newSuggestions = wholeSuggestions;
        } else {
          wholeSuggestions.map((suggestion: string) => {
            if (suggestion.indexOf(lastPath) > -1) {
              newSuggestions.push(suggestion);
            }
          });
        }
        setSuggestions(newSuggestions);
      } else {
        setSuggestions(suggestions);
      }
    }, []);

    const onSelect = useCallback((suggestion: string) => {
      let oldValue = sValue;
      setTimeout(() => {
        let paths = oldValue.split('.');
        paths.pop();
        const newValue = paths.join('.') + '.' + suggestion;
        dispatch({type: 'change', value: toContentState(newValue)});
      }, 200);
    }, []);

    const cbChange = useCallback((value: any) => {
      sValue = toString(value);
      dispatch({type: 'change', value: value});
    }, []);

    const onBlur = useCallback((ev) => {
      try {
        eval(sValue);
      } catch (err) {
        message.error(`变量或表达式错误！`);
        return false;
      }
      onChange({target: {value: sValue}});
    }, []);

    return (<Mention style={{width: '100%', minHeight: 20}} onBlur={onBlur} onSelect={onSelect} value={state.value}
                     onChange={cbChange}
                     onSearchChange={onSearchChange} suggestions={suggestions} prefix={prefix}
                     size="small"/>);
  }
};