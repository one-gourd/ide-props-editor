import styled from 'styled-components';
// import { desaturate } from 'polished';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IPropsEditorProps } from './index';

interface IStyledProps extends IPropsEditorProps, IBaseStyledProps {}

export const StyledContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
`;

