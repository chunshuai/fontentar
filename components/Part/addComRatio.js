import React, {PureComponent } from 'react';
import {Select, Modal, Form, Input, Table,Row,Col,Button,InputNumber } from 'antd';
import { connect } from 'dva';
import style from './generalstyle.less';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 7},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
      md: {span: 5},
    },
  };
@connect(state => ({
  history: state.getData,
}))
class AddCommissionRatio extends PureComponent {
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
        if(values.id===''){
            delete values.id;
        }
        if (this.props.disabled==true){
          delete values.proportionType;
        }
        console.log(values);
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
    const { id, proportionType, proportion} = this.props.record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    let status='';
    if(this.props.disabled===true){
    switch (proportionType){
      case 0:
      status='虹宇门店';
      break;
      case 1:
      status='非虹宇门店';
      break;
      case 2:
      status='个人商贸';
      break;
    }
  }

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
                  initialValue: id===undefined?'':id,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="比例类型"
            >
              {
                getFieldDecorator('proportionType', {
                  initialValue:this.props.disabled===true?status:proportionType,
                  rules: [{ required: true, message: '请输入比例类型' }],
                })(
                  this.props.disabled===true? <Input  disabled={this.props.disabled}/>:
                  <Select  style={{ width: 150 }}>
                      <Option value={0}>虹宇门店</Option>
                      <Option value={1}>非虹宇门店</Option>
                      <Option value={2}>个人商贸</Option>
                   </Select>
               )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="比例值"
            >
              {
                getFieldDecorator('proportion', {
                  initialValue: proportion || '',
                  rules: [{ required: true, message: '请输入比例值' }],
                })(<InputNumber min={0} max={1} step={0.1} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AddCommissionRatio);
