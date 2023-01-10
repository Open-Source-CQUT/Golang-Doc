# Go编码规范

官方仓库：[uber-go/guide: The Uber Go Style Guide. (github.com)](https://github.com/uber-go/guide)

中文仓库：[xxjwxc/uber_go_guide_cn: Uber Go 语言编码规范中文版. The Uber Go Style Guide . (github.com)](https://github.com/xxjwxc/uber_go_guide_cn)

Go编码规范其**实并不是官方定义的规范**，而是一家名为Uber的美国硅谷科技公司编写的。Uber作为早期Go语言的实践者，积累了非常多的关于Go编程的经验，于是开源了Go语言规范，就跟Java里面的阿里巴巴手册一样，被很多团队视为了开发规范。虽然里面的内容是非常值得学习的，但在编码的时候代码始终是自己写的，具体解决方法需要结合具体情况而定，不要盲目的去遵守某一种规范或规定，反而被限制了思想。



## 准则

`guidelines`，英文里有参考和准则的意思，是针对Go的一些特性和技巧的建议。



### 指向`interface`的指针

在传递`interface`时，将接口作为值进行传递，这样在传递过程中，底层传递的数据仍然可以是指针。

接口在底层数据有两个[字段](https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-interface/#422-数据结构)：

- 类型指针，一个指向某些特定类型信息的指针
- 数据指针，如果存储的数据是指针，则直接存储。如果存储的是一个值，则存储指向该值的指针。

如果希望接口的方法修改结构体的基础数据，就必须显示式的使用指针。

```go
type Human interface {
   Shop(int, string)
}

type Man struct {
   Money int
   Items []string
}

func (m Man) Shop(num int, item string) {
   m.Money -= num
   m.Items = append(m.Items, item)
}

type Woman struct {
   Money int
   Items []string
}

func (w *Woman) Shop(num int, item string) {
   w.Money -= num
   w.Items = append(w.Items, item)
}

func TestShop(t *testing.T) {
   // 普通接收者
   man := Man{
      Money: 1000,
      Items: make([]string, 0),
   }
   fmt.Println(man)
   man.Shop(100, "phone")
   fmt.Println(man)

   // 指针接收者
   woman := Woman{
      Money: 1000,
      Items: make([]string, 0),
   }
   fmt.Println(woman)
   woman.Shop(2000, "dress")
   fmt.Println(woman)
}
```

为什么会发生这种情况，本文不会赘述，想要了解可以前往：[Go 语言接口的原理 | Go 语言设计与实现 (draveness.me)](https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-interface/#指针和接口)

## 性能

`performances`，这部分的内容是针对性能这一块的优化，如何写出性能更好的代码是这一部分探讨的内容。



## 风格

`styles`，这部分的内容是对于代码编写风格的建议。写出一段谁也读不懂的代码很容易，但是想要写出一段易于阅读，容易被他人理解的代码可一点也不简单，甚至可以说是十分困难。