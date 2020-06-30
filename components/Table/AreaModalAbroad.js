import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import style from './SetGeneral.less';

const FormItem = Form.Item;
const Option = Select.Option;

class AreaModal extends Component {
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
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  };

  onChange = () => {

  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(typeof(values.order) == "undefined" || values.order == null) {
          values.order = '';
        }
        var esc = encodeURIComponent;
        var data = Object.keys(values)
          .map(k => esc(k) + '=' + esc(values[k]))
          .join('&');
        onOk(data);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, order, status, pid } = this.props.record;
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
            // label="id"
            >
              {
                getFieldDecorator('id', {
                  initialValue: id || '',
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
                  initialValue: status || true,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上级区域"
            >
              {
                getFieldDecorator('pID', {
                  initialValue: '1',
                  rules: [{
                    required: true, message: '上级区域为必填项',
                  }],
                })(<Select placeholder="请选择上级区域" style={{ width: '100%' }}>
                  <Option value="1">国外</Option>
                </Select>)
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
                })(<Input />)
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
                  }],
                })(<InputNumber precision={0} min={1} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AreaModal);
