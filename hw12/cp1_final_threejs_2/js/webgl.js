var samples = [1,2,3,4,5,6,7,8,9,10]

class Sphere{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  render(){
    rig2 = new THREE.Object3D();
    scene.add(rig2);
    //m
    for (let i = 0; i < 10; i++) {
      let geometry = new THREE.SphereGeometry( 5, 30, 30 );
      let material = new THREE.MeshLambertMaterial({color:0xf0f0f0, });
      // let material = new THREE.MeshDepthMaterial({wireframe:true, wireframeLinewidth: 10 });
      rig1 = new THREE.Object3D();
      rig2.add(rig1);
      rig1.rotation.y = 360/10*Math.PI/180*i;

      sphere = new THREE.Mesh(geometry,material);
      sphere.position.set(0, Math.random()*2,50);
      sphere.castShadow = true; //default is false
      sphere.receiveShadow = true;
      for (let r = 2; r < datapack.length; r++) {
        let sample = datapack[r][i+3]*5;
        let vertices = geometry.vertices[r*8]
        var vc = new THREE.Vector3(vertices.x,vertices.y,vertices.z);
        var nmvc = vc.normalize();
        var scnmvc = nmvc.addScaledVector(nmvc, sample);
        vertices.addVectors(vertices, scnmvc);
        console.log(sample)
      }
      rig1.add(sphere);
    }
}

  update(){
    // rig2.rotation.y -= .0005
    // sphere.rotation.y += .005;
    rig2.children.forEach(function(child,index){
      child.children.forEach(function(child,index){
          child.rotation.y += .003;
      })
    })


    rig2.rotation.y += (targetRotation - rig2.rotation.y) * 0.05
  }
}


let datapack = [];
let container;
let camera, scene, light, renderer, sphere, time, rig1, rig2;
let spheres = [];
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;
var mouseYOnWheel = 0;
var labelRenderer;

var windowHalfX = window.innerWidth/2;
var windowHalfY = window.innerHeight/2;

function init(){

  container = document.createElement('div');
  document.body.appendChild(container);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('mousedown',onDocumentMouseDown,false);
  document.addEventListener('touchstart',onDocumentTouchStart,false);
  document.addEventListener('touchmove',onDocumentTouchMove,false);

  fillScene();
}



function fillScene(){

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 40000 );
  camera.position.set(0,0,80);
  camera.rotation.set(0,0,0);
  scene.add(camera);

  var spotlight = new THREE.SpotLight(0xff0000, 0.9);
  spotlight.position.set( 3, -5, 70);
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  spotlight.angle = 140*Math.PI/180;
  spotlight.penumbra = 0.2;
  spotlight.distance = 100;
  scene.add( spotlight );

  var spotlight = new THREE.SpotLight(0x00ff00, 0.9);
  spotlight.position.set( -3, 5, 70);
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  spotlight.angle = 140*Math.PI/180;
  spotlight.penumbra = 0.2;
  spotlight.distance = 100;
  scene.add( spotlight );

  var light = new THREE.HemisphereLight( 0xffbbff, 0xffffbb, .3 );
  scene.add( light );


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

function onDocumentMouseDown(event){
  // what is preventDefault?
  event.preventDefault();

  document.addEventListener('mousemove',onDocumentMouseMove,false);
  document.addEventListener('mouseup',onDocumentMouseUp,false);
  document.addEventListener('mouseout',onDocumentMouseOut,false);

  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event){
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  targetRotation = targetRotationOnMouseDown + (mouseY + mouseX - mouseXOnMouseDown)* 0.001;
}

function onDocumentMouseUp(event){
  document.removeEventListener('mousemove',onDocumentMouseMove,false);
  document.removeEventListener('mouseup',onDocumentMouseUp,false);
  document.removeEventListener('mouseout',onDocumentMouseOut,false);
}

function onDocumentMouseOut(event){
  document.removeEventListener('mousemove',onDocumentMouseMove,false);
  document.removeEventListener('mouseup',onDocumentMouseUp,false);
  document.removeEventListener('mouseout',onDocumentMouseOut,false);
}

function onDocumentTouchStart(event){
  if(event.touches.length === 1){
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX-windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
}

function onDocumentTouchMove(event){
  if(event.touches.length ===1){
    event.preventDefault();
    mouseX = event.touches[0].pageX-windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)*0.05
  }
}

function animate(){
  requestAnimationFrame(animate);
  render();
}

function render(){
  spheres[0].update();
  renderer.render(scene, camera);
}
