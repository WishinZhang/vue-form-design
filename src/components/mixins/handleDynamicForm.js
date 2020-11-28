// 用于拖拽时动态添加表单项

const labelMap = {
  input: '输入框',
  textarea: '文本框',
  'input-number': '数字输入框',
  select: '输入框',
  radio: '单选框',
  checkbox: '多选框',
  datepicker: '日期选择器',
  timepicker: '时间选择器',
  switch: '开关',
  slider: '滑块'
};

/**
 * 校验组件类型，拖入的必须是指定类型的组件
 * @param {Object}} comp 组件数据
 */
function validateComp(comp) {
  if (['DynamicFormItem', 'FlexLayout', 'GridLayout', 'FormGroup'].indexOf(comp.compName) > -1) {
    return true;
  } else {
    console.warn(`DynamicForm组件只能插入DynamicFormItem、FlexLayout、GridLayout、FormGroup组件！`);
  }
}

export default function(data, context) {
  if (validateComp(data)) {
    // const name = getUUID();
    data.props.name = `${data.props.type}_${data.id}`;
    data.props.label = labelMap[data.props.type];
    context.addField(data.props);
  }
}
