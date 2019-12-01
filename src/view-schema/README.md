# 视图描述语言说明

  主要参考vue的渲染函数，所有表述尽量贴合HTML的描述。

- 应用可能有多个页面，也有可能是单页面应用；
- 一个页面只有一个根节点，类型名称是 `root`；
- 每个视图节点包含 `type`、`props`、`attrs`、`domProps`、`on`、`nativeOn`、`children` 等等；

## type

  用于描述试图节点的名称，类似于HTML的标签名称，如 `body`、`div`、`ul`等等，节点可能是原生的HTML元素，也有可能是组件节点。如果是HTML节点，则描述的是标签名称，如果是组件节点，则描述的是组件名称。

## props

  组要用于描述组件节点的输入属性

## attrs 和 domProps

  attrs用于描述HTML的属性，domProps用于描述DOM属性

## on 和 nativeOn

  on用于描述组件的事件，nativeOn用于描述HTML原生事件

## children

  children用于描述视图节点的孩子节点
