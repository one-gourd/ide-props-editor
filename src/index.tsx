import { Instance } from 'mobx-state-tree';
import { initSuits } from 'ide-lib-engine';

export * from './PropsEditor/config';
export * from './PropsEditor/index';
export * from './PropsEditor/baseType';

import { PropsEditorCurrying } from './PropsEditor/index';
import { configPropsEditor } from './PropsEditor/config';

// 抽离子组件配置项
const subStoresModelMap = {} as any;
const subFactoryMap = {} as any;

const {
  ComponentModel: PropsEditorModel,
  NormalComponent: PropsEditor,
  ComponentHOC: PropsEditorHOC,
  ComponentAddStore: PropsEditorAddStore,
  ComponentFactory: PropsEditorFactory
} = initSuits({
  ComponentCurrying: PropsEditorCurrying,
  className: configPropsEditor.component.className,
  solution: configPropsEditor.component.solution,
  defaultProps: configPropsEditor.component.defaultProps,
  controlledKeys: configPropsEditor.model.controlledKeys,
  modelProps: configPropsEditor.model.props,
  subComponents: configPropsEditor.component.children,
  subStoresModelMap: subStoresModelMap,
  subFactoryMap: subFactoryMap,
  idPrefix: configPropsEditor.store.idPrefix,
  routerConfig: configPropsEditor.router
});

export {
  PropsEditorModel,
  PropsEditor,
  PropsEditorHOC,
  PropsEditorAddStore,
  PropsEditorFactory
};

export interface IPropsEditorModel extends Instance<typeof PropsEditorModel> {}
