var samples = [1,2,3,4,5,6,7,8,9,10]

class Sphere{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  render(){
    let geometry = new THREE.SphereGeometry( 5, 30, 30 );
    let material = new THREE.MeshPhongMaterial({color:0xf0f0f0});
    sphere = new THREE.Mesh(geometry,material);
    sphere.position.set(this.x,this.y,this.z);

    // console.log(datapack.length);
    // if (datapack.length < 100) {
    //   console.log("not enough data?");
    //   return;
    // }

    for (let i = 0; i < datapack.length; i++) {
      let sample = datapack[i]/10;
      let vertices = geometry.vertices[i*8+13]
      var vc = new THREE.Vector3(vertices.x,vertices.y,vertices.z);
      var nmvc = vc.normalize();
      var scnmvc = nmvc.addScaledVector(nmvc, sample);
      vertices.addVectors(vertices, scnmvc);
    }



    scene.add(sphere);
  }

  update(){
    sphere.rotation.y += .01;
  }
}


let datapack = [];

let container;
let camera, scene, light, renderer, sphere, time;
let spheres = [];

// init();
// animate();

function init(){

  container = document.createElement('div');
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  fillScene();
}



function fillScene(){

  scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(0x808080, 3000,6000);
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 40000 );
  camera.position.set(0,0,28);
  camera.rotation.set(0,0,0);
  scene.add(camera);

  var spotlight = new THREE.SpotLight(0xff0000, 1);
  spotlight.position.set( -5, 6, 7.5);
  // spotlight.angle = 90 * Math.PI / 180;
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  scene.add( spotlight );

  var spotlight = new THREE.SpotLight(0x00ff00, 1);
  spotlight.position.set( 5, -6, 7.5);
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  scene.add( spotlight );


  // let geometry = new THREE.SphereGeometry( 5, 10, 10 );
  // let material = new THREE.MeshPhongMaterial({color:0xff81ff});
  //
  // var yu = new THREE.Vector3(geometry.vertices[0].x/2,geometry.vertices[0].y/2,geometry.vertices[0].z/2);
  // geometry.vertices[0].addVectors(geometry.vertices[0], yu);
  //
  // var num = geometry.vertices.length-1;
  // var yu = new THREE.Vector3(geometry.vertices[num].x,geometry.vertices[num].y,geometry.vertices[num].z);
  // var normalyu = yu.normalize();
  // var normalscaleyu = normalyu.addScaledVector(normalyu,1/2);
  // geometry.vertices[num].addVectors(geometry.vertices[num], normalscaleyu);
  //
  // var num = 50;
  // var yu = new THREE.Vector3(geometry.vertices[num].x,geometry.vertices[num].y,geometry.vertices[num].z);
  // var normalyu = yu.normalize();
  // var normalscaleyu = normalyu.addScaledVector(normalyu,1/2);
  // geometry.vertices[num].addVectors(geometry.vertices[num], normalscaleyu);
  // // geometry.vertices[38].addScalar(5,1,2);
  // // geometry.vertices[82].addScalar(5,10,2);
  // // geometry.vertices[0].addVectors(geometry.vertices[0], yu);
  // console.log(geometry);
  // console.log(geometry.vertices.length);
  //

  console.log(datapack);

  spheres.push(new Sphere(0,0,0));
  spheres[0].render();
  console.log(spheres[0])


}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(){

  requestAnimationFrame(animate);

  render();

  // console.log(datapack.join(","));
  // console.log(datapack.length);
}

function render(){

  // var time = Date.now();

  spheres[0].update();
  renderer.render(scene, camera);
}
