if ( WEBGL.isWebGLAvailable() === false ) {

	document.body.appendChild( WEBGL.getWebGLErrorMessage() );

}

var renderer, scene, camera, stats;

var particleSystem, uniforms, geometry;

var particles = 100000;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 700;

	scene = new THREE.Scene();

	uniforms = {

		texture: { value: new THREE.TextureLoader().load( "assets/particles/spark1.png" ) }

	};

	var shaderMaterial = new THREE.ShaderMaterial( {

		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true

	} );


	var radius = 500;

	geometry = new THREE.BufferGeometry();

	var positions = [];
	var colors = [];
	var sizes = [];

	var color = new THREE.Color();

	for ( var i = 0; i < particles; i ++ ) {

		positions.push( ( Math.random() * 2 - 1 ) * radius );
		positions.push( ( Math.random() * 2 - 1 ) * radius );
		positions.push( ( Math.random() * 2 - 1 ) * radius );

		color.setHSL( i / particles, 1.0, 0.5 );

		colors.push( 1.0, 1.0, 1.0 );

		sizes.push( 20 );

	}

	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
	geometry.addAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );

	particleSystem = new THREE.Points( geometry, shaderMaterial );

	scene.add( particleSystem );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.setClearColor( 0x432A5E, 1 );

	var container = document.getElementById( 'al-main-render' );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var time = Date.now() * 0.005;

	particleSystem.rotation.z = 0.01 * time;

	var sizes = geometry.attributes.size.array;

	for ( var i = 0; i < particles; i ++ ) {

		sizes[ i ] = 5 * ( 1 + Math.sin( 0.1 * i + time ) );

	}

	geometry.attributes.size.needsUpdate = true;

	renderer.render( scene, camera );

}