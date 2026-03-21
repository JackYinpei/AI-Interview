# React Hooks 深度解析：useEffect 的正确使用方式

`useEffect` 是 React 中功能最强大、也最容易被误用的 Hook。自从 React 16.8 引入 Hooks 以来，开发者们在使用 `useEffect` 时犯了无数类似的错误。本文将深入分析其工作原理，帮助你彻底掌握它。

## useEffect 的本质

`useEffect` 不是生命周期方法的替代品，它是一种**同步外部系统**的机制。

```javascript
useEffect(() => {
  // 这里是"副作用"逻辑
  // 与 React 渲染系统同步的外部操作
  
  return () => {
    // 清理函数：组件卸载或依赖变化前执行
  }
}, [dependencies]) // 依赖数组
```

## 常见错误与正确做法

### 错误一：无限循环

```javascript
// ❌ 错误：每次渲染都更新状态，导致无限循环
useEffect(() => {
  setCount(count + 1)
})

// ✅ 正确：使用函数式更新，并指定空依赖
useEffect(() => {
  setCount(prev => prev + 1)
}, []) // 只在挂载时执行一次
```

### 错误二：缺少依赖项

```javascript
// ❌ 错误：userId 变化时不会重新获取
useEffect(() => {
  fetchUser(userId).then(setUser)
}, []) // ESLint 会警告：userId 缺失

// ✅ 正确：声明所有依赖
useEffect(() => {
  fetchUser(userId).then(setUser)
}, [userId])
```

### 错误三：忽略清理函数

```javascript
// ❌ 错误：可能导致内存泄漏和 setState 警告
useEffect(() => {
  let cancelled = false
  
  fetchData().then(data => {
    setData(data) // 组件可能已卸载！
  })
})

// ✅ 正确：使用 cancel 标志
useEffect(() => {
  let cancelled = false
  
  fetchData().then(data => {
    if (!cancelled) setData(data)
  })
  
  return () => { cancelled = true }
}, [])
```

## 数据获取的正确方式

### 使用 AbortController

```javascript
useEffect(() => {
  const controller = new AbortController()
  
  async function fetchUser() {
    try {
      const response = await fetch(`/api/user/${id}`, {
        signal: controller.signal
      })
      const data = await response.json()
      setUser(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err)
      }
    }
  }
  
  fetchUser()
  
  return () => controller.abort()
}, [id])
```

## 性能优化：useMemo 和 useCallback

避免不必要的 `useEffect` 执行：

```javascript
// 对象和函数每次渲染都是新引用
const options = useMemo(() => ({ limit: 10, page }), [page])
const handleSubmit = useCallback((data) => {
  submitForm(data)
}, [submitForm])

useEffect(() => {
  fetchData(options)
}, [options]) // options 稳定，不会频繁触发
```

## React 18 的严格模式

React 18 在开发模式下会**故意执行两次 Effect**，以检测副作用的清理是否正确：

```
挂载 → Effect 执行 → 卸载（清理）→ 重新挂载 → Effect 再次执行
```

这意味着你的 Effect **必须是幂等的**，清理函数必须完整还原所有操作。

## 何时不需要 useEffect

React 团队建议，很多场景不需要 `useEffect`：

### 1. 派生状态（用计算替代）

```javascript
// ❌ 不必要的 useEffect
const [doubled, setDoubled] = useState(0)
useEffect(() => {
  setDoubled(count * 2)
}, [count])

// ✅ 直接计算
const doubled = count * 2
```

### 2. 用户事件处理

```javascript
// ❌ 不适合：用 Effect 响应用户操作
useEffect(() => {
  if (submitted) {
    submitForm(data)
  }
}, [submitted])

// ✅ 正确：在事件处理器中执行
function handleSubmit() {
  submitForm(data)
}
```

## 自定义 Hook 封装

将复杂的 Effect 逻辑封装为自定义 Hook：

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debouncedValue
}

// 使用
function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  
  useEffect(() => {
    if (debouncedQuery) search(debouncedQuery)
  }, [debouncedQuery])
}
```

## 总结

掌握 `useEffect` 的关键是理解：

1. **它是同步机制，不是生命周期**
2. **依赖数组必须诚实**，列出所有用到的响应式值
3. **清理函数必须完整**，还原所有副作用
4. **很多场景不需要 useEffect**，先考虑计算属性和事件处理

React 官方文档的"你可能不需要 useEffect"一节值得反复阅读。
