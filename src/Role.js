/**
 * 角色类
 */
var Role = (function (_super) {
    __extends(Role, _super);

    function Role () {
        _super.call(this);
        // 初始化
        this.init();
    }
    Role.prototype.init = function() {
        // 缓存蛋的样子
        Laya.Animation.createFrames(['egg/egg_1.png'], 'egg_1');
        Laya.Animation.createFrames(['egg/egg_2.png'], 'egg_2');
        Laya.Animation.createFrames(['egg/egg_3.png'], 'egg_3');
        // 创建一个动画作为主角的身体
        this.body = new Laya.Animation();
        this.addChild(this.body);
        //播放动画
        this.playAction('egg_1');
    };
    Role.prototype.playAction = function (action) {
        // 根据类型播放动画
        this.body.play(0, true, action);
        // 获取动画大小区域
        var bound = this.body.getBounds();
        console.log(bound)
        // 设置身体居中
        // this.body.pos(-bound.width / 2, -bound.height / 2);
        this.pivotX = bound.width / 2;
        this.pivotY = bound.height / 2;
        this.rotation -= 90;
    };
    return Role;
})(Laya.Sprite);