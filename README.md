# Mock 平台(尚在开发中)

### 工具
* node.js v6.2.0
* koa.js v2.2.0
* vue v2.2.4 
* vue-router v2.3.0
* mongodb 

### 准备
在项目下打开终端输入
```
npm i
```
安装依赖

### 启动
#### 1.打开数据库
1.在mongodb下创建一个文件夹，用于存放数据。本项目中命名为data。

2.在mongodb的bin文件夹打开终端，输入
```
./mongod --dbpath ../data/
```
#### 2.启动项目
1.在项目下打开终端输入
```
gulp
```
gulp会编译前后端代码

2.然后再打开一个终端，输入
```
npm start
```
即可启动项目