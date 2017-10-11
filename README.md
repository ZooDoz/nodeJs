# nodeJs
这是学习nodejs的一个demo

1.nodeJs应该作为一个用户和硬服务之间的中间服务
用户将核心服务注册到nodeJs服务中，nodeJs服务立即返回响应
然后将核心服务交与硬服务的逻辑服务器，当核心服务执行完后，再响应用户的服务

user------->nodeJs
  |           |
  |           |
  |  response |       call
  |<----------|---------------->service
              |                    |
              |      response      |
    websocket |<-------------------|
  |<----------|
可以等待异步结束返回结果
也可以立即返回结果，真正结果后台处理
如果是websocket可以在后续回调中推送


2.http和websocket协议
http                 无状态
websocket            socket连接
有必要区分逻辑使用的协议

3.nodeJs可以快速开发一些简单的微服务
