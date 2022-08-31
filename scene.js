class Scene{
	constructor(THREE,physics){
		this.position = new THREE.Vector3();
		//

		let scene = new THREE.Scene();
		scene.background = new THREE.Color(0x666666);

		const hemiLight = new THREE.HemisphereLight();
		hemiLight.intensity = 0.0;
		scene.add(hemiLight);

		const material = new THREE.MeshLambertMaterial();

		const matrix = new THREE.Matrix4();

		const color = new THREE.Color();


		const floor = new THREE.Mesh(
			new THREE.BoxGeometry(10, 5, 10),
			new THREE.MeshStandardMaterial({ color: 0x11FFFF })
		);
		floor.position.y = - 2.5;
		floor.receiveShadow = true;
		scene.add(floor);
		physics.addMesh(floor);


		// Boxes
 
		const geometryBox = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		let boxes = new THREE.InstancedMesh(geometryBox, material, 10);
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
		let spheres = new THREE.InstancedMesh(geometrySphere, material, 10);
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

		return scene;
	}
}
