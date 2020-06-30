import React, { Component } from 'react';
import { InputNUmber,Table,Modal, Form, Input, InputNumber, Button, Select , message } from 'antd';
import styles from './AddOrderDeliverMadal.less';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
@connect(state => ({
  detailOrder: state.orderManage.orderDetail.obj.orderItems,
  changeDataLoading: state.modifyData.loading,
  changeData: state.modifyData.changeData,
}))
class SpecialRefundConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    const { dispatch } = this.props;
    if(this.props.id!=undefined){
      const param = {
        orderid:this.props.id,
      };
      dispatch({
        type: 'orderManage/getOrderDetail',
        payload: param,
        callback: () => {
          let data1 = [...this.props.detailOrder];
          data1.forEach(function(item) {
            item.key = item.id;
          });
          this.setState({
            data: data1,
          });
        },
      });
    }
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
    // console.log(decodeURI('%e5%a4%a7%e5%ae%a2%e6%88%b7%e8%b4%ad%e4%b9%b0%e7%94%b5%e5%ad%90%e5%88%b8%e7%bb%9f%e8%ae%a1'));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log("values");
        let data = {
          id:this.props.id,
          eRefundAmount:values.eRefundAmount,
          items:[],
        };
        for(let i=0;i<values.items.length;i++){
          if(values.items[i].isDelivered===null){
            message.error('请填写是否退货');
            return ;
          }
          if(values.items[i].lost1Quantity===undefined){
            message.error('请填写计损数量');
            return ;
          }
          data.items.push({
            id: parseInt(values.items[i].id),
            isDelivered:values.items[i].isDelivered,
            lost1Quantity:values.items[i].lost1Quantity,
          });
        }
        console.log(data);
        this.props.dispatch({
          type: 'modifyData/confirmation',
          payload: data,
          callback: () => {
            const { success, msg } = this.props.changeData;
            if(success) {
              message.success(msg);
              this.hideModelHandler();
              this.props.onOK();
            }
            else message.error(msg);
          },
        });
      }
    });
  };

  getRowByKey(key) {
    return this.state.data.filter(item => item.key === key)[0];
  }
  handleNumChange(value, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
    target[fieldName] = value;
    this.setState({ data: newData });
    }
  }

  checkeRefundAmount = (rule, value, callback) =>{
    const eRefundAmount = this.props.record.refoundMoney;
    if (value) {
      if (value > eRefundAmount) {
        callback('少退金额不大于实际退款金额');
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
  render() {
    const { children, id } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const columns = [{
      title: '',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => (
        <span>{index + 1}</span>
      ),
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: styles.hidden,
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record) => {
        return text;
      },
    }, {
      title: '规格包装',
      dataIndex: 'specificationname',
      key: 'specificationname',
      align: 'center',
      render: (text, record) => {
        return text;
      },
    }, {
      title: '退货数量',
      dataIndex: 'returnQuantity',
      key: 'returnQuantity',
      align: 'center',
      render: (text, record) => {
        return text;
      },
    }, {
      title: '计损数量',
      dataIndex: 'lost1Quantity',
      key: 'lost1Quantity',
      align: 'center',
      render: (text, record) => {
          return (
            <InputNumber
              onChange={e => this.handleNumChange(e, 'lost1Quantity', record.key)}
              value={text}
              style={{ width: 90 }}
              precision={1}  
              min={0}
              step={0.1}
              max={record.returnQuantity}
            >
            </InputNumber >
          );
        },
      }, {
        title: '是否退货',
        dataIndex: 'isDelivered',
        key: 'isDelivered',
        align: 'center',
        render: (text, record) => {
              return (
                <Select
                   onChange={e => this.handleNumChange(e, 'isDelivered', record.key)}
                   value={ text }
                   style={{width:90}}
                >
                  <Option key={1} value={1}>是</Option>
                  <Option key={0} value={0}>否</Option>
               </Select>
              );
        },
      }]

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="审核订单"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          width="800px"
          footer={this.props.isEdit ? 
            [
              <Button key="back" onClick={this.hideModelHandler}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.okHandler} loading={this.props.loading}>确定</Button>,
            ]
            :
            [
              <Button key="back" onClick={this.hideModelHandler}>返回</Button>,
            ]
          }
        >
        <div>
        <Form layout="inline" style={{marginBottom:20}}>
        <FormItem label="少退金额">
          {getFieldDecorator('eRefundAmount',{
             rules: [{ required: true, message: '请输入少退金额' },{
              validator: this.checkeRefundAmount,
            }],
          })(
            <InputNumber precision={2}  min={0}  step={0.01} style={{width:120}}/>
            )}
        </FormItem>
        </Form>
        {getFieldDecorator('items', {
              initialValue: this.state.data,
             }
        )(<Table
          bordered
          size="middle"
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowKey={record => record.id}
          rowClassName={styles.editable}
  
        />)}
       </div>
      </Modal>
      </span>
    );
  }
}

export default Form.create()(SpecialRefundConfirm);
