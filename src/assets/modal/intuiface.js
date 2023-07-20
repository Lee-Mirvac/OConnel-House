import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

const handler = (e) => {
 
  updateApartmentData(e.detail.data);
};

const emitEvent = (eventName, data) => {
  let event = new CustomEvent(eventName, { detail: data });
  window.parent.document.dispatchEvent(event);
};
/**
 * Handle events come from web page
 */
window.parent.document.addEventListener("data", handler, false);
window.parent.document.addEventListener(
  "reset",
  (e) => {
    reset();
  },
  false
);


var mesh, renderer, scene, camera, controls, model;
var delayInMilliseconds = 5000;
	let directionImage;
let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2(1, 1);
let meshChild = {};
let children = [];
let clickedItems = [];
let info;
let myIP;
const EventType = {
  click: "click",
  query: "query",
  connection: "connection",
  filter: "filter",
  reset: "reset",
};
Object.freeze(EventType);
const urlParams = new URLSearchParams(window.location.search);
let modelPath = urlParams.get("modelName")
  ? "./" + urlParams.get("modelName")
  : "./main-model.glb";
let ship_material = new THREE.MeshBasicMaterial({
  color: "#4a740b",
  opacity: 0.8,
  transparent: true,
  side: THREE.DoubleSide,
});
let available_material = "#1567BA";
let sold_material = "#E8A479";
let reserved_material = "#E6E640";
window.onresize = () => {
  console.log('Resize');
  onWindowResize()
};
function init() {
  		directionImage = document.querySelector('#directionImage');
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
 

  
  renderer.setPixelRatio(window.devicePixelRatio);
  	document.querySelector('#gameCanvas').appendChild(renderer.domElement);
  document.body.appendChild(renderer.domElement);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(-12, 4, -1);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2;
  //controls.minDistance = 10;
  //controls.maxDistance = 50;

  // light
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0x828282, 0.8);
  directionalLight.position.set(1, 1, 0).normalize();
  scene.add(directionalLight);
  const directionalLight2 = new THREE.DirectionalLight(0x828282, 0.8);
  directionalLight2.position.set(-1, -1, 0).normalize();
  scene.add(directionalLight2);

  //  GROUND

  // var loaderDds = new DDSLoader ();
  // var skybox = loaderDds.load ( './BrightSky.dds' );
  // scene.background = skybox;
  scene.background = new THREE.Color("#63a5a2");

  // probe
  var lightProbe = new THREE.LightProbe();
  scene.add(lightProbe);

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    function (gltf) {
      model = gltf.scene;
      model.position.set(0, 0, 0);
      model.rotation.y = Math.PI / 2;
      model.scale.set(0.05, 0.05, 0.05);
      model.traverse(function (child) {
        meshChild[child.name] = child;
        if (
          child.name === "!_ROOFGARDEN" ||
          child.name === "!_LOBBY" ||
          child.name === "!_SHARED_DINING"
        ) {
          child.visible = false;
        } else {
          let istrue =
            child.name.includes("Apartment") ||
            child.name.includes("LOT_NO") ||
            child.name.includes("_ROOFTOP") ||
            child.name.includes("_ENTRY_AMENITIES");
          if (istrue) {
            child.material = new THREE.MeshBasicMaterial({
              opacity: 0,
              transparent: true,
              side: THREE.DoubleSide,
            });
          }
        }
      });
      for (let key in meshChild) {
        let value = meshChild[key];
      }

      scene.add(gltf.scene);
    },
    function (xhr) {
      if ((xhr.loaded / xhr.total) * 100 <= 1) {
        emitEvent("loderIn3DModel", { start: true });
      }
      if ((xhr.loaded / xhr.total) * 100 >= 100) {
        emitEvent("loderIn3DModel", { start: false });
      }
    },
    function (error) {
      // console.error(error);
    }
  );

  renderer.domElement.addEventListener("click", onClick);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  	// console.log("Azimuthal Angle: " + controls.getAzimuthalAngle() + " Polar Angle: " + controls.getPolarAngle());
			let angle = getAngle(controls.getAzimuthalAngle());
	
			directionImage.style.transform = "rotate(" + (angle) + "deg)";
  renderer.render(scene, camera);
}

function getAngle(azimuthalAngle) {
			azimuthalAngle += 3.1;
			azimuthalAngle *= 58;
			azimuthalAngle = Math.ceil(azimuthalAngle);

			return azimuthalAngle;
		}


