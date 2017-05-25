# Summary of mistakes in leaning webpack

# 1.文档的使用错误：
文档中说：“现在在此文件夹下带上以下参数运行 webpack，其中 index.js 是入口文件，bundle.js 是已打包所需的所有代码的输出文件。
./node_modules/.bin/webpack app/index.js dist/bundle.js”

我运行后出现了“webpack .../.bin/webpack Unexpected character '#' (1:0)”的error，删除./node_modules/.bin/webpack这一部分就解决了。
我推测是因为我全局安装了webpack，不必再加这一部分。


# 2.配置更新需要重启webpack

# 3.频繁的报各种错误：尝试删除node_modules文件夹，并重新cnpm install

# 4.当前目录必须必须必须必须必须加上'./'
# 学了个皮毛之后，发现并不知道有什么用？？？目前我还用不上啊...