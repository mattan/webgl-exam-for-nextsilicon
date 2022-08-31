class Renderer {
	constructor(THREE,document,window){
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.outputEncoding = THREE.sRGBEncoding;
		document.body.appendChild(renderer.domElement);
		
		return renderer;
	}
}
