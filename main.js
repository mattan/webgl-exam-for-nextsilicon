class main {

	async start(THREE,OrbitControls,AmmoPhysics,Stats) {
		
		let camera=this.camera, scene=this.scene, renderer=this.renderer, stats=this.stats;
		let physics, position=this.position;
	
		let boxes, spheres;

		physics = await AmmoPhysics();
		this.position = new THREE.Vector3();

		//

		this.camera = camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(- 1, 1.5, 2);
		camera.lookAt(0, 0.5, 0);

		this.scene = scene = new THREE.Scene();
		scene.background = new THREE.Color(0x666666);

		const hemiLight = new THREE.HemisphereLight();
		hemiLight.intensity = 0.0;
		scene.add(hemiLight);

		const material = new THREE.MeshLambertMaterial();

		const matrix = new THREE.Matrix4();
		const color = new THREE.Color();
		const blob = new THREE.SphereGeometry(0.075, 30, 30);


		const dirLight = new THREE.PointLight(0xFF0000, 1);
		dirLight.position.set(1, 1, 1);
		dirLight.castShadow = true;
		dirLight.name = "dirLight";
		//dirLight.shadow.camera.zoom =1;
		scene.add(dirLight);
		dirLight.add(new THREE.Mesh(blob, material));

		const dirLight2 = new THREE.PointLight(0x0000FF, 1);
		dirLight2.position.set(-1, 1, 1);
		dirLight2.castShadow = true;
		dirLight2.name = "dirLight2";
		//dirLight.shadow.camera.zoom =1;
		scene.add(dirLight2);
		dirLight2.add(new THREE.Mesh(blob, material));

		const dirLight3 = new THREE.PointLight(0x00FF00, 1);
		dirLight3.position.set(1, 1, -1);
		dirLight3.castShadow = true;
		dirLight3.name = "dirLight3";
		//dirLight.shadow.camera.zoom =1;
		scene.add(dirLight3);
		dirLight3.add(new THREE.Mesh(blob, material));

		const dirLight4 = new THREE.PointLight(0xFFFFFF, 1);
		dirLight4.position.set(-1, 1, -1);
		dirLight4.castShadow = true;
		//dirLight.shadow.camera.zoom =1;
		scene.add(dirLight4);
		dirLight4.add(new THREE.Mesh(blob, material));


		const floor = new THREE.Mesh(
			new THREE.BoxGeometry(10, 5, 10),
			new THREE.MeshStandardMaterial({ color: 0x11FFFF })
		);
		floor.position.y = - 2.5;
		floor.receiveShadow = true;
		scene.add(floor);
		physics.addMesh(floor);

		//






		// Boxes

		const geometryBox = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		boxes = new THREE.InstancedMesh(geometryBox, material, 10);
		boxes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
		boxes.castShadow = true;
		boxes.receiveShadow = true;
		scene.add(boxes);

		for (let i = 0; i < boxes.count; i++) {

			matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
			boxes.setMatrixAt(i, matrix);
			boxes.setColorAt(i, color.setHex(0xffffff));

		}

		physics.addMesh(boxes, 1);

		// Spheres

		const geometrySphere = new THREE.SphereGeometry(0.075, 30, 30);
		spheres = new THREE.InstancedMesh(geometrySphere, material, 10);
		spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
		spheres.castShadow = true;
		spheres.receiveShadow = true;
		scene.add(spheres);

		for (let i = 0; i < spheres.count; i++) {

			matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
			spheres.setMatrixAt(i, matrix);
			spheres.setColorAt(i, color.setHex(0xffffff));

		}

		physics.addMesh(spheres, 1);

		//

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		document.body.appendChild(this.renderer.domElement);

		this.stats = stats = new Stats();
		document.body.appendChild(stats.dom);

		//

		const controls = new OrbitControls(camera, this.renderer.domElement);
		controls.target.y = 0.5;
		controls.update();

		this.animate();

		let inter = new Interations(THREE,this.renderer,scene,camera);
		window.addEventListener('pointermove', event=>inter.onPointerMove(event,window));
		window.addEventListener('click', event=>inter.onClick(event));


	}

	animate() {

		requestAnimationFrame(()=>this.animate());

		//

		//let index = Math.floor(Math.random() * boxes.count);

		this.position.set(0, Math.random() + 1, 0);
		//physics.setMeshPosition( boxes, position, index );

		//

		//index = Math.floor(Math.random() * spheres.count);

		this.position.set(0, Math.random() + 1, 0);
		//physics.setMeshPosition( spheres, position, index );

		this.renderer.render(this.scene, this.camera);

		this.stats.update();

	}


	

}

class Interations {
	
	constructor(THREE,renderer,scene,camera){
		this.renderer = renderer;
		this.scene = scene;
		this.camera = camera;
		this.pointer = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();
	}

	onPointerMove(event,window) {
		let pointer = this.pointer;

		// calculate pointer position in normalized device coordinates (-1 to +1) for both components
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;


	}

	onClick() {
		let raycaster = this.raycaster;

		// update the picking ray with the camera and pointer position
		raycaster.setFromCamera(this.pointer, this.camera);

		// calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObjects(this.scene.children);

		for (let i = 0; i < intersects.length; i++) {

			if (intersects[i].object.parent.isLight) {
				console.log(intersects[i].object.parent.name)
				//intersects[ i ].object.material.color.set( 0xff0000 );
				intersects[i].object.parent.intensity = 0;
			}

		}

		this.renderer.render(this.scene, this.camera);

	}
}