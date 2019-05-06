import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IPropsEditorProps } from './index';

interface IStyledProps extends IPropsEditorProps, IBaseStyledProps {}

export const StyledContainer = styled.div.attrs((props)=>({
  mainColor:  props.theme.main
}))<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  .ant-collapse{
    border-radius: 0;
    border-top: 0;
    border-bottom: 0;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    padding: 4px 30px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .arrow{
    left: 10px;
  }
`;

/**
 * 重置 antd 的表单样式，支持主题配置
 * @type {boolean}
 */
export const StyledForm = styled.div.attrs((props)=>({
  mainColor:  props.theme.main
}))<IStyledProps>`
  .ant-select-focused .ant-select-selection{
      border-color: ${(props: IStyledProps) => props.mainColor} !important;  
  }
  .ant-btn-primary{
    background-color: ${(props: IStyledProps) => props.mainColor};
    border-color: ${(props: IStyledProps) => props.mainColor};
  }
  .ant-btn-primary:hover, .ant-btn-primary:focus{
    background-color: ${(props: IStyledProps) => props.mainColor};
    border-color: ${(props: IStyledProps) => props.mainColor};  
  }
  .ant-input:hover,.ant-input:focus,.ant-input-number:hover,.ant-input-number-focused{
    border-color: ${(props: IStyledProps) => props.mainColor} !important;  
    box-shadow: 0 0 0 2px  #fff !important;  
  }
  .ant-switch-checked{
    background-color: ${(props: IStyledProps) => props.mainColor};
  }
  .ant-radio-button-wrapper:hover, .ant-radio-button-wrapper-focused{
     color: ${(props: IStyledProps) => props.mainColor};  
  }
  .ant-radio-button-wrapper-checked{
     color: ${(props: IStyledProps) => props.mainColor};  
     border-color: ${(props: IStyledProps) => props.mainColor} !important;  
  }
`;

