# 高阶组件 HOC

## 什么是高阶组件

> 高阶函数是一个将函数作为参数，返回新函数的函数，高阶组件其实就是把组件作为参数，返回新的组件的组件

高阶组件的根本作用就是解决代码逻辑复用的问题

## 高阶组件的两种形式

### 属性代理

```
function proxyHOC(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

优点：

1. 属性代理可以和业务组件低耦合
2. 同样适用于类组件和函数组件
3. 可以完全隔离业务组件的渲染，因为属性代理说白了是一个新的组件，相比反向继承，可以完全控制业务组件是否渲染
4. 可以嵌套使用，多个 HOC 是可以嵌套使用的，而且一般不会限制包装 HOC 的先后顺序。

缺点：

1. 一般无法直接获取原始组件的状态，如果想要获取，需要 ref 获取组件实例。
2. 无法直接继承静态属性。如果需要继承需要手动处理，或者引入第三方库。
3. 因为本质上是产生了一个新组件，所以需要配合 forwardRef 来转发 ref。

### 反向继承

反向继承和属性代理有一定的区别，在于包装后的组件继承了原始组件本身，所以此时无须再去挂载业务组件。

```
class Index extends React.Component{
  render(){
    return <div> hello,world  </div>
  }
}
function HOC(Component){
    return class wrapComponent extends Component{ /* 直接继承需要包装的组件 */

    }
}
export default HOC(Index)

```

优点：

1. 方便获取组件内部状态，比如 state ，props ，生命周期，绑定的事件函数等
2. es6 继承可以良好继承静态属性。所以无须对静态属性和方法进行额外的处理

缺点：

1. 函数组件无法使用
2. 和被包装的组件耦合度高，需要知道被包装的原始组件的内部状态，具体做了些什么
3. 如果多个反向继承 hoc 嵌套在一起，当前状态会覆盖上一个状态。这样带来的隐患是非常大的，比如说有多个 componentDidMount，当前 componentDidMount 会覆盖上一个 componentDidMount。这样副作用串联起来，影响很大

## 高阶组件实现权限拦截

```
// 注入权限
export const Permission = React.createContext([])

export default function Index(){
    const [ rootPermission , setRootPermission ] = React.useState([])
    React.useEffect(()=>{
        /* 获取权限列表 */
        getRootPermission().then(res=>{
            const { code , data } = res as any
            code === 200 && setRootPermission(data) //  [ 'docList'  , 'tagList' ]
        })
    },[])
    return <Permission.Provider value={rootPermission} >
         <RootRouter/>
    </Permission.Provider>
}

// HOC 编写
/* 没有权限 */
function NoPermission (){
    return <div>您暂时没有权限，请联系管理员开通权限！</div>
}
/* 编写HOC */
export function PermissionHoc(authorization){
    return function(Component){
        return function Home (props){
            const matchPermission =(value,list)=> list.indexOf(value) /* 匹配权限 */
            return <Permission.Consumer>
                {
                    (permissionList) => matchPermission(authorization,permissionList) >= 0 ? <Component  {...props} /> : <NoPermission />
                }
            </Permission.Consumer>
        }
    }
}

// 绑定权限
@PermissionHoc('writeDoc')
export default class Index extends React.Component{} // 类组件


export default PermissionHoc('writeTag')(index) //函数组件
```
