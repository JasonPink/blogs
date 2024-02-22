# Git 规范

## Git 分支命名规范

- master：主分支，负责记录上线版本的迭代，该分支代码与线上代码完全一致。分支受保护不允许删除、开发，只允许合并版本分支代码，限制 merge 和 push 权限
- version/develop: 版本迭代分支，总是从主分支创建，生命周期从版本开始到版本上线结束，不允许直接开发，只允许合并 feature 分支代码
- feature/\*: 功能开发分支，用于开发新的功能，不同的功能创建不同的功能分支。（强烈建议 feature 分支按功能粒度细化，本地可能同时存在多个 feature 分支并行开发，避免其中某个或者某些 feature 因为难以实现或延期不能随版本上线，从而可以延长生命周期到下个版本继续进行，或者因为实现错误，实验性质的 feature 导致中途抛弃）
- bugfix/\*：bug 修复分支，用于修复不紧急的 bug，普通 bug 均需要创建 bugfix 分支开发，开发完成自测没问题后合并到 develop 分支后，删除该分支。
- release/\*：发布分支，用于代码上线准备，该分支从 develop 分支创建，创建之后由测试同学发布到测试环境进行测试，测试过程中发现 bug 需要开发人员在该 release 分支上进行 bug 修复，所有 bug 修复完后，在上线之前，需要合并该 release 分支到 master 分支和 develop 分支。
- hotfix：生产 bug 修复分支，该分支只有紧急情况下使用，从 master 分支创建，用于紧急修复线上 bug。修复完毕后，部署到相应环境测试，测试通过后上线。上线完成立即删除，并同步到各个环境分支

## Git commit 规范

### 约定式提交

每次使用 git commit 的时候都需要写 commit message,如果 message style 是按照固定的模版格式书写，对于后期的维护和编写 changelog 都有巨大的好处。
而且现在的很多自动生成 changelog 的工具，都是建立在约定式提交的基础之上。交互式提交工具（例如： commitizen），使用工具能够保证约定式提交个格式是满足规范的

### 约定式提交格式校验

#### commitlint 校验约定式提交格式

为了防止出现不满足格式要求的 commit message 出现，还是需要添加上必要的格式校验.使用 commitlint

```js
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

#### husky 配置 git hooks

```
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" // 配合commitlint使用
      // "pre-commit": "lint-staged" // 配置lint-staged
    }
  }
}
```

#### lint-staged 配置

list-staged 主要配合 linter 用来格式化代码（统一的代码风格），这部是可选的。是用来让格式化工具只 lint 需要提交的文件，其它文件忽略，这样能够提高效率。

```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,ts,css,vue,tsx,jsx}": [
      //"vue-cli-service lint", 配合vue使用
      "eslint",
      "git add"
    ]
  }
}
```

#### 自动生成 changelog

自动生成 changelog 是建立在约定式提交的基础上。standard-version 做了自动打 tag，自动生成 changelog 等过程.

```
{
  "scripts": {
    "release": "standard-version",
    "release:first": "standard-version -r 1.0.0"
  },
  // standard-version 好多配置看官方文档（可选）
  "standard-version": {}
}
```

### 完整配置

```
{
  script: {
    ...,
    "commit": "git-cz",
    "release": "standard-version",
    "release:first": "standard-version -r 1.0.0"
  },
  devDependencies: {
    "@commitlint/cli": "^14.1.0",
    "@commitlint/config-conventional": "^14.1.0",
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0",
    "husky": "^4.3.8",(用最新版7，有点问题)
    "lint-staged": "^11.2.6",
    "standard-version": "^9.3.2",
  }
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{js,css,vue,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --cache --fix",
      "git add"
    ]
  },
  "standard-version": {}
}
```
