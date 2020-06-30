import React, {PureComponent } from 'react';
import { Modal, Form, Input, Table,Row,Col,Button,InputNumber,Checkbox  } from 'antd';
import { connect } from 'dva';
import style from './generalstyle.less';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
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
class AddWareHouse extends PureComponent {
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
        if(typeof(values.name) == "undefined" || values.name == null) {
          values.settingName = '';
        }
        values.name = values.name.replace(/\s+/g,'');
        if(typeof(values.address) == "undefined" || values.address == null) {
            values.settingValue = '';
          }
        values.address = values.address.replace(/\s+/g,'');
        if(typeof(values.id) == "undefined"|| values.id == null||values.id == "" ){
            delete values.id;
        }
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, address,manage,isValid} = this.props.record;
    const array=[];
    if(manage){
     for(let i=0;i<manage.length;i++){
      array.push(manage[i].label);
     }
    }
    console.log(manage);
    console.log("manage");

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
                getFieldDecorator('isValid', {
                  initialValue: isValid || '',
                })(<Input type='hidden' />)
              }
            </FormItem>
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
              label="仓库名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name || '',
                  rules: [{ required: true, message: '请输入仓库名称' }],
                })(<Input  disabled={this.props.disabled} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="仓库地址"
            >
              {
                getFieldDecorator('address', {
                  initialValue: address || '',
                  rules: [{ required: true, message: '请输入仓库地址' }],
                })( <Input disabled={this.props.disabled}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库管员"
            >
              {
                getFieldDecorator('manage', {
                  initialValue: array || [],
                  rules: [{ required: true, message: '请选择库管员' }],
                })(<CheckboxGroup options={this.props.manageList}  />)
              }
            </FormItem>
          </Form>
        </Modal>
        {/* <Modal
          title="编辑区域"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout='horizontal' onSubmit={this.okHandler} className={style.ctmodal}>
            <FormItem
              {...formItemLayout}
              label="仓库名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name || '',
                  rules: [{ required: true, message: '请输入仓库名称' }],
                })(<Input  disabled={this.props.disabled} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="仓库地址"
            >
              {
                getFieldDecorator('address', {
                  initialValue: address || '',
                  rules: [{ required: true, message: '请输入仓库地址' }],
                })( <Input />)
              }
            </FormItem>
          </Form>
        </Modal> */}
      </span>
    );
  }
}

export default Form.create()(AddWareHouse);
