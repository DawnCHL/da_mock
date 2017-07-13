# Mock 平台

## 工具
* node.js v6.2.0
* koa.js v2.2.0
* vue v2.2.4 
* vue-router v2.3.0
* mongodb 

## 准备
在项目下打开终端输入安装依赖
```
npm i
```

## 开发环境启动

#### 1.打开数据库

#### 2.启动项目
1.在项目下打开终端输入
```
gulp dev
```
gulp会编译前后端代码，并对改动监听

2.然后再打开一个终端，输入
```
npm run dev
```
即可启动项目


## 生产环境启动

#### 1.打开数据库

#### 2.启动项目
在项目下打开终端输入
```
npm start
```
即可启动项目

## Docker 环境

#### 1.打开数据库
docker 环境中启动需要有个运行 mongo 的 image， 运行时将该 container 命名，并在 config/production.js 中将数据库连接地址修改成 container 的名字。
```
docker run -p 27017:27017 -v /data:/data/db --name apiDB -d daocloud.io/mongo
```
#### 2.启动项目
先编译项目：
```
gulp
```
然后构建 da-mock 的 image。运行 image 时，需连接到 mongodb 的 container。
```
docker run -p 8194:8194 --name damock --link apiDB image_id
```
用这条命令启动，可在 localhost 中访问到运行在 docker 中的 da-mock。




#### >TODO<

1.前端的错误提示

2.数据库权限处理

3.mock带参数时的返回

4.加日志