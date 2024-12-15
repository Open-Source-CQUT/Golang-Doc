# gg

官方仓库：[fogleman/gg: Go Graphics - 2D rendering in Go with a simple API. (github.com)](https://github.com/fogleman/gg)

官方文档：[gg package - github.com/fogleman/gg - Go Packages](https://pkg.go.dev/github.com/fogleman/gg)

官方示例：[gg/examples at master · fogleman/gg (github.com)](https://github.com/fogleman/gg/tree/master/examples)

gg是一个比较老牌的二维的图形渲染引擎，适合用于生成图片。

## 安装

```
go get -u github.com/fogleman/gg
```

## 快速开始

```go
package main

import "github.com/fogleman/gg"

func main() {
    dc := gg.NewContext(1000, 1000) //创建画布 高1000 宽1000
    dc.DrawCircle(500, 500, 400) // 在 (500,500)坐标位置绘制一个半径400的圆
    dc.SetRGB(0, 0, 0) // 设置颜色黑色
    dc.Fill() // 填充
    dc.SavePNG("out.png") // 保存到图片文件
}
```

## 描点

![](/images/gg/points.png =400x400)

```go
func TestDot(t *testing.T) {
   dc := gg.NewContext(1000, 1000)
   dc.SetRGB(0, 0, 0)
   for i := 1; i < 10; i++ {
      dc.DrawPoint(float64(50*i), float64(50*i), 5) // 设置点的坐标和半径
   }
   dc.Fill() // 填充
   dc.SavePNG("out.png")
}
```

## 画线

![](/images/gg/lines.png =400x400)

```go
func TestLines(t *testing.T) {
   dc := gg.NewContext(1000, 1000)
   dc.SetRGB(0, 0, 0)
   dc.SetLineWidth(5) // 设置线宽
   dc.DrawLine(1000, 0, 0, 1000)
   dc.DrawLine(1000, 1000, 0, 0)
   dc.Stroke() // 连线
   dc.SavePNG("lines.png")
}
```
