# README

## 上传协议
客户端可通过`multipart/form-data`一次POST JSON数据和任意个(最多10个)附件和任意个(最多10个)日志文件到服务器。
```
curl -X POST http://xxx.xxx.xx.xxx:3000/crashreport
    -H 'cache-control: no-cache' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'metadata={"anykey": "anyvalue"}' \
    -F 'logfiles=@xxx.logfile0' \
    -F 'attachments=@attachment.file0' \
    -F 'attachments=@attachement.file1' \
    -F 'logfiles=@xxx.logfile1'
```
## Graphql
[Graphql Tutorial](https://blog.apollographql.com/tutorial-building-a-graphql-server-cddaa023c035)

## 使用 nodemon 在修改源码后自动加载
1. 全局安装 `nodemon`，使 `nodemon` 命令可以全局使用， `npm install nodemon -g`
2. 使用 `nodemon` 命令代替 `node` 启动脚本。
