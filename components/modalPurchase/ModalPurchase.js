import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select ,Table, List ,Row, Col, Divider ,DatePicker} from 'antd';
import moment from 'moment';

import styles from '../../routes/Ticket/style.less';
import DescriptionList from '../DescriptionList';

const FormItem = Form.Item;
const Option = Select.Option;
const { Description } = DescriptionList;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

class ModalPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePayment: false,
      visibleCheck: false,
    };
  }



  showModelHandler = (e) => {
      if (e) e.stopPropagation();

      if(this.props.typePurchase == "payment")
        this.setState({
          visiblePayment: true,
      });
      if(this.props.typePurchase == "check")
        this.setState({
          visibleCheck: true,
      });

  };

  hideModelHandler = () => {
    this.setState({
      visibleCheck: false,
      visiblePayment:false,
    });
  };

  onChange = () => {

  }

  okHandler = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        delete values.payeeAccount;
        delete values.advanceAmount;
        delete values.payeeBank;
        delete values.payeeName;
        values.id = this.props.listCheck.id;
        let a=values.payerDetail.split(',');
        values.payerName=a[0];
        values.payerBank=a[1];
        values.payerAccount=a[2];
        delete values.payerDetail;
        values.payTime = values.payTime.toISOString().slice(0, 10);
        console.log(values);
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
    const { children, typePurchase,listPayment: { obj: data }, listCheck } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    
    let optionPay = data.map(d => <Option value={d.payerName+','+d.bankName+","+d.bankAccount} >
        {d.payerName+"--"+d.bankName+"--"+d.bankAccount}
    </Option>);

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <span>
        <Modal
          title="付款"
          visible={this.state.visiblePayment}
          onOk={this.okHandler}
          okText="付款"
          onCancel={this.hideModelHandler}
          width= "60%"
        >
        
          <Form layout='horizontal' onSubmit={this.okHandler}  className={styles.supplierElementForm}>

          <FormItem  style={{marginBottom:10, marginLeft: 12 }} className={styles.hideMarginBottom }
                {...formItemLayout}
                label="待付款金额"
              >
              {
                getFieldDecorator('advanceAmount', {
                  initialValue:"¥"+listCheck.advanceAmount+""||'',
                })(
                  <Input disabled={true} ></Input>
                )
              }
            </FormItem>

            <FormItem  style={{marginBottom:10, marginLeft: 12 }} className={styles.hideMarginBottom }
                {...formItemLayout}
                label="收款方开户行"
              >
              {
                getFieldDecorator('payeeBank', {
                  initialValue:listCheck.payeeBank||'',
                })(
                  <Input disabled={true} ></Input>
                )
              }
            </FormItem>

            <FormItem  style={{marginBottom:10, marginLeft: 12 }} className={styles.hideMarginBottom }
                {...formItemLayout}
                label="收款方开户名称"
              >
              {
                getFieldDecorator('payeeName', {
                  initialValue:listCheck.payeeName||'',
                })(
                  <Input disabled={true} ></Input>
                )
              }
            </FormItem>

          <FormItem  style={{marginBottom:10, marginLeft: 12 }} className={styles.hideMarginBottom }
                {...formItemLayout}
                label="收款方账号"
              >
              {
                getFieldDecorator('payeeAccount', {
                  initialValue:listCheck.payeeAccount||'',
                })(
                  <Input disabled={true} ></Input>
                )
              }
            </FormItem>

            <FormItem  style={{marginBottom:10, marginLeft: 12 }} className={styles.hideMarginBottom }
                {...formItemLayout}
                label="付款日期"
              >
              {
                getFieldDecorator('payTime', {
                  initialValue:moment(Date.parse(new Date())),
                  rules: [{
                    required: true, message: '付款日期为必填项',
                  }],
                })(
                  <DatePicker format="YYYY-MM-DD" />
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="付款方开户行"
            >

              {
                getFieldDecorator('payerDetail', {
                  initialValue:'',
                  rules: [{
                    required: true, message: '付款方开户行为必填项',
                  }],
                })(
                  <Select
                    placeholder="选择付款账号"
                    >
                    {optionPay}
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
        </span>
        <span>
          <Modal
            title="查看"
            visible={this.state.visibleCheck}
            onOk={this.hideModelHandler}
            CancelText="返回"
            onCancel={this.hideModelHandler}
          >
            <DescriptionList size="large" title="付款详情" col={1}>

              <Description term="收款方开户行"> {this.props.listCheck.payeeBank} </Description>
              <Description term="收款方开户名称"> {this.props.listCheck.payeeName} </Description>
              <Description term="收款方开户账号"> {this.props.listCheck.payeeAccount} </Description>
              <Description term="付款方开户行"> {this.props.listCheck.payerBank} </Description>
              <Description term="付款方开户名称"> {this.props.listCheck.payerName} </Description>
              <Description term="付款方开户账号"> {this.props.listCheck.payerAccount} </Description>
              <Description term="付款金额"> {"¥"+this.props.listCheck.advanceAmount} </Description>
              <Description term="付款时间"> {moment(this.props.listCheck.purchase.purchaseTime).format('YYYY-MM-DD')} </Description>
            </DescriptionList>

          </Modal>
        </span>
      </span>
    );
  }
}

export default Form.create()(ModalPurchase);
