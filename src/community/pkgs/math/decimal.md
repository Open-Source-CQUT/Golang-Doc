# decimal

仓库：[shopspring/decimal: Arbitrary-precision fixed-point decimal numbers in go (github.com)](https://github.com/shopspring/decimal)

文档：[decimal package - github.com/shopspring/decimal - Go Packages](https://pkg.go.dev/github.com/shopspring/decimal?utm_source=godoc)

## 简介

一个用 GO 编写的十进制浮点数工具库，具有以下特点：

- 零值为 0，不需要初始化即可安全使用
- 加法，减法，乘法，不会损失精度
- 以指定的精度除法
- 数据库/sql 序列化/反序列化
- JSON 和 XML 序列化/反序列化

## 安装

```
go get github.com/shopspring/decimal
```

## 快速开始

```go
package main

import (
  "fmt"
  "github.com/shopspring/decimal"
)

func main() {
  price, err := decimal.NewFromString("136.02")
  if err != nil {
    panic(err)
  }

  quantity := decimal.NewFromInt(3)

  fee, _ := decimal.NewFromString(".035")
  taxRate, _ := decimal.NewFromString(".08875")

  subtotal := price.Mul(quantity)

  preTax := subtotal.Mul(fee.Add(decimal.NewFromFloat(1)))

  total := preTax.Mul(taxRate.Add(decimal.NewFromFloat(1)))

  fmt.Println("Subtotal:", subtotal)                      // Subtotal: 408.06
  fmt.Println("Pre-tax:", preTax)                         // Pre-tax: 422.3421
  fmt.Println("Taxes:", total.Sub(preTax))                // Taxes: 37.482861375
  fmt.Println("Total:", total)                            // Total: 459.824961375
  fmt.Println("Tax rate:", total.Sub(preTax).Div(preTax)) // Tax rate: 0.08875
}
```
