#sinan platform
司南平台

## 技术栈
服务入口使用bucky，单项目结构

## client是前端项目

## 开发环境
前端项目端口： 8099
host: 127.0.0.1 platform.sinan.test.lianjia.com
首页url: http://platform.sinan.test.lianjia.com:4005
nginx 配置
```
...
server {
    listen       10108;
    server_name  platform.test.lianjia.com;
    # redirect server request
    location /web/ {
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  Host platform.test.lianjia.com;
        proxy_pass http://172.30.13.76:10108;
    }
    access_log  off;
    error_log  /dev/null;
}
...
```

## 测试环境

## 本地调试线上
 node env dev
 node env pro

先ctrl + F ```sysDomain: '//crm.test.lianjia.com:10118'```

把 ```// sysDomain: '//crm.ke.com',```放开

>记得和代码的时候改回来

执行 ```nproxy -l replace.js```