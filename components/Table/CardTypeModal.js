import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import style from './SetGeneral.less';

const FormItem = Form.Item;

class CardTypeEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
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
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  isNumberRule = (rule, value, callback) => {
    var re = /^[0-9]*$/;
    if (value && !re.test(value)) {
      callback('请输入正确的数字！');
    } else {
      callback();
    }
  }
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, order, status } = this.props.record;
    const edit = this.props.edit;
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
          title="编辑证件类型"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={edit ? 
            [
              <Button key="back" onClick={this.hideModelHandler}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.okHandler}>确定</Button>,
            ]
            :
            [
              <Button key="back" onClick={this.hideModelHandler}>返回</Button>,
            ]
          }
        >
          <Form layout='horizontal' onSubmit={this.okHandler} className={style.ctmodal}>
            <FormItem
              {...formItemLayout}
            // label="id"
            >
              {
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
                  initialValue: status,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '名称为必填项',
                  }],
                })(<Input disabled={!edit} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
              className={style.inputnumber}
            >
              {
                getFieldDecorator('order', {
                  initialValue: order,
                  rules: [{
                    type: 'number', message: '序号必须为数字',
                  },{validator: this.isNumberRule}],
                })(<InputNumber disabled={!edit} precision={0} min={1} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CardTypeEditModal);
