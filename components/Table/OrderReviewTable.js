import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber,Select,Table, message, Button} from 'antd';
import styles from './AddOrderDeliverMadal.less';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(state => ({
  detailOrder: state.orderManage.orderDetail.obj.orderItems,
  productRepertory: state.orderManage.productRepertory.obj,
  orderDetailLoading: state.orderManage.orderDetailloading,
  actionres: state.orderManage.actionres,
}))
class OrderReviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [
        // {
        //   id:'1',
        //   name:'菠萝',
        //   specificationname:'一箱',
        //   quantity:'10',
        //   key:'1',
        // },{
        //   id:'2',
        //   name:'香蕉',
        //   specificationname:'1捆',
        //   quantity:'10',
        //   key:'2',
        // },
      ],
      deliver:[{
        name:'廊坊仓库',
      },{
        name:'保定仓库',
      }],
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
          console.log(data1);
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = values.orderreview;
        console.log(values);
        let data = {
          id:this.props.id,
          isDivided:false,
          items:[],
        };
        for(var i=0; i<values.length; i++) {
          var temp = values[i];
          console.log(temp);
          if(temp.deliverType !== 0 && temp.deliverType !== 1) {
            message.error("请选择发货类型");
            return false;
          }
          if(temp.deliverType == 0 && !temp.depotName) {
            message.error("请选择发货仓库");
            return false;
          }
          if(temp.deliverType == 0) {
            let { id, deliverType, depotName } = temp;
            data.items.push({
              id: parseInt(id),
              deliverType,
              depotName,
            });
          }
          if(temp.deliverType == 1) {
            data.isDivided = true;
            let { id, deliverType } = temp;
            data.items.push({
              id: parseInt(id),
              deliverType,
              depotName: null,
            });
            console.log(data);
          }
        }
        console.log(data);
        this.props.dispatch({
          type: 'orderManage/fetchAuditOrder',
          payload: data,
          callback: () => {
            const { success, msg } = this.props.actionres;
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
  unokHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data={};
        data['id']=this.props.id;
        this.props.dispatch({
          type: 'orderManage/fetchunAuditOrder',
          payload: data,
          callback: () => {
            const { success, msg } = this.props.actionres;
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
  index = 0;
  cacheOriginData = {};
  toggleEditable(e, key) {
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: [...this.state.data] });
    }
  }
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }

  handleSelectChange(value, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
    target[fieldName] = value;
    target['depotName'] = value;
    this.setState({ data: newData });
    }
  }
  handleTypeChange(value, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = value;
      target['deliverType'] = value;
      if(value===1){
        target['depotName'] = null;
      }
      console.log(target);
      this.setState({ data: newData });
    }
  }
  render() {
    const { children } = this.props;//children是指LanguageList页面里的编辑标签：<a>编辑</a>
    const { getFieldDecorator } = this.props.form;
    const { id } = this.props;
    // const deliverData=this.state.deliver.map(d => <Option key={d.name}>{d.name}</Option>);
    const deliverData=this.props.productRepertory.map(d => <Option key={d.name}>{d.name}</Option>);
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
     },{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className:styles.hidden,
     },{
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
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (text, record) => {
        return text;
      },
    }, {
      title: '发货类型',
      dataIndex: 'deliverType',
      key: 'deliverType',
      align: 'center',
      render: (text, record) => {
          if(this.props.isEdit) {
            return (
              <Select
                 onChange={e => this.handleTypeChange(e, 'deliverType', record.key)}
                 value={ text }
                 style={{width:90}}
              >
                {record.type !== 1 ?
                    [<Option key={0} value={0}>平台</Option>,
                    <Option key={1} value={1}>供应商</Option>]
                  : <Option key={0} value={0}>平台</Option>}
             </Select>
            );
          } else {
            return text===0?'平台':'供应商';
          }
      },
    }, {
     title: '发货仓库',
     dataIndex: 'depotName',
     key: 'depotName',
     align: 'center',
     render: (text, record) => {
       if(record.deliverType===0 && this.props.isEdit){
        return (
          <Select
             onChange={e => this.handleSelectChange(e, 'deliverName', record.key)}
            //  value={ text }
             style={{width:120}}
          >
          {/* {deliverData} */}
          {record.depotList.map(d => <Option key={d}>{d}</Option>)}
         </Select>
        );
       }else{
        return text;
      }
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
              <Button key="submit" type="primary" onClick={this.okHandler}>确定</Button>,
              <Button  type="primary" onClick={this.unokHandler}>拒审</Button>,
            ]
            :
            [
              <Button key="back" onClick={this.hideModelHandler}>返回</Button>,
            ]
          }
        >
        <div>
        {getFieldDecorator('orderreview', {
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

export default Form.create()(OrderReviewTable);
