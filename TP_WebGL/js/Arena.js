Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
    this.game = game;
    var scene = game.scene;


    //EXEMPLE 
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    var cube = BABYLON.Mesh.CreateBox("cube", 10, scene, false);

    cube.position.y = 1;
	cube.checkCollisions = true;
	cube.showBoundingBox = true;

    this.game.scene.cube = cube;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype 
    //(à faire à chaque fois que vous comptez animer un mesh)

    var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);

    boxArena.scaling.y = 2;

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
	materialGround.alpha = 0.5;
    boxArena.material = materialGround;
	
	boxArena.checkCollisions = true;

    //LIRE LA DOC

    // LUMIERES 

/*    TODO :  -3 lumières différentes
              -couleurs et intensités*/
    
   //Ponctuelle
    var point_light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
    point_light.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    point_light.specular = new BABYLON.Color3(0.5, 0.5, 0.5);

    //Directionnelle
    var diffuse_light = new BABYLON.DirectionalLight("Dir1", new BABYLON.Vector3(-10, -0.25, 0), scene);
    diffuse_light.diffuse = new BABYLON.Color3(255, 69, 0);
    diffuse_light.specular = new BABYLON.Color3(255, 69, 0);

    //Spot
    var spot_light = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, -0.25, -1), new BABYLON.Vector3(0, 1, 0), Math.PI / 20, 50, scene);
	spot_light.diffuse = new BABYLON.Color3(0, 5, 5);
	spot_light.specular = new BABYLON.Color3(0, 5, 5);
    
    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */
	
	//Matériau standard (Boite)
	var materialBox = new BABYLON.StandardMaterial("BoxTexture", scene);
	materialBox.diffuseColor = new BABYLON.Color3(0, 0, 0.02);
	materialBox.specularColor = new BABYLON.Color3(0, 0, 0.87);
	materialBox.emissiveColor = new BABYLON.Color3(0, 0, 0.2);
	materialBox.ambientColor = new BABYLON.Color3(0, 0, 0.5);
	
	//Multi-matériaux (Sphere)
	
	var firstMat = new BABYLON.StandardMaterial("firstMat", scene);
	firstMat.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
	firstMat.diffuseTexture = new BABYLON.Texture("assets/pelouse.jpg",scene);
	
	var secondMat = new BABYLON.StandardMaterial("secondMat", scene);
	secondMat.diffuseColor = new BABYLON.Color3(0, 1, 1);
	
	var thirdMat = new BABYLON.StandardMaterial("thirdMat", scene);
	thirdMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	
	var multiMat = new BABYLON.MultiMaterial("multi", scene);
	multiMat.subMaterials.push(firstMat);
	multiMat.subMaterials.push(secondMat);
	multiMat.subMaterials.push(thirdMat);
	
	//Normal Map
	var normalMat = new BABYLON.StandardMaterial("normalMat", scene);
	normalMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	normalMat.bumpTexture = new BABYLON.Texture("assets/torusnm.jpg", scene);
	
	//Texture procedurale
	
	/*var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
    var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;
	cube.material = fireMaterial;*/
	
    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */
	
	
	
	//box
	var box = BABYLON.Mesh.CreateBox("Boîte", 5, scene);
	box.scaling.y = 1;
	box.position = new BABYLON.Vector3(-1, -97.5, 10);
	box.rotation.y = (Math.PI*45)/180;	
	box.material = materialBox; /*Assignation du matériau*/
	box.checkCollisions= true;
	
	//sphere
	var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 16, 10, scene);
	sphere1.position =  new BABYLON.Vector3(10, -70, -15);
	//Application du materiau
	sphere1.material = multiMat;
	sphere1.subMeshes = [];
	var verticesCount = sphere1.getTotalVertices();

	sphere1.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere1));
	sphere1.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere1));
	sphere1.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere1));
	
	var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 16, 10, scene);
	sphere2.position =  new BABYLON.Vector3(30, -70, -30);
	//Application du materiau
	sphere2.material = multiMat;
	sphere2.subMeshes = [];
	var verticesCount = sphere2.getTotalVertices();

	sphere2.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere2));
	sphere2.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere2));
	sphere2.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere2));
	
	var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 16, 10, scene);
	sphere3.position =  new BABYLON.Vector3(20, -70, -15);
	//Application du materiau
	sphere3.material = multiMat;
	sphere3.subMeshes = [];
	var verticesCount = sphere3.getTotalVertices();

	sphere3.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere3));
	sphere3.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere3));
	sphere3.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere3));
	
	var sphere4 = BABYLON.Mesh.CreateSphere("Sphere4", 16, 10, scene);
	sphere4.position =  new BABYLON.Vector3(40, -70, -40);
	//Application du materiau
	sphere4.material = multiMat;
	sphere4.subMeshes = [];
	var verticesCount = sphere4.getTotalVertices();

	sphere4.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere4));
	sphere4.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere4));
	sphere4.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere4));
	
	var sphere5 = BABYLON.Mesh.CreateSphere("Sphere5", 16, 10, scene);
	sphere5.position =  new BABYLON.Vector3(50, -70, -15);
	//Application du materiau
	sphere5.material = multiMat;
	sphere5.subMeshes = [];
	var verticesCount = sphere5.getTotalVertices();

	sphere5.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere5));
	sphere5.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere5));
	sphere5.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere5));
	
	//tore
	var torus = BABYLON.Mesh.CreateTorus("torus", 8, 2.5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
	torus.position = new BABYLON.Vector3(-25, -98.7, -15);
	torus.material = normalMat;
	torus.checkCollisions= true;
	
	//cylinder
	var cylinder = BABYLON.Mesh.CreateCylinder("Cylindre", 10, 5, 5, 20, 4, scene);
	cylinder.position = new BABYLON.Vector3(-25, -95, 10);
	cylinder.checkCollisions= true;
	//Video Texture
	var videoMat = new BABYLON.StandardMaterial("videoMat", scene);
	cylinder.material = videoMat;
	cylinder.material.diffuseTexture = new BABYLON.VideoTexture("video", ["assets/videoplayback.mp4"], scene, true);
	cylinder.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
	scene.onPointerDown = function () {
		videoTexture.video.play();
	}
	
	
	//Application des collisions
	//scene.collisionsEnabled = true;
  

    //AUDIO

    /*TODO : -sons d'ambiance
              -sons liés à des objets --> le son doit être localisé spatialement
    */
	
	//Son d'ambiance
	//var ambient_music = new BABYLON.Sound("Music", "assets/lait_de_coco.mp3", scene, null, { loop: true, autoplay: true });
    
	//Son lié à un objet
	/*var linked_music = new BABYLON.Sound("Coco", "assets/lait_de_coco.mp3", scene, null, { loop: true, autoplay: true });
	linked_music.attachToMesh(cylinder);*/
    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspondre les faces.
    */
	
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/cloud/CloudyLightRays", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
	
	/* ANIMATION */
	
	//scaling
	  var animationBox = new BABYLON.Animation("AnimBox", "scaling.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	  var boxKeys = [];
	  boxKeys.push({
		  frame: 0,
		  value: 1
	  });
	  boxKeys.push({
		  frame: 50,
		  value: 0.2
	 });
	  boxKeys.push({
		  frame: 100,
		  value: 1
	 });
	 animationBox.setKeys(boxKeys);
	 box.animations = [];
	 box.animations.push(animationBox);
	 scene.beginAnimation(box, 0, 1000, true);
	 
	 //rotation
	var animationBall = new BABYLON.Animation("AnimBall", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var ballKeys = []; 

    ballKeys.push({
        frame: 0,
        value: 0
    });

    ballKeys.push({
        frame: 30,
        value: Math.PI
    });

    ballKeys.push({
        frame: 60,
        value: 2 * Math.PI
    });
	
	animationBall.setKeys(ballKeys);
	sphere1.animations = [];
	sphere1.animations.push(animationBall);
	scene.beginAnimation(sphere1, 0, 1000, true);
	
	sphere2.animations = [];
	sphere2.animations.push(animationBall);
	scene.beginAnimation(sphere2, 0, 1000, true);
	
	sphere3.animations = [];
	sphere3.animations.push(animationBall);
	scene.beginAnimation(sphere3, 0, 1000, true);
	
	sphere4.animations = [];
	sphere4.animations.push(animationBall);
	scene.beginAnimation(sphere4, 0, 1000, true);
	
	sphere5.animations = [];
	sphere5.animations.push(animationBall);
	scene.beginAnimation(sphere5, 0, 1000, true);
	
	//translation
    var ballSlide1 = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keySlide1 = []; 

    keySlide1.push({
        frame: 0,
        value: 45
    });

    keySlide1.push({
        frame: 50,
        value: -45
    });

    keySlide1.push({
        frame: 100,
        value: 45
    });
	ballSlide1.setKeys(keySlide1);
	sphere1.animations.push(ballSlide1);
	scene.beginAnimation(sphere1, 0, 1000, true);
	
	var ballSlide2 = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keySlide2 = []; 

    keySlide2.push({
        frame: 5,
        value: 45
    });

    keySlide2.push({
        frame: 55,
        value: -45
    });

    keySlide2.push({
        frame: 100,
        value: 45
    });
	
	ballSlide2.setKeys(keySlide2);
	sphere3.animations.push(ballSlide2);
	scene.beginAnimation(sphere3, 0, 1000, true);
	
	var ballSlide3 = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keySlide3 = []; 

    keySlide3.push({
        frame: 10,
        value: 45
    });

    keySlide3.push({
        frame: 60,
        value: -45
    });

    keySlide3.push({
        frame: 100,
        value: 45
    });
	
	ballSlide3.setKeys(keySlide3);
	sphere2.animations.push(ballSlide3);
	scene.beginAnimation(sphere2, 0, 1000, true);
	
	var ballSlide4 = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keySlide4 = []; 

    keySlide4.push({
        frame: 15,
        value: 45
    });

    keySlide4.push({
        frame: 65,
        value: -45
    });

    keySlide4.push({
        frame: 100,
        value: 45
    });
	
	ballSlide4.setKeys(keySlide4);
	sphere4.animations.push(ballSlide4);
	scene.beginAnimation(sphere4, 0, 1000, true);
	
	var ballSlide5 = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keySlide5 = []; 

    keySlide5.push({
        frame: 20,
        value: 45
    });

    keySlide5.push({
        frame: 70,
        value: -45
    });

    keySlide5.push({
        frame: 100,
        value: 45
    });
	
	ballSlide5.setKeys(keySlide5);
	sphere5.animations.push(ballSlide5);
	scene.beginAnimation(sphere5, 0, 1000, true);

};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps, scaledObject, scene)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/
	  
	 
	  
    },
}

