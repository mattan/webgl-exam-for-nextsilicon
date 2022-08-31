class Lights{
	constructor(THREE,scene){
		const material = new THREE.MeshLambertMaterial();
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
	}
}