### git 配置命令

```
git config --list // 当前配置

git config --local --list // repository配置

git config --global --list // 全局配置

git config --global user.name "your name" // 配置用户名

git config --global user.email "your email" // 配置邮箱
```

### 分支管理

```
git branch // 查看本地分支

git branch -r // 查看远程分支

git branch -a // 查看所有分支

git branch -v // 查看各个分支最后一个提交对象的信息

git checkout <branch-name> // 切换到其他分支

git checkout -b <branch-name> // 创建并切换到新建分支

git branch -d <branch-name> // 删除分支

git branch -m <oldbranch-name> <newbranch-name>  // 重命名分支

git merge <branch-name> // 当前分支与指定分支合并

git checkout -b 本地分支名x origin/远程分支名x  // 拉取远程分支并创建本地分支
```

### 文件暂存

```
git stash save -a “message” // 暂存文件

git stash list // 当前暂存的所有记录

git stash clear // 清除所有暂存

git stash pop // 应用暂存
```

### 回滚

```
git reset --hard <commit id> // 回滚到指定提交
```

### rebase

### cherry-pick

将某一个或多个提交从一个分支复制到其它分支

```
git cherry-pick commit1 commit2 // pick多个commit
git cherry-pick commit1^..commit2 // pick commit1 , commit2区间的所有commit(包含commit1,commit2)

git cherry-pick --continue
git cherry-pick --abort
```

### reflog

reset --soft 是后悔药，那 reflog 就是强力后悔药。它记录了所有的 commit 操作记录，便于错误操作后找回记录