function onClick(event) { 
  event.preventDefault();
  var rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    for (let index = 0; index < clickedItems.length; ) {
      let item = clickedItems.pop();
      item.object.material = item.material;
    }
  }

  if (intersects.length > 0) {
    intersects[0].object.traverse(function (child) {
      let istrue =
        child.name.includes("Apartment") ||
        child.name.includes("LOT_NO") ||
        child.name.includes("_ROOFTOP") ||
        child.name.includes("_ENTRY_AMENITIES");
      //alert ( istrue );
      if (child instanceof THREE.Mesh && istrue) {
        children.push(child);
        let item = {};
        item["object"] = child;
        item["material"] = child.material;
        clickedItems.push(item);
        child.material = ship_material;

        let json = {};
        json["apartment"] = child.name;
        json["eventType"] = EventType.click;
        json["ip"] = myIP;
        emitEvent("click_on_building", JSON.stringify(json));
       
      }
    });
  }
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getMessage(msg) {
  // console.log ( `Modified Message:`, msg );
  var customKey = Object.keys(msg);
  // console.log ( `CustomKey: ${customKey}` );
  if (customKey.includes("eventType")) {
    // console.log ( `Event Type: ${msg.eventType}` );
    switch (msg.eventType) {
      case EventType.filter:
        // console.log ( `Data: ${JSON.stringify ( msg.data )}` );
        getDataFromKnack(msg.data);
        break;
      case EventType.click:
        emitEvent("send_data_to_web", msg);
        SelectFloor(msg.apartment);
        break;
      case EventType.query:
        // console.log ( 'Query found' );
        SelectFloorWithcolor(msg.apartmentdata);
        break;
      case EventType.reset:
        reset();
        break;
    }
  } else {
    //console.log(`Else CustomKey: ${customKey}`);
    queryLabel: for (let index = 0; index < customKey.length; ++index) {
      switch (customKey[index]) {
        case EventType.connection:
          myIP = msg.connection;
          break queryLabel;
        default:
          break;
      }
    }
  }
}

function reset() {
  for (let index = 0; index < clickedItems.length; ) {
    let item = clickedItems.pop();
    item.object.material = item.material;
  }
}

function SelectFloor(arr) {
  for (let index = 0; index < arr.length; ++index) {
    if (meshChild[arr[index]] != null) {
      let item = {};
      item["object"] = meshChild[arr[index]];
      item["material"] = meshChild[arr[index]].material;
      clickedItems.push(item);
      meshChild[arr[index]].material = ship_material;
    }
  }
}

function SelectFloorWithcolor(arr) {
  for (let index = 0; index < arr.length; ++index) {
    if (meshChild[arr[index].apartment] != null) {
      let item = {};
      item["object"] = meshChild[arr[index].apartment];
      item["material"] = meshChild[arr[index].apartment].material;
      meshChild[arr[index].apartment].material = new THREE.MeshBasicMaterial({
        color: arr[index].material,
      });
      clickedItems.push(item);
    }
  }
}

export const updateApartmentData = (apartmentdata) => {
  let json = apartmentdata;
  let apartment = [];

  for (let index = 0; index < json.records.length; ++index) {
    //field_9
    let data = {};
    data["apartment"] = "LOT_NO" + json.records[index].field_7;
    switch (json.records[index].field_9) {
      case "Reserved":
        data["material"] = reserved_material;
        break;
      case "Available":
        data["material"] = available_material;
        break;
      case "Sold":
        data["material"] = sold_material;
        break;
    }
    apartment.push(data);
  }
  let jsonData = {};
  jsonData["apartmentdata"] = apartment;
  jsonData["eventType"] = EventType.query;
  jsonData["ip"] = myIP;
  //socket.send ( JSON.stringify ( jsonData ) );
  getMessage(jsonData);
};

window.onload = function () {
  init();
  animate();
};
let selectfloorbtn = document.getElementById("reset");

selectfloorbtn.addEventListener("click", function () {
  // let json = {};
  // json [ 'eventType' ] = EventType.reset;
  // json [ 'ip' ] = myIP;
  let json =
    '{"data":[{"field":"field_9", "operator":"is not", "value":"Cheese"},{"field":"field_9", "operator":"is not", "value":"Sold"},{"field":"field_9", "operator":"is not", "value":"Reserved"},{"field":"field_286","operator":"is not","value":"200"},{"field":"field_15","operator":"is not","value":"200"}],"ip": "192.171.2.223","eventType": "filter"}';

  socket.send(json);
});

