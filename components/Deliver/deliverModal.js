import React, {PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
@connect(state => ({
  viewDeliver: state.viewDeliver,
}))
class DeliverModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading:true,
    };
  }

  showModelHandler = (e) => {
    const { dispatch } = this.props;
    const {ordernum}= this.props.record;
    const params={
      ordernum:this.props.record.ordernum,
    }
    dispatch({
      type: 'viewDeliver/fetch',
      payload: params,
    });
    if (e) e.stopPropagation();
    const { viewDeliver: { loading:viewLoading,data } } = this.props;
    this.setState({
      visible: true,
      loading:false,
    });
  };

  hideModelHandler = () => {
    // const {form} = this.props;
    // form.setFieldsValue({website:''});
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
      this.hideModelHandler();
  };

  render() {
    const { children } = this.props;
    const { viewDeliver: { loading:viewLoading,data } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span >
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="发货确认"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >{
          viewLoading?<div>查询发货信息...</div>:
          <Form layout="horizontal" onSubmit={this.okHandler}  >
            <FormItem
              {...formItemLayout}
              label="订单号"

            >
              <span>{data.list==''?'':data.list[0].ordernum}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收货人"
            >
              {getFieldDecorator('receiptperson')(
            <span>{data.list==''?'':data.list[0].receiptperson}</span>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('phonenum')(
            <span>{data.list==''?'':data.list[0].phonenum}</span>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收获地址"
            >
              {getFieldDecorator('receiptlocation')(
            <span>{data.list==''?'':data.list[0].receiptlocation}</span>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('receiptreport')(
            <span>{data.list==''?'':data.list[0].receiptreport}</span>)}
            </FormItem>
          </Form>}
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DeliverModal);
