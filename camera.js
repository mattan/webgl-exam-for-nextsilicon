class Camera {
	constructor(THREE,OrbitControls,renderer){
		let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(- 1, 1.5, 2);
		camera.lookAt(0, 0.5, 0);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.y = 0.5;
		controls.update();
		
		return camera;
	}
}