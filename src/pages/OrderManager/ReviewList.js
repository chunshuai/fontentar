import React,{PureComponent} from 'react';
import {connect} from 'dva';
import {Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import SuplierLineTable from './SupplierLineTable';
import OrderReviewTable from './OrderReviewTable'
const Option = Select.Option;
const FormItem = Form.Item;

export default  class ReviewList  extends PureComponent {

  componentDidMount() {
    
    const param = {
      page: 1,
      rows: 10,
      orderState: -1,
    };
    
  }

handleSearch = (e) => {
  e.preventDefault();
  
}

onOK = () => {
  const { dispatch, form } = this.props;
  
}

handleFormReset = () => {
  
}

handleTableChange = (pagination) => {
  
}

renderForm(){
  // const { getFieldDecorator } = this.props.form;
  return (
    <Form  layout="inline" onSubmit={this.handleSearch}>
    {/* <Row > */}
        {/* <Col md={4} sm={24} style={{ marginLeft: 10}}> */}
            <FormItem label="状态">
              {/* {getFieldDecorator('orderState')( */}
              <Select  style={{ width: 100 }}>
              <Option value={1}>待审核</Option>
              <Option value={-2}>已审核</Option>
              </Select>
              {/* )} */}
            </FormItem>
        {/* </Col> */}
        {/* <Col md={5} sm={24} style={{ marginLeft: 10}}> */}
            <FormItem label="订单编号">
            {/* {getFieldDecorator('orderCode')(//************** */}
            <Input placeholder="请输入订单编号" />
            {/* )} */}
            </FormItem>
        {/* </Col> */}
        {/* <Col md={8} sm={24} style={{ marginLeft: 10}}> */}
            <FormItem label="下单手机号">
            {/* {getFieldDecorator('orderPhone')(//************** */}
            <Input placeholder="请输入下单手机号" />
            {/* )} */}
            </FormItem>
        {/* </Col> */}
        {/* <Col md={5} sm={24} style={{ marginLeft: 10}}> */}
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 5 }} onClick={this.handleFormReset}>重置</Button>
          </span>
        {/* </Col> */}
    {/* </Row> */}
    </Form>
  );
}


  render() {//*************************
    // const { loading: dataLoading, orderReview } = this.props;
    // const pageSize = orderReview.obj.pageSize;
    // const current= orderReview.obj.pageNumber;
    const rowKey = record => record.id;//控制台不再报warning

    const data=[{orderCode:202005010123,orderPhone:17801224115,wechatName:"微商",isDivided:true,orderState:1,isShow:false}];
    const columns = [
      // {
      //   title: '',
      //   key: 'row',
      //   align: 'center',
      //   render:(text,record,index)=>(
      //     <span>{index+1+((current-1)*pageSize)}</span>
      //   ),
      // },
      {
        title: '订单编号',
        dataIndex: 'orderCode',
        align: 'center',
        key: 'orderCode',
      },{
        title: '下单手机号',
        dataIndex: 'orderPhone',
        align: 'center',
        key: 'orderphone',
      },{
        title: '微信昵称',
        dataIndex: 'wechatName',
        align: 'center',
        key: 'wechatAccount',
      },{
        title: '发货类型',//*******************************
        dataIndex: 'isDivided',
        key: 'isDivided',
        align: 'center',
        render: (text) => {
          // console.log("发货类型是"+text);
          if(text==false) return <span>平台</span>
          if(text==true) return <span>供应商</span>
        },
      },{
        title: '订单状态',//*******************************
        dataIndex: 'orderState',
        align: 'center',
        key: 'orderState',
        render: (text) => {
          // console.log("订单状态是"+text);
          if(text==0) return <span>待付款</span>
          if(text==1) return <span>待审核</span>
          if(text==2) return <span>待出库</span>
          if(text==3) return <span>待发货</span>
          if(text==4) return <span>待收货</span>
          if(text==5) return <span>已收货</span>
          if(text==6) return <span>已完成</span>
          if(text==7) return <span>已取消</span>
          if (text == 8) return <span>退货待确认</span>
          if (text == 9) return <span>待消费者退货</span>
          if (text == 10) return <span>待收货入库</span>
          if (text == 11) return <span>待退款</span>
          if (text == 12) return <span>已退款</span>
        },
      },{
          title: '原始凭证',
          dataIndex: 'isShow',
          key: 'isShow',
          align: 'center',
          render: (text) => {
            if(text==false) return <span>否</span>
            if(text==true) return <span>是</span>
          },
      },{
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) => {
          if(record.privilege == 'view' || record.orderState != 1) {  
            return <OrderReviewTable id={record.id} isEdit={false} >
                    <a>查看</a>
                  </OrderReviewTable>
          } else {
            return <OrderReviewTable id={record.id} isEdit={true} onOK={this.onOK} >
                    <a>审核</a>
                  </OrderReviewTable>
          }
        },
      },
    ];

    return (
      <PageHeaderLayout>
         <Card bordered={false}>
         <div className={styles.toolBar}>
           <div className={styles.searchForm} style={{marginBottom: '12px'}}>
              {this.renderForm()}
            </div>
            <SuplierLineTable
              columns={columns}
              data={data}
              loading={dataLoading}
              onChange={this.handleTableChange}
            />
        </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
