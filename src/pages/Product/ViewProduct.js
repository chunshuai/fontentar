import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Upload, Icon, Modal, Tabs, Cascader, Spin, Card, Button, Form, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from '../Forms/style.less';
import { message } from 'antd';
import RecommendProduct from '../../components/Product/recommendProduct';
import TableForm from './TableForm';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import marquee from './style.less';
import {stateFromHTML} from 'draft-js-import-html';
import stylesDisabled from './ViewProduct.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import { loadavg } from 'os';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const fieldLabels = {
    code: '产品编号',
    name: '名称',
    category: '分区',
    //rders: '排序',
    originalPlace: '产地',
    provider: '供应商',
    brand: '品牌',
    storageMethod: '储藏方法',
    productionLicenseNumber: '生产许可',
    //deliverType: '发货类型',
    //shipType: '送货类型',
    isRecommend: '是否推荐',
    //couponAvailable: '是否使用电子券',
    //isFreeGift: '是否是赠品',
    //isReturnable: '是否可退',
    salesPlace: '销售地区',
    //putontime: '上架时间',
    //putofftime: '上架时间',
    state: "状态",
    image: "特产图片",
};
@connect(state => ({
    success: state.modifyData.changeData.success,
    msg: state.modifyData.changeData.msg,
    submitLoading: state.modifyData.loading,
    menuList: state.getData.MenuList.obj,
    provider: state.getData.supplierSelect.obj,
    productdetail: state.getDetail.productDetail.obj,
    datasuccess: state.getDetail.productDetail.obj,
    loading: state.getDetail.productloading,
    parentspecification : state.getData.parentSelect.obj,
    parentloading: state.getDetail.parentloading,
}))
@Form.create()
export default class AddProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            time: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            iconUrl:[],
            editorState: EditorState.createEmpty(),
            isEdit: true,
            parentspecification:[],
            categoryId:[],
            contentEditor: '',
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'getData/getMenuList',
        });
        dispatch({
            type: 'getData/getSpecialtySupplier',
            callback: () => {
                this.setState({
                    data: this.props.provider,
                });
            },
        });
        if (this.props.location.params) {
            const id = this.props.location.params.id;
            this.setState({
                isEdit: this.props.location.params.isEdit,
            });
            const hid = { id };
            const param = {specialtyid:id};
            const { dispatch } = this.props;
            dispatch({
                type: 'getData/getparentspecification',
                payload: param,
                callback: () => {

                    this.setState({
                        parentspecification: this.props.parentspecification,
                    });
                    this.state.parentspecification.push({
                        specification:'无',
                        id:0,
                    })
                },
    
            });
            dispatch({
                type: 'getDetail/getProductDetail',
                payload: hid,
                callback: () => {
                    const { productdetail} = this.props;
                    if(productdetail.images){
                        let imageList=[];
                        for (let i = 0; i < productdetail.images.length; i += 1){
                            imageList.push({
                                uid: -i,
                                name: 'xxx.png',
                                status: 'done',
                                url:productdetail.images[i].sourcePath,
                                thumbnailPath:productdetail.images[i].thumbnailPath,
                                largePath:productdetail.images[i].largePath,
                                mediumPath:productdetail.images[i].mediumPath,
                            });
                        }
                    this.setState({
                        fileList:imageList,
                    });
                    }
                    if(productdetail.icon){
                        let iconUrl=[];
                        iconUrl.push({
                            uid: -1,
                            name: 'iconUrl.png',
                            status: 'done',
                            url:productdetail.icon.sourcePath,
                            thumbnailPath:productdetail.icon.thumbnailPath,
                            largePath:productdetail.icon.largePath,
                            mediumPath:productdetail.icon.mediumPath,
                        });
                        this.setState({
                          iconUrl,
                        });
                   }
                    this.setState({         
                        contentEditor: productdetail.descriptions,
                    });
                    let category=productdetail.category;
                    let categoryId=[];
                    if(category){
                    categoryId.push(category.id);
                    while(category.parent!=null){
                        category=category.parent;
                        categoryId.push(category.id);
                    }
                    categoryId.reverse();}
                    this.setState({
                        categoryId,
                    })
                  },
            });
        }
    }
    returnClick = () => {
        this.props.history.goBack();
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = (info) => {
        let fileList = info.fileList;

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.obj[0].sourcePath;
                file.thumbnailPath = file.response.obj[0].thumbnailPath;
                file.largePath = file.response.obj[0].largePath;
                file.mediumPath = file.response.obj[0].mediumPath;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.success === true;
            }
            return true;
        });
        this.setState({ fileList });
    }
    handleiconUrl = (info) => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
    
        // 2. read from response and show file link
        fileList = fileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.obj[0].sourcePath;
            file.thumbnailPath = file.response.obj[0].thumbnailPath;
            file.largePath = file.response.obj[0].largePath;
            file.mediumPath = file.response.obj[0].mediumPath;
          }
          return file;
        });
    
        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.success === true;
          }
          return true;
        });

        this.setState({ 
            iconUrl:fileList,
         });
    }
    handleChangeEditor = (content) => {
        this.setState({
          contentEditor: content,
        });
      }
    
      handleRawChange = (rawContent) => {
        console.log(rawContent);
      }
    formBasic = () => {


        const { form, dispatch, productdetail, loading,menuList} = this.props;
        const { isEdit } = this.state;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        const options = this.state.data.map(d => <Option value={d.id}>{d.providerName}</Option>);
        let specification=[];
        if(productdetail.specifications){
            for(var i=0;i<productdetail.specifications.length;i++){
                specification.push({
                    specification:productdetail.specifications[i].specification,
                    key:i,
                    id:productdetail.specifications[i].id,
                    parent:{
                        key:productdetail.specifications[i].parent,
                        value:productdetail.specifications[i].parent===0?'无':this.state.parentspecification.filter(d => d.id === parseInt(productdetail.specifications[i].parent)).length!=0?this.state.parentspecification.filter(d => d.id === parseInt(productdetail.specifications[i].parent))[0].specification:'',
                    },
                    saleNumber:productdetail.specifications[i].saleNumber,
                })
            }
        }
        return (
            <Form className={stylesDisabled.disabled} layout={isEdit?"vertical":"inline"}>
                 <Card title="基本信息" className={styles.card} bordered={false}>
                 <Row gutter={32}>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.provider}>
                             {getFieldDecorator('provider', {
                                 initialValue: productdetail.provider.id,
                                 rules: [{ required: true, message: '请选择供应商' }],
                             })(
                                 <Select
                                     showSearch
                                     optionFilterProp="children"
                                     placeholder="请输入供应商"
                                     filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                     disabled={!isEdit}
                                 >
                                     {options}
                                 </Select>
                                 )}
                         </FormItem>
                     </Col>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.category}>
                             {getFieldDecorator('category', {
                                 initialValue: this.state.categoryId,
                                 rules: [{ required: true, message: '请选择分区' }],
                             })(
                                 <Cascader options={menuList} onChange={this.oncategoryChange} placeholder="请选择特产种类" disabled={!isEdit} />
                                 )}
                         </FormItem>
                     </Col>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.name}>
                             {getFieldDecorator('name', {
                                 initialValue: productdetail.name,
                                 rules: [{ required: true, message: '请输入产品' }],
                             })
                                 (<Input placeholder="请输入产品" disabled={!isEdit} />)}
                         </FormItem>
                     </Col>
                 </Row>
                 <Row gutter={32}>
                     
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.brand}>
                             {getFieldDecorator('brand', {
                                 initialValue: productdetail.brand || '',

                             })(
                                 <Input placeholder="请输入品牌" disabled={!isEdit} />
                                 )}
                         </FormItem>
                     </Col>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.originalPlace}>
                             {getFieldDecorator('originalPlace', {
                                 initialValue: productdetail.originalPlace,
                                 rules: [{ required: true, message: '请输入产地' }],
                             })(
                                 <Input placeholder="请输入产地" disabled={!isEdit} />
                                 )}
                         </FormItem>
                     </Col>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem  >
                             {getFieldDecorator('iconUrl', {
                             })(
                                <Upload
                                        name="files"
                                        // listType="picture"
                                        action="/hyapi/resource/image/multisize/upload"
                                        onChange={this.handleiconUrl}
                                        fileList={this.state.iconUrl}
                                    >
                                        <Button>
                                            <Icon type="upload" />上传标志图片</Button>
                                    </Upload>
                                
                                 )}
                         </FormItem>
                     </Col>
                 </Row>
                 <Row gutter={32}>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.productionLicenseNumber}>
                             {getFieldDecorator('productionLicenseNumber', {
                                 initialValue: productdetail.productionLicenseNumber || '',
                             })(
                                 <Input placeholder="请输入生产许可" disabled={!isEdit} />
                                 )}
                         </FormItem>
                     </Col>
                     <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                         <FormItem label={fieldLabels.storageMethod}>
                             {getFieldDecorator('storageMethod', {
                                 initialValue: productdetail.storageMethod || '',
                             })(
                                 <Input placeholder="请输入储藏方法" disabled={!isEdit} />
                                 )}
                         </FormItem>
                     </Col>
                     {this.state.time ?
                         <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                             <FormItem label={fieldLabels.putontime}>
                                 {getFieldDecorator('putontime', {
                                 })(
                                     <DatePicker disabled={!isEdit} />
                                     )}
                             </FormItem>
                         </Col> : ""
                         
                     }
                 </Row>

             </Card>

             <Card title="包装规格" bordered={false}>
                 {getFieldDecorator('specifications', {
                     initialValue: specification,
                 }
                 )(<TableForm isEdit={isEdit}  parentspecification={this.state.parentspecification}/>)}
             </Card>
             {/* <Card title="推荐产品" className={styles.card} bordered={false}>
                 <RecommendProduct onOk={this.createSelect} MenuList={menuList}>
                     <Button type="primary" ghost >
                         添加推荐产品
                 </Button >
                 </RecommendProduct>
             </Card> */}
         </Form >
        )
    }
    formImg = () => {
        const { form, dispatch,productdetail} = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        const { previewVisible, previewImage,isEdit } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const uploadFn = (param) => {

            const serverURL = '/hyapi/resource/video/upload'
            const xhr = new XMLHttpRequest
            const fd = new FormData()
          
            // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
            console.log(param.libraryId)
          
            const successFn = (response) => {
              // 假设服务端直接返回文件上传后的地址
              // 上传成功后调用param.success并传入上传后的文件地址
              param.success({
                // url: xhr.responseText,
                url: JSON.parse(xhr.responseText).obj[0],
                meta: {
                  id: 'xxx',
                  title: 'xxx',
                  alt: 'xxx',
                  loop: false, // 指定音视频是否循环播放
                  autoPlay: false, // 指定音视频是否自动播放
                  controls: true, // 指定音视频是否显示控制栏
                  // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                  poster: null, // 指定视频播放器的封面
                },
              });
            };
          
            const progressFn = (event) => {
              // 上传进度发生变化时调用param.progress
              param.progress(event.loaded / event.total * 100)
            };
          
            const errorFn = (response) => {
              // 上传发生错误时调用param.error
              param.error({
                msg: 'unable to upload.',
              });
            };
          
            xhr.upload.addEventListener("progress", progressFn, false);
            xhr.addEventListener("load", successFn, false);
            xhr.addEventListener("error", errorFn, false);
            xhr.addEventListener("abort", errorFn, false);
          
            fd.append('files', param.file);
            xhr.open('POST', serverURL, true);
            xhr.send(fd);
          
          };
      
          const editorProps = {
            height: 350,
            contentFormat: 'html',
            // initialContent: line ? line.introduction : '',
            onChange: this.handleChangeEditor,
            onRawChange: this.handleRawChange,
            media: {
              allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
              image: true, // 开启图片插入功能
              video: true, // 开启视频插入功能
              audio: true, // 开启音频插入功能
              validateFn: null, // 指定本地校验函数，说明见下文
              uploadFn: uploadFn, // 指定上传函数，说明见下文
              removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
              onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
              onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
              onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
            },
          }
        return (
            <Form>
                <Card title="特产介绍图片" className={styles.card} bordered={false}>
                    <FormItem label={fieldLabels.image}>
                        {getFieldDecorator('images')(
                            <Upload
                                name="files"
                                action="/hyapi/resource/image/multisize/upload"
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                disabled={!isEdit}
                            >
                                {uploadButton}
                            </Upload>)
                        }
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </FormItem>
                </Card >
                <Card title="图文介绍" className={styles.card} bordered={false}>
                    <div className={styles.braftEditor}>
                         <BraftEditor {...editorProps} initialContent={productdetail.descriptions || ''} />
                    </div>
                </Card >
            </Form>
        );
    }
    validate = () => {
        const { form, dispatch, submitting } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                // submit the values
                const categoryId = parseInt(values.category[values.category.length - 1], 10);
                const providerId = parseInt(values.provider, 10);
                const areaId = values.salesPlace;
                const imageList = [];
                if (this.state.fileList.length) {
                    for (var i = 0; i < this.state.fileList.length; i++) {
                        imageList.push({
                            sourcePath:this.state.fileList[i].url,
                            thumbnailPath:this.state.fileList[i].thumbnailPath,
                            largePath:this.state.fileList[i].largePath,
                            mediumPath:this.state.fileList[i].mediumPath,
                        });
                    }
                }
                else{
                    message.error("请添加特产图片");
                    return;
                }
                let icon;
                if (this.state.iconUrl.length) {
                    icon={
                        sourcePath:this.state.iconUrl[0].url,
                        thumbnailPath:this.state.iconUrl[0].thumbnailPath,
                        largePath:this.state.iconUrl[0].largePath,
                        mediumPath:this.state.iconUrl[0].mediumPath,
                    }
                }
                else{
                    message.error("请添加特产图标");
                    return;
                }
                delete values.images;
                delete values.iconUrl;
                delete values.salesPlace;
                delete values.category;
                delete values.provider;
                if ((!this.state.contentEditor)||(this.state.contentEditor=='<p></p>'))
                {
                    message.error("请添加图文介绍");
                    return;
                }
                else{
                    values.descriptions=this.state.contentEditor;
                }
                let specification=[];
                if (!values.specifications||values.specifications.length===0) {
                    message.error("请添加产品包装规格");
                    return;
                  }
                if (values.specifications) {
                    for (var i = 0; i < values.specifications.length; i++) {
                        specification.push({
                            id:values.specifications[i].id,
                            specification:values.specifications[i].specification,
                            parent:values.specifications[i].parent.key,
                            saleNumber:values.specifications[i].saleNumber,

                        })
                    }
                }
                if(specification.length!=0){
                    delete values.specifications;
                    values.specifications=specification;
                }
                if (values.brand === '') delete values.brand;
                if (values.storageMethod === '') delete values.storageMethod;
                if (values.productionLicenseNumber === '') delete values.productionLicenseNumber;
                const param = {
                    specialty: {
                        ...values,
                        category: {
                            id: categoryId,
                        },
                        provider: {
                            id: providerId,
                        },
                        images: imageList.length ? imageList : undefined,
                        id:this.props.location.params.id,
                        icon,
                    },
                }
                const { dispatch } = this.props;
                dispatch({
                    type: 'modifyData/modifyProject',
                    payload: param,
                    callback: () => {
                        const { success, msg } = this.props;
                        if (success === true) {
                            message.success(msg);
                           this.props.history.goBack();
                        }
                        else {
                            message.error(msg);
                        }
                    },
                });
            }
        });
    }
    render() {
        const { submitLoading, loading ,productdetail,parentloading} = this.props;

        return (
            <PageHeaderLayout>
                <div style={{marginBottom:40}}>
                    {
                        (!loading && !parentloading) ?  
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="基本信息" key="1">{this.formBasic()}</TabPane>
                                <TabPane tab="图文介绍" key="2">{this.formImg()}</TabPane>
                        </Tabs>:<div><Spin /></div>}
                </div>
                <FooterToolbar>
                    {this.state.isEdit?
                    <Button type="primary" onClick={this.validate} loading={submitLoading}>
                        提交
                    </Button >:""}
                    <Button type="primary" onClick={this.returnClick}>
                        返回
                    </Button >
                </FooterToolbar>
            </PageHeaderLayout >
        );
    }
}
