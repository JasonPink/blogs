### github action 自动部署前端项目

- 在 github setting 中添加所需使用的服务器配置信息
  - 这个的目的是为了保证隐私，防止服务器配置暴露，配置后我们可以通过 secrets.xxx 的形式读取到我们的配置信息
  - 这里我们添加了 SSH_HOST、SSH_USERNAME、SSH_PASSWORD 三个变量，编写脚本的时候会使用到
- 在项目根目录里的.github/workflows 文件夹上新建 deploy.yml
  - 触发 workflows 时机配置成 main 分支 push 的时机
  - 依次执行 steps

```
# 工作流名称
name: Deploy to Server
# 指定此工作流程的触发事件Event：main分支存在push动作即触发
on:
  push:
    branches:
      - main

jobs:
  # job名称
  build-and-deploy:
    # 指定该Job在最新版本的 Ubuntu Linux 的 Runner(运行器)上运行
    runs-on: ubuntu-latest

    steps:
      - name: 拉取代码
        uses: actions/checkout@v2

      - name: 安装指定版本 Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name:
          Cache
          # 缓存命中结果会存储在steps.[id].outputs.cache-hit里，该变量在继后的step中可读
        id: cache-dependencies
        uses: actions/cache@v3
        with:
          # 缓存文件目录的路径
          path: |
            **/node_modules
          # key中定义缓存标志位的生成方式。runner.OS指当前环境的系统。外加对yarn.lock内容生成哈希码作为key值，如果yarn.lock改变则代表依赖有变化。
          # 这里用yarn.lock而不是package.json是因为package.json中还有version和description之类的描述项目但和依赖无关的属性
          key: ${{runner.OS}}-${{hashFiles('**/yarn.lock')}}

      - name: 安装依赖
        if: steps.cache-dependencies.outputs.cache-hit != 'true'
        run: yarn install

      - name: 打包项目
        run: yarn run build

      - name: 压缩dist目录
        run: cd dist && zip -r ../dist.zip ./*

      - name: 传输dist.zip到远程服务器
        uses: appleboy/scp-action@v0.1.5
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          source: "dist.zip"
          target: "/www/server/phpmyadmin"

      - name: 解压静态资源到指定目录
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          script: |
            cd /www/server/phpmyadmin
            rm -rf web
            unzip -o dist.zip -d web
            rm -rf dist.zip

            # 运行其他部署相关的命令，比如重启服务
            # e.g., pm2 restart your-app

```
