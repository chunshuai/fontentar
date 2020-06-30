import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import style from '../Table/SetGeneral.less';

const FormItem = Form.Item;

class NewRoleModal extends Component {
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
        if(typeof(values.id) == "undefined" || values.id == null) {
          delete values.id;
        }
        if(typeof(values.status) == "undefined" || values.status == null) {
          delete values.status;
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
    const { id, name, description, status } = this.props.record;
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
          title="角色"
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
              label="描述"
              className={style.inputnumber}
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                  rules: [{
                    required: true, message: '描述必填',
                  }],
                })(<Input rows={4} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(NewRoleModal);
