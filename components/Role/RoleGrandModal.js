import React, { Component } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';
import style from '../Table/SetGeneral.less';
import Ellipsis from '../Ellipsis';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(state => ({
  authList: state.generalsetting.roles,
  loading: state.generalsetting.loading,
}))
class RowGrandModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'generalsetting/fetchRoles',
  //   })
  // }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'generalsetting/fetchRoles',
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
        if(typeof(values.subRoleIds) == "undefined" || values.subRoleIds == null) {
          values.subRoleIds = [];
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
    const { id, name, description, status, subRoles } = this.props.record;
    const rows = this.props.authList.obj;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    
    const selectOptions = [];
    for (let i = 0; i < rows.length; i++) {
      selectOptions.push(<Option value={rows[i].id}>
        {rows[i].name}
        {/* <h4>{rows[i].name}</h4> */}
        {/* <Ellipsis length={20}>{rows[i].description}</Ellipsis> */}
        </Option>);
    }

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={ 
            [
              <Button key="back" onClick={this.hideModelHandler}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.okHandler}>确定</Button>,
            ]
          }
        >
          <Form layout='horizontal' onSubmit={this.okHandler} className={style.ctmodal}>
            <FormItem
              {...formItemLayout}
            // label="id"
            >
              {
                getFieldDecorator('roleId', {
                  initialValue: id,
                })(<Input type='hidden' />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="请选择角色："
            >
              {
                getFieldDecorator('subRoleIds', {
                  initialValue: subRoles.map(k => {return k.id}),
                })(<Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="请选择..."
                    >
                      {selectOptions}
                    </Select>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RowGrandModal);
