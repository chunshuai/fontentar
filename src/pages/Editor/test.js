import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Tabs, Upload } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../../components/FooterToolbar';
import styles from './style.less';
import { message } from 'antd';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// OBJLoader(THREE);

// import { Scene } from './Components/ARComponents/build/three';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';



const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
// @Form.create()
export default class index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            localX: 0,
            localY: 0,
            localZ: 0,

        }
    }

    componentDidMount() {

        this.init1()
    }
    init1 = () => {
        var container;

        var camera, scene, renderer;

        var mouseX = 0, mouseY = 0;

        var windowHalfX = this.mount.clientWidth / 2;
        var windowHalfY = this.mount.clientHeight / 2;

        var object;

        initLoader();
        animate();


        function initLoader() {

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
            renderer.setSize(this.mount.clientWidth , this.mount.clientWidth);
            container.appendChild(renderer.domElement);

            document.addEventListener('mousemove', onDocumentMouseMove, false);

            //

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            windowHalfX =  this.moount.clientWidth/ 2;
            windowHalfY = this.mount.clientHeight / 2;

            camera.aspect = this.mount.clientWidth / this.mount.clientWidth;
            camera.updateProjectionMatrix();

            renderer.setSize(this.mount.clientWidth , this.mount.clientWidth);

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

    // animate = () => {
    //   requestAnimationFrame(this.animate);
    //   this.cube.rotation.x += 0.01;
    //   this.cube.rotation.y += 0.01;
    //   // this.line.rotation.x += 0.02;
    //   // this.cube.translate(this.state.localX, this.state.localY, this.state.localZ);
    //   this.renderer.render(this.scene, this.camera);
    // }

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
    Configure = () => {
        // handleChange = info => {
        //   if (info.file.status === 'uploading') {
        //     this.setState({ loading: true });
        //     return;
        //   }
        //   if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, imageUrl =>
        //       this.setState({
        //         imageUrl,
        //         loading: false,
        //       }),
        //     );
        //   }
        // };
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Tabs defaultActiveKey="1" >

                <TabPane tab="场景设置" key="1">
                    <Form>
                        <Card className={styles.card} bordered={false}>
                            <FormItem label="场景名称：">
                                {/* {getFieldDecorator('SceneName')( */}
                                <Input placeholder="情输入场景名称" />
                                {/* )} */}
                            </FormItem>
                            <FormItem label="场景描述：">
                                {/* {getFieldDecorator('SceneDetail')( */}
                                <TextArea rows={4} />
                                {/* )} */}
                            </FormItem>
                            <FormItem label="背景图片：">
                                {/* {getFieldDecorator('BackVIew')( */}
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                {/* )} */}
                            </FormItem>
                        </Card>
                    </Form>

                </TabPane>
                {/* <TabPane tab="灯光配置" key="2">

        </TabPane>
        <TabPane tab="相机配置" key="3">

        </TabPane> */}
            </Tabs>
        );

    }
    SourceView = () => {
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Tabs defaultActiveKey="1" tabPosition='left' style={{ height: 220 }}>
                <TabPane
                    tab={
                        <span>
                            <AppleOutlined />
          模型
        </span>
                    }
                    key="1"
                >
                    <Upload {...props}>
                        <Button type="primary">上传素材</Button>
                    </Upload>
                    {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload> */}
                </TabPane>
                {/* <TabPane
          tab={
            <span>
              <AppleOutlined />
          AR
        </span>
          }
          key="2"
        >
          <Button type="primary">上传素材</Button>

          
        </TabPane>
        <TabPane
          tab={
            <span>
              <AppleOutlined />
          图片
        </span>
          }
          key="3"
        >
          <Button type="primary">上传素材</Button>

          
        </TabPane> */}
            </Tabs>
        );

    }
    Scene1 = () => {
        var text = "";
        console.log(text);
        // return(
        //   <div    dangerouslySetInnerHTML={{ __html:SC}}></div>

        // )
    }
    Scene = () => {
        return (
            <div
                id="canvas"
                style={{ width: '500px', height: '600px', background: '#666' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }

    transLateX = (value) => {
        console.log(value);
        console.log("123213");
        this.setState({
            localX: value,
        });
    }
    SceneConfigure = () => {

        return (
            <Tabs defaultActiveKey="1" >

                <TabPane tab="模型设置" key="1">
                    <Form>
                        <Card className={styles.card} bordered={false}>
                            <FormItem label="模型名称：">
                                {/* {getFieldDecorator('ModalName')( */}
                                <Input placeholder="情输入场景名称" />
                                {/* )} */}
                            </FormItem>
                            <FormItem label="布局：">
                                {/* {getFieldDecorator('SceneDetail')(
                  
                )} */}
                                <div>
                                    <Row >
                                        <Col span={6}> </Col>
                                        <Col span={6}>x</Col>
                                        <Col span={6}>y</Col>
                                        <Col span={6}>z</Col>
                                    </Row>
                                    <br />
                                    <Row >
                                        <Col span={6}>位置</Col>
                                        <Col span={6}><Input onChange={this.transLateX(this.value)} defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                    </Row>
                                    <br />
                                    <Row >
                                        <Col span={6}>旋转</Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                    </Row>
                                    <br />
                                    <Row >
                                        <Col span={6}>缩放</Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                        <Col span={6}><Input defaultValue="0"></Input></Col>
                                    </Row>

                                </div>


                            </FormItem>

                        </Card>
                    </Form>

                </TabPane>

            </Tabs>
        );

    }

    return = (dispatch) => {
        //dispatch(routerRedux.push('selfwbview'));
        this.props.history.goBack();
    }
    returnClick = () => {
        //const { dispatch } = this.props;
        //dispatch(routerRedux.push('selfwbview'));
        this.props.history.goBack();
    }



    // handleChange = info => {
    //   if (info.file.status === 'uploading') {
    //     this.setState({ loading: true });
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, imageUrl =>
    //       this.setState({
    //         imageUrl,
    //         loading: false,
    //       }),
    //     );
    //   }
    // };


    render() {
        // const { form, dispatch } = this.props;
        // const { addSelfWechatBus: { loading: storeSubmitting } } = this.props;
        // const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        // const options2 = this.state.referrerData.map(d => <Option value={d.id}>{d.name}</Option>);
        return (
            <PageHeaderWrapper>
                {/* <Form layout="inline" hideRequiredMark > */}
                <Card style={{ height: '700px' }}>
                    <div className="site-card-wrapper">
                        <Row >
                            <Col span={5}>
                                <Card bordered={false}>
                                    {this.Configure()}
                                </Card>
                            </Col>
                            <Col span={4}>
                                <Card bordered={false} title='我的素材'>
                                    {this.SourceView()}
                                </Card>
                            </Col>
                            <Col span={10}>
                                <Card bordered={false}>
                                    {this.Scene()}
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card bordered={false}>
                                    {this.SceneConfigure()}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    {/*
          <Card title="配置详情" className={styles.card} bordered={false}>
            <Col span={4}>{this.Configure()}
              {/* <Input placeholder='场景名称'></Input>
              <Input placeholder='场景描述' rows={4}></Input>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action=""
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload> 
            </Col>
            <Col span={4}>{this.SourceView()}
            </Col>
            <Col span={8}>{this.Scene()}</Col>
            <Col span={8}>{this.SceneConfigure()}</Col>

          </Card>
*/}
                    {/* </Form> */}
                </Card>
                <FooterToolbar>
                    <Button type="primary" onClick={this.validate} >
                        保存
          </Button >
                    <Button type="primary" onClick={this.returnClick}>
                        返回
          </Button >
                </FooterToolbar>
            </PageHeaderWrapper>
        );
    }
}
