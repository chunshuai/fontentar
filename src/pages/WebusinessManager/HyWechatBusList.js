import React,{PureComponent} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import styles from '../List/TableList.less';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Popconfirm  } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const Option = Select.Option;
const FormItem = Form.Item;
@connect(state => ({
  hyWechatBus: state.getDataLbc,
  hyWechatBusStatus: state.modifyDataLbc,
}))
@Form.create()
export default class HyWechatBusList extends PureComponent{
  constructor(props) {
   super(props);
}
  componentDidMount() {
    console.log("componentdidmountstore");
    const { dispatch } = this.props;
    const param = {
      page:1,
      rows:20,
    };
    dispatch({
      type: 'getDataLbc/getHyWechatBus',
      payload:param,
    });
  }
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.isActive) == "undefined"|| values.isActive == null) {
         values.isActive = '';
       }
       if(typeof(values.name)=="undefined"|| values.name == null){
        values.name='';
      }
      values.name = values.name.replace(/\s+/g, '');
      if(values.name == '') delete values.name;
      if(typeof(values.nameOfStore)=="undefined"|| values.nameOfStore == null){
        values.nameOfStore='';
      }
      values.nameOfStore = values.nameOfStore.replace(/\s+/g, '');
      if(values.nameOfStore == '') delete values.nameOfStore;
      values.page=1;
      values.rows=20;
      dispatch({
        type: 'getDataLbc/getHyWechatBus',
        payload: values,
      });
    });
  }

  // handleStoreadd=()=>{
  //   const { dispatch } = this.props;
  //    dispatch(routerRedux.push('addstore'));
  // }

  reload = () => {
    //dispatch(routerRedux.push('list'));
    console.log("重新加载页面");
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.isActive) == "undefined"|| values.isActive == null) {
         values.isActive = '';
       }
       if(typeof(values.name)=="undefined"|| values.name == null){
        values.name='';
      }
      values.name = values.name.replace(/\s+/g, '');
      if(values.name == '') delete values.name;
      if(typeof(values.nameOfStore)=="undefined"|| values.nameOfStore == null){
        values.nameOfStore='';
      }
      values.nameOfStore = values.nameOfStore.replace(/\s+/g, '');
      if(values.nameOfStore == '') delete values.nameOfStore;
      values.page=1;
      values.rows=20;
      dispatch({
        type: 'getDataLbc/getHyWechatBus',
        payload: values,
      });
    });
  }

  handleStatusChange = (id) =>{
    console.log("change");
    const { form, dispatch } = this.props;
    const param = {
      id:id,
    };

    dispatch({
      type: 'modifyDataLbc/changeHyWechatBusStatus',
      payload: param,

      callback:() => {
        const { hyWechatBusStatus: { changeData } } = this.props;
        if(changeData.success===true)
        {
          message.success(changeData.msg);
          this.reload();
        }
        else{
          message.error(changeData.msg);
        }
        //this.handleFormReset();
      },
    });

    
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    const param = {
      page:1,
      rows:20,
    };
    dispatch({
      type: 'getDataLbc/getHyWechatBus',
      payload: param,
    });
  }
  renderForm(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form  layout="inline" onSubmit={this.handleSearch}>
      <Row >
      {/* <Col span={3}>
        <Button type="primary" icon="plus" onClick={this.handleStoreadd} style={{marginTop: 4}}>
            新建
        </Button>
      </Col> */}
      <Col span={4} style={{ marginLeft: 10}}>
        <FormItem label="状态">
        {getFieldDecorator('isActive')(
        <Select  style={{ width: 90 }}>
        <Option value="1">有效</Option>
        <Option value="0">无效</Option>
        </Select>)}
          </FormItem>
        </Col>
        <Col span={6} style={{ marginLeft: 6}}>
        <FormItem label="微商名称" >
        {getFieldDecorator('name')(
          <Input placeholder="请输入微商名称" style={{ width: 150}} />)}
          </FormItem>
        </Col>

        <Col span={6} style={{ marginLeft: 6}}>
        <FormItem label="门店名称" >
        {getFieldDecorator('nameOfStore')(
          <Input placeholder="请输入门店名称" style={{ width: 150}} />)}
          </FormItem>
        </Col>


        <Col span={1}></Col>
        <Col span={4}>
        <Button type="primary"  htmlType="submit" style={{ marginLeft: 10}}>查询</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
        </Col>
      </Row>
      </Form>
    );
  }

  handleTableChange = (pagination) => {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if(typeof(values.isActive) == "undefined"|| values.isActive == null) {
           values.isActive = '';
         }
         if(typeof(values.name)=="undefined"|| values.name == null){
          values.name='';
        }
        values.name = values.name.replace(/\s+/g, '');
        if(values.name == '') delete values.name;
        if(typeof(values.nameOfStore)=="undefined"|| values.nameOfStore == null){
          values.nameOfStore='';
        }
        values.nameOfStore = values.nameOfStore.replace(/\s+/g, '');
        if(values.nameOfStore == '') delete values.nameOfStore;
        values.page=pagination.current;
        values.rows=pagination.pageSize;
        dispatch({
          type: 'getDataLbc/getHyWechatBus',
          payload: values,
        });
      }
  });
}


  render(){
    console.log(this.props);
    const { hyWechatBus: { loading:storeLoading,hyWechatBusData } } = this.props;
    //console.log(storeLoading);
    //console.log(nonHyStoreData);
    const current=hyWechatBusData.obj.pageNumber;
    const pageSize=hyWechatBusData.obj.pageSize;
    
    const columns= [
      {
        title: '',
        dataIndex: 'num',
        key: '9',
        render:(text,record,index)=>(
          <span>{index+1+((current-1)*pageSize)}</span>
        ),
      },
      {
      title: '微商名称',
      dataIndex: 'name',
      key: '1',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: '2',
    }, {
      title: '所属门店',
      dataIndex: 'nameOfStore',
      key: '10',
    },{
      title: '联系地址',
      dataIndex: 'address',
      key: '3',
    },
    {
      title: '网址',
      dataIndex: 'url',
      key: '4',
    }
    , {
      title: '网站二维码',
      dataIndex: 'qrcodeUrl',
      key: '5',
      render: (text,record) => (
        <a href={ text } target="_blank">查看</a>
      ),
    }
    , {
      title: '状态',
      dataIndex: 'isActive',
      key: '6',
      render: (text,record) => {
       // console.log(text);
        if(text==false){
          console.log("等于0");
          return "无效";
        }
        else{
          return "有效";
        }
      },
    }
    , {
      title: '操作',
      dataIndex: 'operation',
      key: '7',
      render: (text,record) => {
        if(record.isActive==false){
          return(
            <div>
              <Popconfirm title="是否确认解锁?" onConfirm={this.handleStatusChange.bind(null, record.id)}>
                  <a>解锁</a>
                </Popconfirm>
              <Divider type="vertical" />
              <Link  to={{pathname:"hywbview/detailview",query: { name: record.id,disadled:true} }}>查看</Link>
            </div>
          );
        }
        else{
          return(
            <div>
              <Popconfirm title="是否确认锁定?" onConfirm={this.handleStatusChange.bind(null, record.id)}>
                  <a>锁定</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link  to={{pathname:"hywbview/detailview",query: { name: record.id,disadled:true} }}>查看</Link>
            </div>
          );
        }
      },
    }];
    //console.log("StoreList");
    console.log(hyWechatBusData);
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions:['3','10','20'],
      pageSize,
      current,
      total:hyWechatBusData.obj.total,
    };
    console.log(paginationProps);
    return(
  <PageHeaderLayout >
  <Card  bordered={false}>
   <div className={styles.tableListForm}>
     {this.renderForm()}
   </div>
   <Table columns={columns}
      dataSource={hyWechatBusData.obj.rows}
      pagination={paginationProps}
      loading={storeLoading}
      onChange={this.handleTableChange}
      bordered
    />
    </Card>
  </PageHeaderLayout>);
}
}
