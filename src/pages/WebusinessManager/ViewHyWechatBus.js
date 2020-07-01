import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from '../Forms/style.less';
import stylesDisabled from './ViewStore.less';
import { message } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const fieldLabels = {
  name: '微商名称',
  mobile: '手机号',
  address: '通信地址',
  wechatAccount: '微信号',
  isActive: '状当前态',
  wechatOpenId: '微信openid',
  url: '店铺网址',
  qrcodeUrl: '店铺二维码',
  referrer: '推荐人',
  shopName: '店铺名称',
  logo: '店铺logo',

};

@connect(state => ({
  hyWechatBusDetail: state.getDetailLbc,
  modifyHyWechatBus: state.modifyDataLbc,
}))
@Form.create()
export default class ViewHyWechatBus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      express: "明文",
      password: "password",
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const param = {
      id: this.props.location.query.name,
    };
    this.setState({
      disabled: this.props.location.query.disadled,
    });
    console.log(param);
    console.log(this.state);
    dispatch({
      type: 'getDetailLbc/getHyWechatBusDetail',
      payload: param,
    });
    console.log("didmount结束");
  }
  returnClick = () => {
    //const { dispatch } = this.props;
    //dispatch(routerRedux.push('list'));
    this.props.history.goBack();
  }
  return = (dispatch) => {
    //dispatch(routerRedux.push('list'));
    this.props.history.goBack();
  }
  passwordChange = () => {
    if (this.state.express === "明文") {
      this.setState({
        express: "暗文",
        password: "text",
      });
    }
    else {
      this.setState({
        express: "明文",
        password: "password",
      });
    }
  }

  validate = () => {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        values.id = this.props.location.query.name;
        var data = Object.keys(values)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
          .join('&');
        console.log("data是" + data);
        dispatch({
          type: 'modifyDataLbc/modifyHyWechatBus',
          payload: data,
          callback: () => {
            const { modifyHyWechatBus: { changeData } } = this.props;
            if (changeData.success === true) {
              message.success(changeData.msg);
              this.return(dispatch);
            }
            else {
              message.error(changeData.msg);
            }
          },
        });
      }
    });
  }
  render() {
    const { form, dispatch, submitting } = this.props;
    console.log("开始渲染");

    console.log(this.props);
    const { hyWechatBusDetail: { loading: storeLoading, hyWechatBusDetail } } = this.props;
    console.log(hyWechatBusDetail);
    console.log(hyWechatBusDetail.obj.qrcodeUrl);
    const qrcodeUrl_solve = "http://10.108.167.242:8080/" + hyWechatBusDetail.obj.qrcodeUrl;
    console.log(qrcodeUrl_solve);
    const { modifyHyWechatBus: { loading: storeSubmitting } } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout>
        <div>{
          storeLoading ? <div ><Spin /></div> :
            <Form layout='horizontal' hideRequiredMark className={stylesDisabled.disabled}>
              <Card title="基本信息" className={styles.card} bordered={false}>

                <Row >
                  <Col span={8}>
                    <FormItem label={fieldLabels.name} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('name', {
                        initialValue: hyWechatBusDetail.obj.name,
                      })
                        (<Input disabled={this.state.disabled} />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.wechatAccount} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('wechatAccount', {
                        initialValue: hyWechatBusDetail.obj.wechatAccount,
                      })(
                        <Input disabled={this.state.disabled} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.wechatOpenId} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('wechatOpenId', {
                        initialValue: hyWechatBusDetail.obj.wechatOpenId,
                      })(
                        <Input disabled={true} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <FormItem label={fieldLabels.isActive} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('isActive', {
                        initialValue: hyWechatBusDetail.obj.isActive ? "1" : "0",
                      })(
                        <Select style={{ width: 100 }} disabled={this.state.disabled} >
                          <Option value="1">有效</Option>
                          <Option value="0">无效</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem label={fieldLabels.mobile} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('mobile', {
                        initialValue: hyWechatBusDetail.obj.mobile,
                      })(
                        <Input disabled={this.state.disabled} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.address} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('address', {
                        initialValue: hyWechatBusDetail.obj.address,
                      })(
                        <Input disabled={this.state.disabled} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>

                  <Col span={8}>
                    <FormItem label={fieldLabels.shopName} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('shopName', {
                        initialValue: hyWechatBusDetail.obj.shopName,
                      })(
                        <Input disabled={true} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.referrer} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('referrer', {
                        initialValue: hyWechatBusDetail.obj.referrer,
                      })(
                        <Input disabled={true} />
                      )}
                    </FormItem>
                  </Col>


                  <Col span={8}>
                    <FormItem label={fieldLabels.url} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {getFieldDecorator('url', {
                        initialValue: hyWechatBusDetail.obj.url,
                      })(
                        <Input disabled={true} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.logo} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {/* {getFieldDecorator('qrcodeUrl',{
initialValue:storeDetail.obj.qrcodeUrl})(
<Input type='image' src={ storeDetail.obj.qrcodeUrl } disabled={this.state.disabled}/>
)}  */}
                     {hyWechatBusDetail.obj.logo?<a href={hyWechatBusDetail.obj.logo} target="_blank"><img src={hyWechatBusDetail.obj.logo} height="150" width="150"></img></a>:" "}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={fieldLabels.qrcodeUrl} wrapperCol={{ span: 18, offset: 1 }} labelCol={{ span: 4, offset: 0 }}>
                      {/* {getFieldDecorator('qrcodeUrl',{
initialValue:storeDetail.obj.qrcodeUrl})(
<Input type='image' src={ storeDetail.obj.qrcodeUrl } disabled={this.state.disabled}/>
)}  */}
                      <a href={hyWechatBusDetail.obj.qrcodeUrl} target="_blank"><img src={hyWechatBusDetail.obj.qrcodeUrl} height="150" width="150"></img></a>
                    </FormItem>
                  </Col>


                </Row>
              </Card>

            </Form>
        }
        </div>
        <FooterToolbar>
          {getErrorInfo()}
          {!this.props.location.query.disadled ?
            <Button type="primary" onClick={this.validate} loading={storeSubmitting}>
              提交
          </Button > : <div></div>}
          <Button type="primary" onClick={this.returnClick}>
            返回
          </Button >
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
