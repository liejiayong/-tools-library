const recast = require("recast");

//  命令行文件读取
// recast.run( function(ast, printSource){
//   printSource(ast)
// })

// recast.visit —— AST节点遍历
recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function({node}) {
        console.log(node)
        return false
      }
    });
});

// TNT —— 判断AST对象类型
const TNT = recast.types.namedTypes

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function(path) {
        const node = path.value
        // 判断是否为ExpressionStatement，正确则输出一行字。
        if(TNT.ExpressionStatement.check(node)){
          console.log('这是一个ExpressionStatement')
        }
        this.traverse(path);
      }
    });
});