import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Tabs, Upload, List } from 'antd';
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
// OBJLoader(THREE);

// import { Scene } from './Components/ARComponents/build/three';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Scenecomponent from './Scenecomponent';
import Sourcecomponent from './Sourcecomponent';


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
      xuanzhuanX: 0,
      xuanzhuanY: 0,
      xuanzhuanZ: 0,
      fangsuoX: 1,
      fangsuoY: 1,
      fangsuoZ: 1,
      modelName: "",
      sceneName: "",
      sceneDescpition: "",
      backgroundUrl: "",
      modelType: "",
      modelURL: "",
      textureURL: "",
      source: [{
        url: "../source/textures/uv_grid_opengl.jpg",
        id: "0",
      },],
    }
  }

  componentDidMount() {

  }
  handleClick = (id) => {
    console.log(id);

    this.setState({
      modelName:id,
    });
    console.log("点击了");
  }
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
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.source}
            renderItem={item => (
              <List.Item >
                <img src={item.url} onClick={this.handleClick.bind(this,item.id)}/>

                {/* <img src="../source/textures/uv_grid_opengl.jpg" onClick={this.handleClick(item.id)} /> */}
              </List.Item>
            )}
          />,
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
        style={{ width: '400px', height: '600px', background: '#666' }}
        ref={(mount) => { this.mount = mount }}
      />
    );
  }

  transLateX = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      console.log(value);
      // this.state.localX = value;
      this.setState({
        localX: value,
      });
      console.log(this.state.localX);
    }
  }
  transLateY = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        localY: value,
      });
    }
  }
  transLateZ = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        localZ: value,
      });
    }
  }
  xuanzhuanX = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      console.log(value);
      this.setState({
        xuanzhuanX: value,
      });
      console.log(this.state.localX);
    }
  }
  xuanzhuanY = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        xuanzhuanY: value,
      });
    }
  }
  xuanzhuanZ = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        xuanzhuanZ: value,
      });
    }
  }
  fangsuoX = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      console.log(value);
      this.setState({
        fangsuoX: value,
      });
      console.log(this.state.localX);
    }
  }
  fangsuoY = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        fangsuoY: value,
      });
    }
  }
  fangsuoZ = (event) => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState({
        fangsuoZ: value,
      });
    }
  }
  removeModel=()=>{
    this.setState({
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
      modelType: "",
      modelURL: "",
      textureURL: "",
      source: [{
        url: "../source/textures/uv_grid_opengl.jpg",
        id: "0",
      },],
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
                <Input placeholder="请输入场景名称" />
                {/* )} */}
              </FormItem>
              <FormItem label="布局：">
                {/* {getFieldDecorator('SceneDetail')(
                  
                )} */}
                <div>
                  <Form ref={this.formRef}>
                    <Row >
                      <Col span={6}> </Col>
                      <Col span={6}>x</Col>
                      <Col span={6}>y</Col>
                      <Col span={6}>z</Col>
                    </Row>
                    <br />
                    <Row ><Form></Form>
                      <Col span={6}>位置</Col>
                      <Col span={6}>
                        <Input onChange={event => this.transLateX(event)} defaultValue={this.state.localX}></Input>
                      </Col>
                      <Col span={6}><Input onChange={event => this.transLateY(event)} defaultValue={this.state.localY}></Input></Col>
                      <Col span={6}><Input onChange={event => this.transLateZ(event)} defaultValue={this.state.localZ}></Input></Col>
                    </Row>
                    <br />
                    {/* <Row >
                      <Col span={6}>旋转</Col>
                      <Col span={6}><Input onChange={event => this.xuanzhuanX(event)} defaultValue="0"></Input></Col>
                      <Col span={6}><Input onChange={event => this.xuanzhuanY(event)} defaultValue="0"></Input></Col>
                      <Col span={6}><Input onChange={event => this.xuanzhuanZ(event)} defaultValue="0"></Input></Col>
                    </Row>
                    <br /> */}
                    <Row >
                      <Col span={6}>缩放</Col>
                      <Col span={6}><Input onChange={event => this.fangsuoX(event)} defaultValue={this.state.fangsuoX}></Input></Col>
                      <Col span={6}><Input onChange={event => this.fangsuoY(event)} defaultValue={this.state.fangsuoY}></Input></Col>
                      <Col span={6}><Input onChange={event => this.fangsuoZ(event)} defaultValue={this.state.fangsuoZ}></Input></Col>
                    </Row>
                  </Form>
                </div>

                  
              </FormItem>
                  <div>
                    <Button type="primary" onClick={this.removeModel}>去除模型</Button>
                  </div>
            </Card>
          </Form>

        </TabPane>

      </Tabs>
    );

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
        <Card style={{ height: '720px' }}>
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
                  {/* <Sourcecomponent source={this.state.source}/> */}
                </Card>
              </Col>
              <Col span={10}>
                <Card bordered={false}>
                  {/* {this.Scene()} */}
                  <Scenecomponent localX={this.state.localX} localY={this.state.localY} localZ={this.state.localZ} fangsuoX={this.state.fangsuoX} fangsuoY={this.state.fangsuoY} fangsuoZ={this.state.fangsuoZ}
                    backgroundUrl={this.state.backgroundUrl}modelName={this.state.modelName} modelType={this.state.modelType} modelURL={this.state.modelURL} textureURL={this.state.textureURL} />
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
