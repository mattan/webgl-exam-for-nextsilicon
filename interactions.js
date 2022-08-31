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