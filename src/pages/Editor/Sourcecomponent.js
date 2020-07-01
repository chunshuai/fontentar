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



const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;


// @Form.create()
export default class Sourcecomponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("进到source")


  }
  // 
  componentDidMount() {

  }
  componentDidUpdate() {


  }


  // 

  handleClick = (id) => {

  }


  render() {
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
    const data = [{
      url: "",
    },];
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
            dataSource={this.props.source}
            renderItem={item => (
              <List.Item>
                 <img src={item.url} onClick={this.handleClick(item.id)}/>
                 
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
}
