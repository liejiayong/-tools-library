# Pixijs

## PIXI.loader

在实际开发过程中，PIXI.loader.add().load()是一个同步事件， 但是在实际过程中，尤其在ios端上或许会出现玄学般不能获取材质的情况。在多次测试排查后发现，这或许归根于ios端的快速存储技术与快速读取有关，当速度太快时，刚生成的材质或许仍未及时获取到数据，当下一步的程序运行起来，如果步骤是生成即时图片，那么有时候生成的图片带来误差。解决办法是，如果存在即时PIXI.loader.add().load()的材质，加个定时20ms延迟生成图片即可解决问题。
