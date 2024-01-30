# Config

```yaml
kotori:
  extends: onebot
  master: 10001
  # 连接模式 可选: http ws ws-reverse 推荐首选ws-reverse
  mode: ws-reverse
  # address: "ws://127.0.0.1"
  # WebSocket反向(相对于Gocqhttp)
  # port: 8080 # WS反向端口
  # WebSocket正向
  address: ws://127.0.0.1 # WS地址
  port: 8088 # WS端口
  retry: 10 # 同上
  # Http正反向(暂未支持)
  # address: "http://localhost" # 正向Http地址
  # port: 8888 # 正向Http端口
  # reverse-port: 8080 # 反向Http端口
  # retry: 10 # 连接断开或失败时尝试重连间隔时间 单位:秒
```