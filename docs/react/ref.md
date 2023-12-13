# ref 基本概念与使用

## ref 对象的创建

1. 类组件 React.createRef

```
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentDom = React.createRef(null);
  }
  componentDidMount() {
    console.log(this.currentDom);
  }
  render() {
    return <div ref={this.currentDom}>ref对象模式获取元素或组件</div>;
  }
}
```

2. 函数组件 useRef

```
export default function App() {
  const currentDom = React.useRef(null);
  React.useEffect(() => {
    console.log(currentDom.current); // div
  }, []);
  return <div ref={currentDom}>ref对象模式获取元素或组件2</div>;
}
```

### 函数组件为什么不能使用 createRef？

类组件有一个实例 instance 能够维护 ref 信息，但函数组件每次更新都会重新运行，所有变量重新声明。为了解决这个问题，hooks 和函数组件对应的 fiber 对象建立起关联，将 useRef 产生的 ref 对象挂到函数组件对应的 fiber 上，函数组件每次执行，只要组件不被销毁，函数组件对应的 fiber 对象一直存在，所以 ref 等信息就会被保存下来

## 类组件获取 Ref 三种方式

1. Ref 属性是一个字符串

```
<div ref="currentDom">字符串模式获取元素或组件</div>
<Children ref="currentComInstance"/>

console.log(this.refs)
```

2. Ref 属性是一个函数

```
<div ref={(node)=> this.currentDom = node}>Ref模式获取元素或组件</div>
<Children ref={(node) => this.currentComponentInstance = node}/>
```

3. Ref 属性是一个 ref 对象

```
currentDom = React.createRef(null)
currentComponentInstance = React.createRef(null)

<div ref={ this.currentDom }>Ref对象模式获取元素或组件</div>
<Children ref={ this.currentComponentInstance }/>
```

## ref 高阶用法

### forwardRef 转发 Ref

```
React.forwardRef((props,ref)=> <Component grandRef={ref}  {...props} />)
```

### 合并转发 ref

### 高阶组件转发

```
function HOC(Component){
  class Wrap extends React.Component{
     render(){
        const { forwardedRef ,...otherprops  } = this.props
        return <Component ref={forwardedRef}  {...otherprops}  />
     }
  }
  return  React.forwardRef((props,ref)=> <Wrap forwardedRef={ref} {...props} /> )
}
```
