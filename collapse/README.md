#对于这个插件，纠结了很久，最后还是决定写一个简单的，方便以后使用。对于兼容性，不兼容传说的浏览器哈 (* ^ _ ^ *)

##主要功能
1、支持点击收起-张开
2、支持点击张开所有
3、支持当前只能张开一栏
4、支持当前可以张开多栏

default 觉得够用了，不设置回调，哈哈
end

##options(参数配置)

参数	默认值	说明
collapseCls: '.collapse-item-content',
triggerCls: '.collapse-item-title[data-trigger="collapse"]',
activeCls: 'active',
defaultStyle: 'display:none',
triggerStyle: 'display:block',
mode: {
    //single: true,
    all: true
}
// mode可选方案：all、single，其中默认模式为all。当single和all都设为true时，single优先级最高