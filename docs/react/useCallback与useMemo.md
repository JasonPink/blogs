# useCallback 与 useMemo

## useCallback

> 返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）

```
export default function App() {
  const [count2, setCount2] = useState(0);

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return <Button onClickButton={handleClickButton2}>Button2</Button>;
}

// Button.jsx
const Button = ({ onClickButton, children }) => {
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
    </>
  );
};

export default React.memo(Button);
```

Button 组件中的 memo 会对 props 进行一个浅比较，如果 props 没有发生改变，则不会重新渲染此组件

## useMemo

> 传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。

下面这段代码，只有当 count 发生变化的时候才会重新执行 useMemo 的第一个参数，返回一个新的对象从而触发子组件的渲染

```
const [count, setCount] = useState(0);

const userInfo = useMemo(() => {
  return {
    // ...
    name: "Jace",
    age: count
  };
}, [count]);

return <UserCard userInfo={userInfo}>
```

另外我们还可以将一些比较耗时，昂贵的计算逻辑放到 useMemo 中，只有当依赖值发生改变的时候才去更新

```
const num = useMemo(() => {
  let num = 0;
  // 这里使用 count 针对 num 做一些很复杂的计算，当 count 没改变的时候，组件重新渲染就会直接返回之前缓存的值。
  return num;
}, [count]);

return <div>{num}</div>
```

当我们通过 context 在组件之间共享数据时，通常会传递一个大的对象作为 value 属性。一般来说，将这个对象缓存起来是个好方法:

```
const AuthContext = React.createContext({});

function AuthProvider({ user, status, forgotPwLink, children }){
  const memoizedValue = React.useMemo(() => {
    return {
      user,
      status,
      forgotPwLink,
    };
  }, [user, status, forgotPwLink]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
```

useCallback 的用途与 useMemo 是相同的，但它是专门为函数构建的。我们直接给返回它一个函数，它会记住这个函数，在渲染之间线程化它。

```
React.useCallback(function helloWorld(){}, []);

// ...功能相当于:
React.useMemo(() => function helloWorld(){}, []);
```
