import React, { useCallback } from 'react';
import { Button } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import { StyledContainer } from './styles';
import { ISubProps } from './subs';

export interface IPropsEditorEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface IPropsEditorStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IPropsEditorTheme extends IBaseTheme {
  main: string;
}

export interface IPropsEditorProps
  extends IPropsEditorEvent,
  ISubProps,
  IBaseComponentProps {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;
}

export const DEFAULT_PROPS: IPropsEditorProps = {
  visible: true,
  theme: {
    main: '#25ab68'
  },
  styles: {
    container: {}
  }
};

export const PropsEditorCurrying: TComponentCurrying<
  IPropsEditorProps,
  ISubProps
> = subComponents => props => {
  const { 
    visible, text, styles, onClick } = props;
  


  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
    },
    [onClick]
  );

  return (
    <StyledContainer
      style={styles.container}
      visible={visible}
      // ref={this.root}
      className="ide-props-editor-container"
    >
      <Button onClick={onClickButton}>{text || '点我试试'}</Button>
    </StyledContainer>
  );
};
