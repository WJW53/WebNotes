# type
```html
<cmp-button>默认按钮</cmp-button>
<cmp-button type="primary">主要按钮</cmp-button>
<cmp-button type="success">成功按钮</cmp-button>
<cmp-button type="info">信息按钮</cmp-button>
<cmp-button type="warning">信息按钮</cmp-button>
<cmp-button type="danger">危险按钮</cmp-button>
```
```css
.cmp-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.cmp-button--primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.cmp-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.cmp-button--success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

.cmp-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}

.cmp-button--info:hover {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #fff;
}

.cmp-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.cmp-button--warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}

.cmp-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.cmp-button--danger:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
```

# plain
```html
<cmp-button plain>朴素按钮</cmp-button>
<cmp-button type="primary" plain>主要按钮</cmp-button>
<cmp-button type="success" plain>成功按钮</cmp-button>
<cmp-button type="info" plain>信息按钮</cmp-button>
<cmp-button type="warning" plain>信息按钮</cmp-button>
<cmp-button type="danger" plain>危险按钮</cmp-button>
```
```css
.cmp-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.cmp-button--primary.is-plain:hover {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}

.cmp-button--success.is-plain {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}

.cmp-button--success.is-plain:hover {
  background: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.cmp-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}

.cmp-button--info.is-plain:hover {
  background: #909399;
  border-color: #909399;
  color: #fff;
}

.cmp-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}

.cmp-button--warning.is-plain:hover {
  background: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.cmp-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}

.cmp-button--danger.is-plain:hover {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
```

# round
```html
<cmp-button round>圆角按钮</cmp-button>
<cmp-button type="primary" round>主要按钮</cmp-button>
<cmp-button type="success" round>成功按钮</cmp-button>
<cmp-button type="info" round>信息按钮</cmp-button>
<cmp-button type="warning" round>警告按钮</cmp-button>
<cmp-button type="danger" round>危险按钮</cmp-button>
```
```css
.cmp-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
```

# circle
```html
<cmp-button circle></cmp-button>
<cmp-button type="primary" circle></cmp-button>
<cmp-button type="success" circle></cmp-button>
<cmp-button type="info" circle></cmp-button>
<cmp-button type="warning" circle></cmp-button>
<cmp-button type="danger" circle></cmp-button>
```
```css
.cmp-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
```

# disable default
```html
<cmp-button disabled>默认按钮</cmp-button>
<cmp-button type="primary" disabled>主要按钮</cmp-button>
<cmp-button type="success" disabled>成功按钮</cmp-button>
<cmp-button type="info" disabled>信息按钮</cmp-button>
<cmp-button type="warning" disabled>警告按钮</cmp-button>
<cmp-button type="danger" disabled>危险按钮</cmp-button>
```
```css
.cmp-button.is-disabled, 
.cmp-button.is-disabled:hover {
  color: #c0c4cc;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  cursor: not-allowed;
}

.cmp-button--primary.is-disabled, 
.cmp-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}

.cmp-button--success.is-disabled,
.cmp-button--success.is-disabled:hover {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}

.cmp-button--info.is-disabled,
.cmp-button--info.is-disabled:hover {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}

.cmp-button--warning.is-disabled,
.cmp-button--warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}

.cmp-button--danger.is-disabled,
.cmp-button--danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
```

# disable plain
```html
<cmp-button plain disabled>朴素按钮</cmp-button>
<cmp-button type="primary" plain disabled>主要按钮</cmp-button>
<cmp-button type="success" plain disabled>成功按钮</cmp-button>
<cmp-button type="info" plain disabled>信息按钮</cmp-button>
<cmp-button type="warning" plain disabled>警告按钮</cmp-button>
<cmp-button type="danger" plain disabled>危险按钮</cmp-button>
```
```css
.cmp-button.is-disabled.is-plain,
.cmp-button.is-disabled.is-plain:hover {
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}

.cmp-button--primary.is-plain.is-disabled,
.cmp-button--primary.is-plain.is-disabled:hover {
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}

.cmp-button--success.is-plain.is-disabled,
.cmp-button--success.is-plain.is-disabled:hover {
  color: #a4da89;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.cmp-button--info.is-plain.is-disabled,
.cmp-button--info.is-plain.is-disabled:hover {
  color: #bcbec2;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}

.cmp-button--warning.is-plain.is-disabled,
.cmp-button--warning.is-plain.is-disabled:hover {
  color: #f0c78a;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.cmp-button--danger.is-plain.is-disabled,
.cmp-button--danger.is-plain.is-disabled:hover {
  color: #f9a7a7;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
```

# type = text
```html
<cmp-button type="text">文字按钮</cmp-button>
<cmp-button type="text" disabled>文字按钮</cmp-button>
```
```css
.cmp-button--text {
  color: #409eff;
  background: transparent;
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
}
.cmp-button--text:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}

.cmp-button--text.is-disabled,
.cmp-button--text.is-disabled:hover {
  border-color: transparent;
}
```

# size default
```html
<h2>不同尺寸</h2>
<cmp-cmp-button>默认按钮</cmp-button>
<cmp-button size="medium">中等按钮</cmp-button>
<cmp-button size="small">小型按钮</cmp-button>
<cmp-button size="mini">超小按钮</cmp-button>
```
```css
.cmp-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.cmp-button--small {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.cmp-button--mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
```

# size round
```html
<cmp-button round>默认按钮</cmp-button>
<cmp-button size="medium" round>中等按钮</cmp-button>
<cmp-button size="small" round>小型按钮</cmp-button>
<cmp-button size="mini" round>超小按钮</cmp-cmp-button>
```
```css
.cmp-button--medium.is-round {
  padding: 10px 20px;
}

.cmp-button--small.is-round {
  padding: 9px 15px;
}
.cmp-button--mini.is-round {
  padding: 7px 15px;
}
```