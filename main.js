class Main {

	async start(THREE,OrbitControls,AmmoPhysics,Stats) {

		let physics = await AmmoPhysics();
		let scene = new Scene(THREE,physics)
		let renderer = new Renderer(THREE,document,window);
		let camera = new Camera(THREE,OrbitControls,renderer);
		let lights = new Lights(THREE,scene);

		// stats just display the small window with frame per seconds...
		let stats = new Stats();
		document.body.appendChild(stats.dom);
		new Loop().start(renderer,scene,camera,stats);

		let inter = new Interations(THREE,renderer,scene,camera);
		window.addEventListener('pointermove', event=>inter.onPointerMove(event,window));
		window.addEventListener('click', event=>inter.onClick(event));
	}

}