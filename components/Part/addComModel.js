import React, { PureComponent } from 'react';
import { Modal, Form, Input, Table, Row, Col, Button,InputNumber,Select,message } from 'antd';
import { connect } from 'dva';
import style from './generalstyle.less';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 5 },
  },
};
@connect(state => ({
  history: state.getData,
}))
class AddCommissionModel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.store+values.weBusiness+values.introducer!=1){
          message.error('提成比例之和必须是1');
          return;
        }
        if (values.id == '') {
          delete values.id;
        }
        if (this.props.disabled==true){
          delete values.modelType;
        }
        var data = Object.keys(values)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
          .join('&');
        onOk(data);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, modelType, store, weBusiness, introducer } = this.props.record;
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
          title="编辑区域"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout='horizontal' onSubmit={this.okHandler} className={style.ctmodal}>
            <FormItem
              {...formItemLayout}
            >
              {
                getFieldDecorator('id', {
                  initialValue: id || '',
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="门店类型"
            >
              {
                getFieldDecorator('modelType', {
                  initialValue: modelType || '',
                  rules: [{ required: true, message: '请输入门店类型' }],
                })(
                  this.props.disabled===true? <Input  disabled={this.props.disabled}/>:
                  <Select  style={{ width: 150 }}>
                      <Option value='虹宇门店'>虹宇门店</Option>
                      <Option value='非虹宇门店'>非虹宇门店</Option>
                      <Option value='个人商贸'>个人商贸</Option>
                   </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="门店"
            >
              {
                getFieldDecorator('store', {
                  initialValue: store || '',
                  rules: [{ required: true, message: '请输入门店比例' }],
                })(<InputNumber min={0} max={1} step={0.1} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="微商"
            >
              {
                getFieldDecorator('weBusiness', {
                  initialValue: weBusiness || '',
                  rules: [{ required: true, message: '请输入微商比例' }],
                })(<InputNumber min={0} max={1} step={0.1} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="推荐人"
            >
              {
                getFieldDecorator('introducer', {
                  initialValue: introducer || '',
                  rules: [{ required: true, message: '请输入推荐人' }],
                })(<InputNumber min={0} max={1} step={0.1} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AddCommissionModel);
