import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import styles from './LanguagesModal.less';

const FormItem = Form.Item;

class LanguagesEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();//阻止事件冒泡到父元素，阻止任何父事件处理程序被执行
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

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;//children是指LanguageList页面里的编辑标签：<a>编辑</a>
    const { getFieldDecorator } = this.props.form;
    const { id, name, orders } = this.props.record;
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
          title="编辑语种"
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
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="语种名称"
            >
              {//getFieldDecorator(id,options):
               //id必填输入控件唯一标志。支持嵌套式的写法;
               //options.initialValue子节点的初始值，类型、可选值均由子节点决定
               //options.rules校验规则
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '名称为必填项',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {
                getFieldDecorator('orders', {
                  initialValue: orders,
                  // rules: [{
                  //   type: 'number', message: '序号必须为数字',
                  // }],
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(LanguagesEditModal);
