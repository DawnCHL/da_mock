# Mock 平台

## 开发工具
* node.js v6.2.0
* koa.js v2.2.0
* mongodb 

##准备
在项目下打开终端输入
```
npm i
```
安装依赖

##启动
#打开数据库
1.在mongodb下创建data文件夹
2.在mongodb的bin文件夹打开终端，输入
```
./mongod --dbpath ../data/
```
#启动项目
在项目下打开终端输入
```
npm start
```
会自动编译代码并启动
