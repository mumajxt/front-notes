# CSS 笔记

## 纯CSS手风琴效果

1. 使用 `max-height` 做动画
2. 使用**先快后慢**的动画曲线收回动画
```css
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1);
}
.content:hover {
  max-height: 999px;
  transition: max-height 1s ease-in-out;
}
```
