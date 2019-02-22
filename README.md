# create-miniprogram

小程序开发相关命令行工具，目前支持以下几种模板：

* 第三方自定义组件（custom-component）
* 小程序 quickstart（miniprogram）
* 小程序插件 quickstart（plugin）
* 小游戏 quickstart（game）
* [x] typescript模板
* [x] github 创建

## 从git模板新建

```
npm init miniprogram template [dirPath] --repo=仓库地址
```
example : `npm init miniprogram template --repo=NewFuture/miniprogram-template`
example : `npm init miniprogram template --repo=https://github.com/NewFuture/miniprogram-template`

支持 GitHub,Gitlab和bitbucket

| option | 描述 |
|---|---|
| -r, --repo | git地址 [type:]owner/repository[#branch] 或者直接粘贴URL  |
| -f, --force | 强制初始化项目，可能会覆盖掉目录中已存在的项目 |
| -p, --proxy | 下载/更新模板时的请求代理 |
| -n, --newest | 使用线上最新的模板进行项目的初始化 |


## 新建官方js模板

```
npm init miniprogram new
```

根据模板来进行项目的初始化

支持 options 如下：

| option | 描述 |
|---|---|
| -t, --type | 项目的初始化所使用的模板 |
| -f, --force | 强制初始化项目，可能会覆盖掉目录中已存在的项目 |
| -p, --proxy | 下载/更新模板时的请求代理 |
| -n, --newest | 使用线上最新的模板进行项目的初始化 |

## 升级

```
npm init miniprogram upgrade [options] [dirPath]
```

根据最新模板对已有项目进行升级。目前仅支持**自定义组件**项目。

支持 options 如下：

| option | 描述 |
|---|---|
| -f, --force | 强制升级项目，会覆盖掉原有项目中的构建相关文件 |
| -p, --proxy | 下载/更新模板时的请求代理 |

## 缓存

```
npm init miniprogram cache [options]
```

显示缓存目录。

支持 options 如下：

| option | 描述 |
|---|---|
| -c, --clear | 清空缓存的模板 |
