import { schemaType } from '../src';
export const defaultSchema: schemaType = {
  group: [
    {
      name: 'base',
      defaultOpen: true,
      title: '基础属性',
      properties: [
        'key',
        'children',
        'size',
        'loading',
        'shap',
        'width',
        'dataSource',
        'labelProp'
      ]
    },
    {
      name: 'event',
      defaultOpen: true,
      title: '事件',
      properties: ['onChange', 'onMouseMove']
    }
  ],
  properties: {
    key: {
      type: 'id',
      title: '唯一 id',
      prefix: '$Button_'
    },
    children: {
      type: 'string',
      title: '文案'
    },
    size: {
      type: 'enum',
      title: '大小',
      enum: ['small', 'medium', 'large']
    },
    shap: {
      type: 'enum',
      title: '形状',
      enum: ['small', 'large']
    },
    loading: {
      type: 'boolean',
      title: '载入状态'
    },
    width: {
      type: 'number',
      title: '宽度'
    },
    dataSource: {
      type: 'array',
      title: '数据源',
      items: {
        type: 'object',
        properties: {
          label: {
            title: '文本',
            type: 'string'
          },
          value: {
            title: '值',
            type: 'string'
          }
        }
      }
    },
    labelProp: {
      type: 'object',
      title: '对象属性',
      properties: {
        children: {
          type: 'string',
          title: '文案'
        },
        size: {
          type: 'enum',
          title: '大小',
          enum: ['small', 'medium', 'large']
        }
      }
    },
    onChange: {
      type: 'function',
      title: '值改变后'
    },
    onMouseMove: {
      type: 'function',
      title: '鼠标滑动'
    }
  }
};

export const defaultFormData = {
  children: '按钮测试',
  loading: true,
  size: '$store.$Button_999.children',
  dataSource: [
    { value: 'value1', label: 'label1' },
    { value: 'value2', label: 'label2' },
    { value: 'value3', label: 'label3' }
  ],
  key: '$Button_999'
};

//mbox 的 store ，用于变量输入框的自动提示
export const defaultStore = {
  $Button_999: {
    children: '按钮测试',
    loading: true,
    size: 'medium',
    key: '$Button_999'
  },
  a: {
    loading: false
  }
};

export const secondProps = {
  formData: {
    key: '$Col_HJlwL',
    style: {
      marginBottom: ' 20px'
    }
  },
  schema: {
    properties: {
      key: {
        type: 'id',
        title: '唯一 id'
      },
      l: {
        type: 'any',
        comment: 'string | number | object',
        title: 'l'
      },
      m: {
        type: 'any',
        comment: 'string | number | object',
        title: 'm'
      },
      s: {
        type: 'any',
        comment: 'string | number | object',
        title: 's'
      },
      xl: {
        type: 'any',
        comment: 'string | number | object',
        title: 'xl'
      },
      xs: {
        type: 'any',
        comment: 'string | number | object',
        title: 'xs'
      },
      rtl: {
        type: 'boolean',
        title: 'rtl'
      },
      xxs: {
        type: 'any',
        comment: 'string | number | object',
        title: 'xxs'
      },
      pure: {
        type: 'boolean',
        title: 'pure'
      },
      span: {
        type: 'any',
        comment: 'string | number',
        title: 'span'
      },
      align: {
        enum: ['top', 'center', 'bottom', 'baseline', 'stretch'],
        type: 'enum',
        title: 'align'
      },
      hidden: {
        type: 'any',
        comment: 'boolean | string | array',
        title: 'hidden'
      },
      locale: {
        type: 'object',
        title: 'locale'
      },
      offset: {
        type: 'any',
        comment: 'string | number',
        title: 'offset'
      },
      prefix: {
        type: 'string',
        title: 'prefix'
      },
      children: {
        type: 'any',
        title: 'children'
      },
      className: {
        type: 'string',
        title: 'className'
      },
      component: {
        type: 'string',
        title: 'component'
      },
      fixedSpan: {
        type: 'any',
        comment: 'string | number',
        title: 'fixedSpan'
      },
      fixedOffset: {
        type: 'any',
        comment: 'string | number',
        title: 'fixedOffset'
      }
    }
  }
};
