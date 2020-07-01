import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Tabs, Upload } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../../components/FooterToolbar';
import styles from './style.less';
import { message } from 'antd';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { TeapotBufferGeometry } from 'three/examples/jsm/geometries/TeapotBufferGeometry';
// import amfmodel from './source/models/amf/rook.amf';

// OBJLoader(THREE);

// import { Scene } from './Components/ARComponents/build/three';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';



const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;


// @Form.create()
export default class Scenecomponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localX: 0,
      localY: 0,
      localZ: 0,
      xuanzhuanX: 0,
      xuanzhuanY: 0,
      xuanzhuanZ: 0,
      fangsuoX: 1,
      fangsuoY: 1,
      fangsuoZ: 1,
      modelName: "",
      sceneName: "",
      sceneDescpition: "",
      flag: false,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("进到getDerivedStateFromProps")
    console.log(nextProps);
    console.log(prevState);
    prevState.localX = nextProps.localX;
    prevState.localY = nextProps.localY;
    prevState.localZ = nextProps.localZ;
    prevState.fangsuoX = nextProps.fangsuoX;
    prevState.fangsuoY = nextProps.fangsuoY;
    prevState.fangsuoZ = nextProps.fangsuoZ;
    prevState.flag = true;
    // this.state.localX = nextProps.localX;
    // this.state.localX = nextProps.localX;
    // this.state.localX = nextProps.localX;


    //该方法内禁止访问this
    // if(nextProps.email !== prevState.email){
    // //通过对比nextProps和prevState，返回一个用于更新状态的对象
    // return {
    //            value:nextProps.email
    // }
    // }
    // //不需要更新状态，返回null
    // return null
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     console.log("进到这里面了吗");
  //     console.log(nextProps);
  //   if ('localX' in nextProps) {
  //     this.setState({
  //       data: nextProps.localX,
  //     });
  //   }
  // }
  componentDidMount() {
    console.log("子组件")
    console.log(this.props.modelName)
    this.init4();


  }
  componentDidUpdate() {


    this.init4();

  }
  // 
  init1 = () => {
    var container;

    var camera, scene, renderer;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = this.mount.clientWidth / 2;
    var windowHalfY = this.mount.clientHeight / 2;

    var object;

    camera = new THREE.PerspectiveCamera(45, this.mount.clientWidth / this.mount.clientWidth, 1, 2000);
    camera.position.z = 250;

    // scene

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    // manager

    function loadModel() {

      object.traverse(function (child) {

        if (child.isMesh) child.material.map = texture;

      });

      object.position.y = - 95;
      scene.add(object);

    }

    var manager = new THREE.LoadingManager(loadModel);

    manager.onProgress = function (item, loaded, total) {

      console.log(item, loaded, total);

    };

    // texture

    var textureLoader = new THREE.TextureLoader(manager);

    var texture = textureLoader.load('./source/textures/uv_grid_opengl.jpg');

    // model

    function onProgress(xhr) {

      if (xhr.lengthComputable) {

        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

      }

    }

    function onError() { }

    var loader = new OBJLoader(manager);

    loader.load('./source/models/obj/male02/male02.obj', function (obj) {

      object = obj;

    }, onProgress, onError);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.mount.clientWidth, this.mount.clientWidth);
    this.mount.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);

    animate();


    function initLoader() {


    }

    function onWindowResize() {

      windowHalfX = this.moount.clientWidth / 2;
      windowHalfY = this.mount.clientHeight / 2;

      camera.aspect = this.mount.clientWidth / this.mount.clientWidth;
      camera.updateProjectionMatrix();

      renderer.setSize(this.mount.clientWidth, this.mount.clientWidth);

    }

    function onDocumentMouseMove(event) {

      mouseX = (event.clientX - windowHalfX) / 2;
      mouseY = (event.clientY - windowHalfY) / 2;

    }

    //

    function animate() {

      requestAnimationFrame(animate);
      render();

    }

    function render() {

      camera.position.x += (mouseX - camera.position.x) * .05;
      camera.position.y += (- mouseY - camera.position.y) * .05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);

    }
  }
  init = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, this.mount.clientWidth / this.mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(renderer.domElement);
    camera.position.z = 5;
    var axis = new THREE.AxisHelper(3);
    scene.add(axis);
    this.createCube()
    // this.createLine()
    this.animate();

  }

  createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 2, 1, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = this.state.localX;
    cube.rotation.y = this.state.localY;
    cube.rotation.z = this.state.localZ;
    this.cube = cube
    this.scene.add(cube);
  }

  createLine = () => {
    const material = new THREE.LineBasicMaterial({ color: 0x0f00ff }) //定义线的材质
    const geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(-2, 0, 0))
    geometry.vertices.push(new THREE.Vector3(0, 2, 0)); //相当于是从 将前两个坐标连成一条线
    // geometry.vertices.push(new THREE.Vector3( 2, 0, 0) );
    const line = new THREE.Line(geometry, material)
    this.line = line
    line.position.x = -1
    line.position.y = 2
    this.scene.add(line)
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    // this.line.rotation.x += 0.02;
    // this.cube.translate(this.state.localX, this.state.localY, this.state.localZ);
    this.renderer.render(this.scene, this.camera);
  }
  init3 = () => {
    var camera, scene, renderer;
    renderer = new THREE.WebGL1Renderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    camera = new THREE.PerspectiveCamera(35, this.mount.clientWidth / this.mount.clientHeight, 1, 500);

    // Z is up for objects intended to be 3D printed.

    camera.up.set(0, 0, 1);
    camera.position.set(- 80, - 90, 150);
    scene.add(camera);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 50;
    controls.maxDistance = 300;
    controls.enablePan = false;
    controls.target.set(80, 65, 20);
    controls.update();

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    var loader = new ThreeMFLoader();
    loader.load('./source/models/3mf/cube_gears.3mf', function (object) {
      console.log(object);
      scene.add(object);
      render();

    });

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {

      camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);

      render();

    }

    function render() {

      renderer.render(scene, camera);

    }
  }
  init4 = () => {
    var camera, scene, renderer;
    var width = this.mount.clientWidth;
    var high = this.mount.clientHeight;
    scene = new THREE.Scene();
    console.log(this.props.backgroundURL)
    if (this.props.backgroundURL != null) {
      const loader = new THREE.TextureLoader();
      const bgTexture = loader.load(this.props.backgroundURL);
      scene.background = bgTexture;
    } else {

      scene.background = new THREE.Color(0x999999);
    }

    scene.add(new THREE.AmbientLight(0x999999));

    camera = new THREE.PerspectiveCamera(35, this.mount.clientWidth / this.mount.clientHeight, 1, 2000);

    // Z is up for objects intended to be 3D printed.

    camera.up.set(0, 0, 1);
    camera.position.set(0, 20, 6);

    camera.add(new THREE.PointLight(0xffffff, 0.8));

    scene.add(camera);

    if (this.props.modelName != "") {
      // this.createGeomety;
      const geometry = new THREE.BoxGeometry(3, 3, 0.2, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xE3D8C4 });
      //平移
      geometry.translate(parseFloat(this.state.localX), parseFloat(this.state.localY), parseFloat(this.state.localZ));
      // geometry.translate(3, 0, 0);
      //放缩
      geometry.scale(parseFloat(this.state.fangsuoX), parseFloat(this.state.fangsuoY), parseFloat(this.state.fangsuoZ));
      geometry.rotateX(this.props.xuanzhuanX);
      geometry.rotateY(this.props.xuanzhuanY);
      geometry.rotateZ(this.props.xuanzhuanZ);
      const cube = new THREE.Mesh(geometry, material);
      // cube.rotation.x = this.state.localX;
      // cube.rotation.y = this.state.localY;
      // cube.rotation.z = this.state.localZ;

      this.cube = cube
      scene.add(cube);
    }

    // 
    var grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
    grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
    scene.add(grid);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    console.log("this.mount")
    console.log(this.mount.firstChild);
    // this.mount.removeChild(canvas);
    if (this.mount.firstChild != null)
      this.mount.replaceChild(renderer.domElement, this.mount.firstChild);
    else
      this.mount.appendChild(renderer.domElement);
    if (this.props.modelTpye == 'amf') {
      var loader = new AMFLoader();
      var path = "./source/models/amf/rook.amf";
      // var path='http://39.96.182.123/three/examples/models/amf/rook.amf';
      // loader.load(this.props.modelURL, function (amfobject) {
      loader.load((path), function (amfobject) {
        console.log("进这里了吗");
        console.log(path);
        console.log(amfobject);
        scene.add(amfobject);
        render();

      });
    } else if (this.props.modelTpye == 'obj') {
      var object;
      function loadModel() {

        object.traverse(function (child) {

          if (child.isMesh) child.material.map = texture;

        });

        object.position.y = - 95;
        scene.add(object);

      }

      var manager = new THREE.LoadingManager(loadModel);

      manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);

      };

      // texture

      var textureLoader = new THREE.TextureLoader(manager);

      var texture = textureLoader.load(this.props.textureURL);

      // model

      function onProgress(xhr) {

        if (xhr.lengthComputable) {

          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

        }

      }

      function onError() { }

      var loader = new OBJLoader(manager);

      loader.load(this.props.modelURL, function (obj) {

        object = obj;

      }, onProgress, onError);

    }

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.target.set(0, 1.2, 2);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = width / high;
      camera.updateProjectionMatrix();

      renderer.setSize(width, high);
      render();

      // camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
      // camera.updateProjectionMatrix();

      // renderer.setSize(this.mount.clientWidth , this.mount.clientHeight);

      // render();

    }

    function render() {

      renderer.render(scene, camera);
    }


  }

  // componentWillUnmount() {
  //   this.mount.removeChild(this.renderer.domElement)
  // }
  // validate = () => {
  //   const { form, dispatch, submitting } = this.props;
  //   const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
  //   validateFieldsAndScroll((error, values) => {
  //     if (!error) {
  //       // submit the values
  //       var data = Object.keys(values)
  //         .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //         .join('&');
  //       dispatch({
  //         type: 'modifyDataLbc/addSelfWechatBus',
  //         payload: data,
  //         callback: () => {
  //           const { addSelfWechatBus: { changeData } } = this.props;
  //           if (changeData.success === true) {
  //             message.success(changeData.msg);
  //             this.return(dispatch);
  //           }
  //           else {
  //             message.error(changeData.msg);
  //           }
  //         },
  //       });
  //     }
  //   });
  // }




  render() {
    // const { form, dispatch } = this.props;
    // const { addSelfWechatBus: { loading: storeSubmitting } } = this.props;
    // const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    // const options2 = this.state.referrerData.map(d => <Option value={d.id}>{d.name}</Option>);
    return (
      <div
        id="canvas"
        style={{ width: '400px', height: '600px', background: '#666' }}
        ref={(mount) => { this.mount = mount }}
      />
    );
  }
}
