/**
 * Game 
 */
var Game = (function () {
    var Browser = Laya.Browser,
        WebGL = Laya.WebGL,
        Stage = Laya.Stage,
        Sprite = Laya.Sprite,
        Stat = Laya.Stat;
        Handler = Laya.Handler;
    var clientHeight = Browser.clientHeight,
        clientWidth = Browser.clientWidth,
        lineSpace = 50;

    function Game () {
        // 自动布满整个屏幕，优先使用webgl进行布局
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        // 画背景和网线
        this.drawBg();
        // 开启帧率统计
        Stat.show(0, 0);
        // 加载资源
        Laya.loader.load('res/atlas/egg.json', Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);   
    }
    // 监听图片加载完成
    Game.prototype.onLoaded = function (e) {
        // 创建一个主角
        this.hero = new Role();
        // 设置主角位置
        this.hero.pos(300, 400);
        // 把角色加入到舞台中
        Laya.stage.addChild(this.hero);
        // 监听舞台的鼠标移动事件
        Laya.stage.on('mousemove', this, this.onMouseMove);
    };
    // 监听鼠标移动
    Game.prototype.onMouseMove = function (e) {
        // 始终保持影响和鼠标位置一致
        // console.log(Laya.stage.mouseX, Laya.stage.mouseY);
        // console.log(this.hero.x + this.hero.pivotX, this.hero.y + this.hero.pivotY)
        var pivotX = this.hero.x + this.hero.pivotX;
        var pivotY = this.hero.y + this.hero.pivotY
        var rotate = util.angle({x: pivotX, y: pivotY}, {x: Laya.stage.mouseX, y: Laya.stage.mouseY});
        console.log(rotate)
        this.hero.rotation = rotate - 180;
    };
    // 绘制背景
    Game.prototype.drawBg = function() {
        // 定义对齐方式
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;// 垂直居中
        Laya.stage.alignH = Stage.ALIGN_CENTER;// 水平居中
        // 缩放
        Laya.stage.scaleMode = 'showall';
        // 定义舞台颜色
        Laya.stage.bgColor = '#3a3852';

        var bgLine = new Sprite();
        Laya.stage.addChild(bgLine);

        // 画线
        for (var i = 0; i * lineSpace < clientHeight; i++) {
            bgLine.graphics.drawLine(0, i * lineSpace + 5, clientWidth, i * lineSpace + 5, '#3e3b56', 2);
        }
        for (var i = 0; i * lineSpace < clientWidth; i++) {
            bgLine.graphics.drawLine(i * lineSpace + 5, 0, i * lineSpace + 5, clientHeight, '#3e3b56', 2);
        }
    };
    return Game;
})();

// 启动游戏
new Game();

// 继承
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 工具
var util = {
    //根据坐标求角度 angle({x: 0, y: 0}, {x: 1,y: 1})
    angle: function (start, end) {
        var diff_x = end.x - start.x,
            diff_y = end.y - start.y;
        //返回角度,不是弧度
        return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }
}