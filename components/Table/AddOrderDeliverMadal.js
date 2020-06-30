import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, message, Select } from 'antd';
import { connect } from 'dva';
import styles from './AddOrderDeliverMadal.less';
const FormItem = Form.Item;


@connect(state => ({
  shipCompanyList:state.getDetail.shipCompanyList.obj,
}))
class DeliverAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();//阻止事件冒泡到父元素，阻止任何父事件处理程序被执行
    const { dispatch } = this.props;
    dispatch({
        type: 'getDetail/getShiperCompany',
    });
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
    this.setState({
      visible: false,
    });
  };

  // reloadHandler = (dispatch) => {
  //   //console.log("reload调用了吗");
  //   //const { returnOrder } = this.props;
  //   //const current = returnOrder.obj.pageNumber;
  //   //const pageSize = returnOrder.obj.pageSize;
  //   const param = {
  //     page: 1,
  //     rows: 10,
  //     //assistType: 1,
  //   };
  //   var data = Object.keys(param)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
  //     .join('&');
  //   dispatch({
  //     type: 'orders/getOrder',
  //     payload: data,
  //   });
  // }

  okHandler = (shipCompany, shipCode) => {
    // const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
      if (!err) {
        // console.log(values);
        // console.log(this.props);
        var data = Object.keys(values)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
          .join('&');
        // this.props.onOk(data);
        // this.hideModelHandler();
        const dispatch = this.props.dispatchlbc;
        // const param = {
        //   shipCompany: shipCompany,
        //   shipCode: shipCode,
        // };
        console.log("dispatchlllllllllll");
        dispatch({
          type: 'orders/addLogistics',
          payload: data,
          callback: () => {
            // console.log(this.props.returnOrder);
            const returnOrders = this.props.returnOrderMsg;
            console.log(returnOrders.success);
            const success = returnOrders.success;
            const msg = returnOrders.msg;
            if (success) {
              message.success(msg);
              this.props.reloadHandler(dispatch);
              this.hideModelHandler();
            } else {
              message.error(msg);
            }
          },
        });
      }
    });
  };

  phoneRule = (rule, value, callback) => {
    var re=/^\d{11}$/;
    // var re = /^\d{11}$|^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/;
    if (value && !re.test(value)) {
      callback('请输入11位完整手机号！');
    } else {
      callback();
    }
  }


  render() {
    const { children, orderid,shipCompanyList } = this.props;//children是指LanguageList页面里的编辑标签：<a>编辑</a>
    const shipCompanyOption = shipCompanyList.map(item => {
      return <Option value={item.shipCompany} key={item.shipCompany}>{item.shipCompany}</Option>
    });
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="添加物流"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout='horizontal' onSubmit={this.okHandler} className={styles.ctmodal}>
            <FormItem
              {...formItemLayout}
            // label="id"
            >
              {
                getFieldDecorator('orderid', {
                  initialValue: orderid,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="物流公司"
            >
              {//getFieldDecorator(id,options):
                //id必填输入控件唯一标志。支持嵌套式的写法;
                //options.initialValue子节点的初始值，类型、可选值均由子节点决定
                //options.rules校验规则
                getFieldDecorator('shiper', {
                  rules: [{
                    required: true, message: '物流公司为必填项',
                  }],
                })(

                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="请输入物流公司"            
                      >
                        {shipCompanyOption}
                      </Select>
                //<Input/>
              )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="快递单号"
            >
              {
                getFieldDecorator('shipcode', {
                  rules: [{
                    required: true, message: '快递单号为必填项',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="运费"
              className={styles.inputnumber}
            >
              {
                getFieldDecorator('shipFee', {
                  rules: [{
                    required: true, message: '运费为必填项',
                  }],
                })(<InputNumber />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="发货人"
            >
              {
                getFieldDecorator('receiverName', {
                  rules: [{
                    required: true, message: '收货人为必填项',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="发货人手机号"
            >
              {
                getFieldDecorator('receiverPhone', {
                  rules: [{
                    required: true, message: '发货人手机号为必填项',
                  }, {
                    validator: this.phoneRule,
                  }],
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DeliverAddModal);
