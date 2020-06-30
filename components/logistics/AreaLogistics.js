import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select ,Table} from 'antd';
import {connect} from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

@connect(state => ({
  showData:state.logistics.showData.obj.rows,
  company:state.logistics.LogisticCompany,
}))

class AreaLogistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      company:[],
    };
  }

  downshowData = () =>{
    const { dispatch ,orderid,isDivided} = this.props;
    console.log(orderid);
    const param = {
      // page:1,
      // rows:20,
      orderId:orderid,
    };
    dispatch({
      type: 'logistics/getshowData',
      payload:param,
    });
    dispatch({
      type: 'logistics/getLogisticCompany',
      callback: () => {
          this.setState({
            company: this.props.company.obj,
          }); 
      },
  });
  }



  showModelHandler = (e) => {
    this.downshowData();
    console.log(this.props.showData);
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = () => {

  }

  okHandler = (e) => {
    e.preventDefault();
    const { onOk, orderid } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.order = orderid;
        if(values.type==true) values.type=1;
        if(values.type==false) values.type=0;
        var esc = encodeURIComponent;
        var data = Object.keys(values)
          .map(k => esc(k) + '=' + esc(values[k]))
          .join('&');
        onOk(data);
        this.hideModelHandler();
      }
    });

  }




  render() {
    const { children,isDivided,isAudit } = this.props;
    const { getFieldDecorator } = this.props.form;

    const options = this.state.company.map(d => <Option value={d.shipCompany}>{d.shipCompany}</Option>);

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };


    const columns = [{
      title: '商品名称',
      dataIndex: 'name',
    }, {
      title: '商品规格',
      dataIndex: 'specification',
    }, {
      title: '数量',
      dataIndex: 'quantity',
    }];



    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="商品明细"
          visible={this.state.visible}
          onOk={this.okHandler}
          okText="发货"
          onCancel={this.hideModelHandler}
        >
          <Table
              columns={columns}
              dataSource={this.props.showData}
              pagination={false}
              bordered
            />

          <Form layout='horizontal' onSubmit={this.okHandler} >
            {/* <FormItem
              {...formItemLayout}
              label="发货人"
            >
              {
                getFieldDecorator('deliveror', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '发货人为必填项',
                  }],
                })(<Input />)
              }
            </FormItem> */}
            <FormItem
              {...formItemLayout}
              style={{marginTop:'40px'}}
              label="发货类型"
            >
              {
                getFieldDecorator('type', {
                  initialValue: isDivided,
                  rules: [{
                    required: true, message: '发货类型为必填项',
                  }],
                })(
                  <Select
                  showSearch
                  disabled={isAudit}
                  style={{ width: 220 }}
                  optionFilterProp="children"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}  >
                    <Option value= {true}>供货商发货</Option>
                    <Option value= {false}>商城发货</Option>
                  </Select>)
              }
            </FormItem>

            <FormItem             
             {...formItemLayout}
              label="物流公司"
            >
              {
                getFieldDecorator('shipCompany', {
                rules: [{ required: true, message: '请选择物流公司' }],
                })(
                  <Select
                   style={{ width: 220 }}
                   showSearch
                   optionFilterProp="children"
                   placeholder="请选择物流公司"
                   filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                   >
                   {options}
                   </Select >
                  )}
             </FormItem>

            <FormItem
              {...formItemLayout}
              label="快递单号"
            >
              {
                getFieldDecorator('shipCode', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '快递单号为必填项',
                  }],
                })(<Input   style={{ width: 220 }}/>)
              }
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AreaLogistics);
