一个 class Component 实质上是一个定义了`render()`方法的类。定义类通常是为了使用实例。

- 首次渲染时会创建一个 `class Component` 的 Instance
- 每个 Instance 持有自己的状态，这个状态同样可用于 `render()`
- 一个 Instance 可以改变自己的状态 (`this.setState()`) 并导致自己被重新渲染


