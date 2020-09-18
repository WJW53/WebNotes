#  audio&video

1. **audio,video标签几乎所有的方法和属性都一样**

2. 加上controls属性,就是有默认控制栏

3. **只有视频内容的http协议带有 Content-Range 属性时,我们才能设置时间进行跳转**
比如.mov视频就没有这个属性,所以要写个新的服务器文件

4. video.playbackRate这个属性是视频的倍速

5. video.volume ∈ [0,1],就是声音大小