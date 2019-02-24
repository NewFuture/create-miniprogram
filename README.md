# create-miniprogram
[![npm](https://img.shields.io/npm/v/create-miniprogram.svg)](https://www.npmjs.com/package/create-miniprogram)
[![Build Status](https://travis-ci.com/NewFuture/create-miniprogram.svg)](https://travis-ci.com/NewFuture/create-miniprogram)
[![Greenkeeper badge](https://badges.greenkeeper.io/NewFuture/create-miniprogram.svg)](https://greenkeeper.io/)

小程序开发相关命令行工具 兼容[miniprogram-cli](https://github.com/wechat-miniprogram/miniprogram-cli):

* **从任意git模板创建**
* 支持 **typescript模板**
* 自定义组件（custom-component）
* 小程序 quickstart（miniprogram）
* 小程序插件 quickstart（plugin）
* 小游戏 quickstart（game）

## 环境

* `node` >= `4.0.0`
* `npm` >= `6.0.0` 或者 `yarn`(下列命令中用`yarn`代替`npm`即可)

## Usage

`npm create miniprogram` 查看帮助信息

### 从git模板新建

```
npm create miniprogram 仓库地址 [dirPath]
```

* `repo`:  git地址, [type:]owner/repository[#branch] 或者直接粘贴URL ,支持 GitHub,Gitlab和bitbucket
* `dirPath`: 本地目录, 默认当前目录

examples:

* `npm create miniprogram NewFuture/miniprogram-template`
* `npm create miniprogram https://github.com/NewFuture/miniprogram-template`

| option | 描述 |
|---|---|
| -f, --force | 强制初始化项目，可能会覆盖掉目录中已存在的项目 |
| -p, --proxy | 下载/更新模板时的请求代理 |
| -n, --no-cache | 使用线上最新的模板进行项目的初始化 |


### 新建官方js模板

```
npm create miniprogram new
```

根据模板来进行项目的初始化

支持 options 如下：

| option | 描述 |
|---|---|
| -t, --type | 项目的初始化所使用的模板 |
| -f, --force | 强制初始化项目，可能会覆盖掉目录中已存在的项目 |
| -p, --proxy | 下载/更新模板时的请求代理 |
| -n, --no-cache | 使用线上最新的模板进行项目的初始化 |

### 升级

```
npm create miniprogram upgrade [options] [dirPath]
```

根据最新模板对已有项目进行升级。目前仅支持**自定义组件**项目。

支持 options 如下：

| option | 描述 |
|---|---|
| -f, --force | 强制升级项目，会覆盖掉原有项目中的构建相关文件 |
| -p, --proxy | 下载/更新模板时的请求代理 |

### 缓存管理

```
npm create miniprogram cache [options]
```

显示缓存目录。

支持 options 如下：

| option | 描述 |
|---|---|
| -c, --clear | 清空缓存的模板 |

### 全局安装

```
npm i create-miniprogram -g
create-miniprogram
```
