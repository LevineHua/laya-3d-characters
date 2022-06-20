
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

		Laya.loader.create([
			"res/LuomoRig/SampleScene.lh",
			"res/LuomoRig/Assets/bottom_albedo.png",
			"res/LuomoRig/Assets/eyebrow_albedo.png",
			"res/LuomoRig/Assets/eyelash_albedo.png",
			"res/LuomoRig/Assets/eyes_l_albedo.png",
			"res/LuomoRig/Assets/eyes_r_albedo.png",
			"res/LuomoRig/Assets/face_albedo.png",
			"res/LuomoRig/Assets/foot_albedo.png",
			"res/LuomoRig/Assets/top_albedo.png",
			"res/LuomoRig/Assets/bottom_normal.png"
		], Laya.Handler.create(this, function() {
			let dude = scene.addChild(Laya.loader.getRes('res/LuomoRig/SampleScene.lh'))
			//缩放
			let scale = new Laya.Vector3(1, 1, 1);
			dude.transform.localScale = scale;
			dude.transform.translate(new Laya.Vector3(1.3, -0.3, -2));
			dude.transform.rotate(new Laya.Vector3(3.3, 3.5, 3.3));
			console.log(scene);
			// 获取精灵
			var Luomo_rig = scene.getChildAt(2)
			var geo = Luomo_rig.getChildAt(0).getChildAt(0)
			console.log(geo._children);
			var geoChildren = geo._children
			// 遍历身体部分
			geoChildren.forEach(element => {
				//获取新的纹理
				var pbrTexture = Laya.Loader.getRes("res/LuomoRig/Assets/"+ element.name +"_albedo.png");
				console.log(pbrTexture);
				if (pbrTexture) {
					//创建一个新的PBRStandard材质
					let newPbrStandardMaterial = new Laya.PBRStandardMaterial();
					
					//为PBRStandard材质设置漫反射贴图
					newPbrStandardMaterial.albedoTexture = pbrTexture;

					// 贴上下部皮肤
					element.skinnedMeshRenderer.material = newPbrStandardMaterial
				}
			});

			// 身体下部分
			let bottom = geo.getChildAt(0)

			// 获取精灵自带的 PBRStandardMaterial 材质
			let PBRStandardMaterial = bottom.skinnedMeshRenderer.material;
			console.log(PBRStandardMaterial);
			//创建一个新的PBRStandard材质
			let newPbrStandardMaterial = new Laya.PBRStandardMaterial();
			//获取新的纹理
			let pbrTexture = Laya.Loader.getRes("res/LuomoRig/Assets/bottom_normal.png");
			console.log(pbrTexture);
			//为PBRStandard材质设置漫反射贴图
			newPbrStandardMaterial.albedoTexture = pbrTexture;

			this.loadUI(bottom, newPbrStandardMaterial)
		}))
	}

	loadUI(bottom, newPbrStandardMaterial) {
		Laya.loader.load(["res/button.png"], Laya.Handler.create(this, function() {
			var changeActionButton = Laya.stage.addChild(new Laya.Button("res/button.png", "换裤子"))
			changeActionButton.size(160, 40);
			changeActionButton.labelBold = true;
			changeActionButton.labelSize = 30;
			changeActionButton.sizeGrid = "4,4,4,4";
			changeActionButton.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
			changeActionButton.pos(Laya.stage.width / 2 - changeActionButton.width * Laya.Browser.pixelRatio / 2, Laya.stage.height - 100 * Laya.Browser.pixelRatio);
			changeActionButton.on(Laya.Event.CLICK, this, function() {
				console.log(bottom);
				// 贴上下部皮肤
				bottom.skinnedMeshRenderer.material = newPbrStandardMaterial
			});
		}))
	}
}

