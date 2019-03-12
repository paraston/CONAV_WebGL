Player = function(game, canvas, scene) //On définit l'objet Player dans lequel on va pouvoir faire appel à ses méthodes définies dans son prototype
//ainsi que des fonctions extérieures à Player
{
  // _this est l'accès à la caméra à l'interieur de Player
  var _this = this;

  this.scene = scene;
  // Le jeu, chargé dans l'objet Player
  this.game = game;

  //On définit la vitesse de notre personnage
  this.speed = 1;
  
  //Sensibilité de la souris
  this.angularSensibility = 200;

  // Si le tir est activé ou non
  this.weaponShoot = false;
  
  window.addEventListener( "keyup" , function(evt) 
  {
	_this.camera.keysUp = [90]; // Touche Z
    _this.camera.keysDown = [83]; // Touche S
    _this.camera.keysLeft = [81]; // Touche Q
    _this.camera.keysRight = [68]; // Touche D;
  }, false);
  
    
  // Quand les touches sont appuyées, on met les axes à vrai


  window.addEventListener( "keydown" , function(evt) 
  {
    switch(evt.keyCode){
		case 90:
		_this.camera.axisMovement[0] = true;
		break;
		case 83:
		_this.camera.axisMovement[1] = true;
		break;
		case 81:
		_this.camera.axisMovement[2] = true;
		break;
		case 68:
		_this.camera.axisMovement[3] = true;
		break;
	}
  }, false);
  

  // Quand la souris bouge dans la scène
  window.addEventListener("mousemove" , function(evt) 
  {
    if(_this.rotEngaged === true) //si notre souris est bien capturée dans notre scène
    {
      _this.camera.rotation.y+=evt.movementX * 0.001 * (_this.angularSensibility / 250);

        var nextRotationX = _this.camera.rotation.x + (evt.movementY * 0.001 * (_this.angularSensibility / 250));

        if( nextRotationX < degToRad(90) && nextRotationX > degToRad(-90)){

            _this.camera.rotation.x+=evt.movementY * 0.001 * (_this.angularSensibility / 250);

        }
    }
  }, false);


  // On récupère le canvas de la scène 
  var canvas = this.game.scene.getEngine().getRenderingCanvas();

  
  // On affecte le clic et on vérifie qu'il est bien utilisé dans la scène (_this.controlEnabled)
  canvas.addEventListener("mousedown", function(evt) {
      if (_this.controlEnabled && !_this.weaponShoot) {
          _this.weaponShoot = true;
          _this.handleUserMouseDown();
      }
  }, false);

  // On fait pareil quand l'utilisateur relache le clic de la souris
  canvas.addEventListener("mouseup", function(evt) {
      if (_this.controlEnabled && _this.weaponShoot) {
          _this.weaponShoot = false;
          _this.handleUserMouseUp();
      }
  }, false);
  
   
  // Initialisation de la caméra dans notre scène
  this._initCamera(this.game.scene, canvas);

  // Le joueur doit cliquer dans la scène pour que controlEnabled passe à vrai, et ainsi, que le curseur soit capturé
  this.controlEnabled = false;

  // On lance l'event _initPointerLock pour vérifier le clic dans la scène
  this._initPointerLock();
	
	// saut : animation de la camera
	window.addEventListener("keyup", function(evt){
		var sceneJump = _this.scene;
		if (evt.keyCode == 32) { 
				_this.camera.animations = [];	                                  		
				var a = new BABYLON.Animation("a", "position.y", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                                                            		                		
				// Animation keys              		
				var keys = [];              		
				keys.push({ frame: 0,
					value: _this.camera.position.y 
				});              		
				keys.push({ frame: 8, 
					value: _this.camera.position.y + 8 
				});              		
				keys.push({ frame: 16, 
					value: _this.camera.position.y 
				});              		
				a.setKeys(keys);     
				var easingFunction = new BABYLON.CircleEase();              		
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);              		
				a.setEasingFunction(easingFunction);              		
				_this.camera.animations.push(a);	                                 		
				sceneJump.beginAnimation(_this.camera, 0, 20, false);                                                                                              	        
			}
	}, false);  
  
};

Player.prototype = {

  _initCamera : function(scene, canvas) 
  {
    // On crée la caméra
    this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-20, 5, 0), scene);

    // On affecte le mouvement de la caméra au canvas 
    this.camera.attachControl(canvas, true);

    // On initialise les axes de mouvement de la caméra à nul
    this.camera.axisMovement = [false,false,false,false];//dans l'ordre [haut,bas,gauche,droite]

    
    // On crée les armes !
   // this.camera.weapons = new Weapons(this);

    // Ajout des collisions avec playerBox
    this.camera.checkCollisions = true;
	this.camera.applyGravity = true;
	this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
	
	
	// On demande à la caméra de regarder au point zéro de la scène
    this.camera.setTarget(BABYLON.Vector3.Zero());
  },


  _initPointerLock : function() 
  {
    var _this = this;
      
    // Requete pour la capture du pointeur
    var canvas = this.game.scene.getEngine().getRenderingCanvas();

    //
    canvas.addEventListener("click", function(evt) 
    {
      canvas.requestPointerLock = canvas.requestPointerLock ||canvas.msRequestPointerLock || canvas.mozRequestPointerLock|| canvas.webkitRequestPointerLock;

      if (canvas.requestPointerLock)
      {
        canvas.requestPointerLock();
      }
    }, false);

    // Evenement pour changer le paramètre de rotation
    var pointerlockchange = function (event) 
    {
      _this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
      if (!_this.controlEnabled) 
      {
        _this.rotEngaged = false;
      } 
      else 
      {
        _this.rotEngaged = true;
      }
    };
      
    // Event pour changer l'état du pointeur, sous tout les types de navigateur
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
  },

  _checkMove : function(ratioFps) 
  {
	let relativeSpeed = this.speed / ratioFps;
  }, 
  
  handleUserMouseDown : function() 
  { 
    this.camera.weapons.fire();   
  },
  handleUserMouseUp : function() 
  {
    this.camera.weapons.stopFire();
  }
  
}
