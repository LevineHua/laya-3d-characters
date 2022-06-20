
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends Laya.Scene {
	constructor(){
		super();
		// this.rotation = new Laya.Vector3(0, 0.01, 0);

		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		Laya.Stat.show();

		let scene = Laya.stage.addChild(new Laya.Scene3D());
		let camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
		camera.transform.translate(new Laya.Vector3(0, 0.9, 1.5));
		camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		let directionLight = scene.addChild(new Laya.DirectionLight());
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
		directionLight.direction = new Laya.Vector3(1, -1, -1);

		Laya.Mesh.load("res/LuomoRig/SampleScene.lh", Laya.Handler.create(this, function(sp) {
			let layaMonkey = scene.addChild(new Laya.MeshSprite3D(sp));
			console.log(layaMonkey);
			//加载材质
			layaMonkey.meshRenderer.material = Laya.BlinnPhongMaterial.load("res/LuomoRig/Assets/Luomo_rig.lmat", Laya.Handler.create(this, function(mat) {
				layaMonkey.meshRenderer.material = mat
			}));
			layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
			layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
			Laya.timer.frameLoop(1, this, this.rotateSprite3D);
		}));
	}

	loadSprite3D(sp){
			
	}

	rotateSprite3D(){
			// this.layaMonkey.transform.rotate(this.rotation, false);
	}
}

