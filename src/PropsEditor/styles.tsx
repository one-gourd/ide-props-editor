import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IPropsEditorProps } from './index';

interface IStyledProps extends IPropsEditorProps, IBaseStyledProps {}

export const StyledContainer = styled.div.attrs({
  style: (props: any) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
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

