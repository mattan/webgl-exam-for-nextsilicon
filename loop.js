class Loop {
	start(renderer,scene,camera,stats){
		requestAnimationFrame(()=>this.start(renderer,scene,camera,stats));
		renderer.render(scene, camera);
		stats.update();
	}
}