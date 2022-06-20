
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
 export default class GameUI extends Laya.Scene {
	constructor() 
	{
		super();
		//初始化引擎
		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		//显示性能面板
		Laya.Stat.show();

		// this.scene = Laya.stage.addChild(new Laya.Scene3D())

		this._rotate1 = new Laya.Vector3(0.6, 0, 0);
		
		//预加载资源
		Laya.loader.create("res/luomo/Luomo_rig.lh", Laya.Handler.create(this, this.onComplete));

	}
	onComplete() {
		//记载场景
		var scene = Laya.stage.addChild(new Laya.Scene3D());
		//加载相机
		var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
		camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
		camera.transform.rotate(new Laya.Vector3(0.6, 0, 0), true, false);
		//创建平行光
		var directionLight = scene.addChild(new Laya.DirectionLight());
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
		//加载精灵
		var monkey = Laya.Loader.getRes("res/luomo/Luomo_rig.lh");
		//精灵添加脚本
		// monkey.addComponent(LuomoScript);
		let staticLuomo = scene.addChild(monkey);
		// 设置材质
		// monkey.meshRenderer.material = Laya.Loader.getRes("res/luomo/Assets/LayaAir3D/Luomo_rig.lmat")

		// 缩放
		// let scale = new Laya.Vector3(0.1, 0.1, 0.1);
		// monkey.transform.localScale = scale;
		// monkey.transform.rotate(new Laya.Vector3( 0, 3.14, 0));

		this._rotate1.setValue(0, 60, 0);
		// 设置定时器执行
		// Laya.timer.frameLoop(1, this, this.animate)
	}
	animate() {

	}
}

