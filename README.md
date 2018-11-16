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