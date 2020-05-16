# font-spider

用于压缩字体

特性：

- 压缩字体：智能删除没有被使用的字形数据，大幅度减少字体体积
- 生成字体：支持 woff2、woff、eot、svg 字体格式生成

# Usage

```shell

npm install -g font-spider

font-spider --ignore "icon\\.css$" dest/*.html

```
