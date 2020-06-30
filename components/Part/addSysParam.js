import React, {PureComponent } from 'react';
import { Modal, Form, Input, Table,Row,Col,Button,InputNumber  } from 'antd';
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
class AddSystemParam extends PureComponent {
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
        if(typeof(values.settingName) == "undefined" || values.settingName == null) {
          values.settingName = '';
        }
        if(typeof(values.settingValue) == "undefined" || values.settingValue == null) {
            values.settingValue = '';
          }
        if(values.id==''){
            delete values.id;
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
    const { id, settingName, settingValue} = this.props.record;
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
              label="参数名称"
            >
              {
                getFieldDecorator('settingName', {
                  initialValue: settingName || '',
                  rules: [{ required: true, message: '请输入参数名称' }],
                })(<Input  disabled={this.props.disabled} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="参数值"
            >
              {
                getFieldDecorator('settingValue', {
                  initialValue: settingValue || '',
                  rules: [{ required: true, message: '请输入参数值' }],
                })( <Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AddSystemParam);
