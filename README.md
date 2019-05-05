## 概览

ide-props-editor 是 gourd 的属性编辑器，具有很强的扩展性，可以根据实际业务场景定制任何类型的属性编辑器。

![https://img.alicdn.com/tfs/TB1pMIeUhTpK1RjSZFKXXa2wXXa-299-502.png](https://img.alicdn.com/tfs/TB1pMIeUhTpK1RjSZFKXXa2wXXa-299-502.png)

ide-props-editor 目前内置的编辑器列表：

type | 类 | 用途
--|:--:|--:
string| StringEditor | 字符串编辑器（渲染成输入框）
enum| EnumEditor | 枚举编辑器（渲染成选择框或单选框）
boolean| BooleanEditor | 逻辑类型编辑器（渲染成开关）
id| IdEditor | id类型编辑器（渲染成输入框，可复制，保证唯一性）
number| NumberEditor | 数值类型编辑器（渲染成数值输入框）
function| FunctionEditor | 函数类型编辑器（只调用 gourd 的葫芦面板，不自己渲染）
array| ArrayEditor | 数组类型编辑器（会渲染一个表单表格）
object| ObjectEditor | 对象类型编辑器（会再渲染一个子属性编辑器）

## 安装使用

npm 包方式：
```shell
npm install --save ide-props-editor
```

web 方式：
```html
<script src="https://unpkg.com/ide-props-editor@0.1.0/dist/index.umd.js"></script>
```
引入之后将会暴露全局变量 `idePropsEditor`.

> 如果你想要在 webpack 中 external 该库，可以使用以下配置：
```js
{
    externals: {
        "ide-props-editor": {
            "commonjs": "ide-props-editor",
            "commonjs2": "ide-props-editor",
            "amd": "ide-props-editor",
            "root": "idePropsEditor"
        }
    }
}
```

## 用法

```js

import {PropsEditor, IPropsEditorProps, schemaType} from 'ide-props-editor';

```

输入源是标准的 schema （详细语义请看 gourd 的 schema 规范）：


```js

const schema: schemaType = {
  "group": [
    {
      "name": "base",
      "defaultOpen": true,
      "title": "基础属性",
      "properties": ["key", "children", "size", "loading", "shap", "width", "dataSource", "labelProp"]
    },
    {
      "name": "event",
      "defaultOpen": true,
      "title": "事件",
      "properties": ["onChange"]
    }
  ],
  "properties": {
    "key": {
      "type": "id",
      "title": "唯一 id",
      "prefix": "$Button_"
    },
    "children": {
      "type": "string",
      "title": "文案"
    },
    "size": {
      "type": "enum",
      "title": "大小",
      "enum": ["small", "medium", "large"]
    },
    "shap": {
      "type": "enum",
      "title": "形状",
      "enum": ["small", "large"]
    },
    "loading": {
      "type": "boolean",
      "title": "载入状态"
    },
    "width": {
      "type": "number",
      "title": "宽度"
    },
    "dataSource": {
      "type": "array",
      "title": "数据源",
      "items": {
        "type": "object",
        "properties": {
          "label": {
            "title": "文本",
            "type": "string"
          },
          "value": {
            "title": "值",
            "type": "string"
          }
        }
      }
    },
    "labelProp": {
      "type": "object",
      "title": "对象属性",
      "properties": {
        "children": {
          "type": "string",
          "title": "文案"
        },
        "size": {
          "type": "enum",
          "title": "大小",
          "enum": ["small", "medium", "large"]
        }
      }
    },
    "onChange": {
      "type": "function",
      "title": "值改变后"
    }
  }
};
```

可以配置已经存在的属性值：

```js

const formData = {
  "children": "按钮测试",
  "loading": true,
  "size": "$store.$Button_999.children",
  "dataSource": [
    {"value": "value1", "label": "label1"},
    {"value": "value2", "label": "label2"},
    {"value": "value3", "label": "label3"}
  ],
  "key": "$Button_999"
};

```

（非必须）配置 mbox 的 store 对象，用于变量输入框的自动提示

```js

const $store = {
  $Button_999: {
    "children": "按钮测试",
    "loading": true,
    "size": "medium",
    "key": "$Button_999"
  },
  "a": {
    "loading": false
  }
};

```

（非必须）可以挂载或覆盖自定义的编辑器

```js

function useEditor(propSchema: any, editors: any): any {
  const {type} = propSchema;
  let Editor;
  
  if(type === 'abc'){
    return (<div>自定义的编辑器</div>);
  }
  
  return null;
}

```

配置组件属性：

```js

const props: IPropsEditorProps = {
  visible: true,
  schema: schema,
  formData: formData,
  useEditor: useEditor,
  editorExtraParam: {
    key: 'key',
    //用于 id 是否唯一的判断
    keys: ["$Button_123"],
    $store: $store,
    clientFnSets: clientFnSets,
    fnNameRule: '__$comId_$fnName'
  }
};

```

初始化组件：


```js

  const handleChange = useCallback((ev: any) => {
    console.log(ev.formData);
  }, []);

<PropsEditor {...props} onChange={handleChange}/>

```

## 如何本地开发？

### 本地调试

首先从 git 仓库拉取代码，安装依赖项：
```shell
git clone git@github.com:one-gourd/ide-props-editor.git

npm install

## 安装 peerDependencies 依赖包
npm install ide-lib-utils@0.x ide-lib-base-component@0.x ide-lib-engine@0.x ette@0.x ide-function-sets@0.x ette-proxy@0.x ette-router@0.x antd@3.x mobx@4.x mobx-react@5.x mobx-react-lite@1.x mobx-state-tree@3.10.x react@16.x styled-components@4.x.x react-dom@16.x
```

运行以下命令后，访问 demo 地址： http://localhost:9000
```shell
npm run dev
```

也可访问 [storybook](https://github.com/storybooks/storybook) 参考具体的使用案例：http://localhost:9001/
```shell
npm run storybook
```

### 运行测试用例

使用 [jest](https://jestjs.io) 进行测试，执行：

```shell
npm test
```


