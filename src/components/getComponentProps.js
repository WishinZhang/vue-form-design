import DynamicFormTestData from '../assets/data/dynamic-form-test-data.json';
import Props from '../assets/data/form-item-props.json';

export function getComponentProps() {
  return DynamicFormTestData;
}

export function handleComponentProps(data) {
  // 获取默认的组件属性列表，并根据传入的属性值构建一个新的属性列表
  let defaultProps = undefined;
  if (Props[data.type] === undefined) {
    console.error(`不存在 ${data.type} 类型的表单字段！`);
    return undefined;
  } else {
    defaultProps = JSON.parse(JSON.stringify(Props[data.type]));
  }
  for (const key in data) {
    if (defaultProps[key] !== undefined) {
      defaultProps[key] = data[key];
    }
  }
  // // 不同类型的表单要做不同的处理
  // switch (data.type) {
  //   case 'input':
  //     break;
  //   case 'textarea':
  //     if (data.minRows && data.maxRows) {
  //       data.autosize = {
  //         minRows: data.minRows,
  //         maxRows: data.maxRows
  //       };
  //     }
  //     break;
  //   case 'select':
  //     break;
  // }
  return defaultProps;
}
