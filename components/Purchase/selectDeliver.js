import React, { PureComponent } from 'react';
import { DatePicker,Select,Divider, message, Modal, Form, Table, Row, Col, Button, Cascader, Checkbox, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 7},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 15},
      md: {span: 10},
    },
  };
@connect(state => ({
    productList: state.getData.productList.obj,
    // shipCompany: state.getData.shipCompany.obj,
    specification: state.getData.specification.obj,

}))
class SelectDeliver extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            shipCompany: [],
            shipDate:'',
            shipCode:'',
            shipCompanyName:'',
            // shipCompanyId:'',
        };
    }
    componentDidMount() {
        // const { dispatch } = this.props;
        // console.log("componentDidMount");
        // dispatch({
        //     type: 'getData/getShipCompany',
        //     callback: () => {
        //         console.log("callback");
        //         console.log(this.props.shipCompany);
        //         this.setState({
        //             shipCompany: this.props.shipCompany,
        //         });
        //     },
        // });
    }
    showModelHandler = (e) => {
        const { dispatch } = this.props;
        this.setState({
            visible: true,
        });
    };

    handleTableChange = (pagination) => {
    };
    hideModelHandler = () => {
        this.setState({
            visible: false,
            specification: [],
            productList: [],
        });
    };

    selectedRow = (record, selected, selectedRows) => {
    };

    handleSearch = (e) => {

    };

    okHandler = (e) => {
        const { onOk } = this.props;
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, values) => {
          if (err) return;
          if(values.shipDate){
          values.shipDate=values.shipDate.toISOString();
          }
        //   const companyName=this.state.shipCompany.filter(v => values.shipCompany === v.id );
          console.log()
          this.setState({
            shipDate: values.shipDate,
            // shipCompanyId:values.shipCompany,
            shipCode:values.shipCode,
            shipCompanyName:values.shipCompany,
          }, ()=>{
              onOk(this.state.shipDate,this.state.shipCode, this.state.shipCompanyName);
          });
        });
        // if (this.state.specificationid === '' || this.state.specialtyid === '') {
        //     message.error("请选择完整信息再点击确认");
        //     return;
        // }
        // else {
        //     onOk(this.state.specificationid, this.state.specialtyid, this.state.specialtyname, this.state.specificationname);
        //     this.hideModelHandler();
        // }
    };
    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const options = this.state.shipCompany.map(d => <Select.Option value={d.id}>{d.shipCompany}</Select.Option>);
        return (
            <span >
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal
                    title="添加物流信息"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                >
                    <Form layout='horizontal' >
                        <FormItem
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('id', {
                                    // initialValue: id || '',
                                })(<Input type='hidden' />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="物流单号"
                        >
                            {
                                getFieldDecorator('shipCode', {
                                    // initialValue: issueType || '',
                                    rules: [{ required: true, message: '物流单号' }],
                                })(<Input  placeholder="请输入物流单号"/>)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="物流名称"
                        >
                            {
                                getFieldDecorator('shipCompany', {
                                    // initialValue: rebateRatio || '',
                                    rules: [{ required: true, message: '请选择物流名称' }],
                                })(<Input  placeholder="请选择物流名称"/>
                                // <Select
                                //     showSearch
                                //     optionFilterProp="children"
                                //     placeholder="请选择物流名称"
                                //     filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                // >
                                //     {options}
                                // </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="发货时间"
                        >
                            {
                                getFieldDecorator('shipDate', {
                                    // initialValue: rebateRatio || '',
                                    rules: [{ required: true, message: '请选择发货时间' }],
                                })( <DatePicker style={{ width: 120 }}/>)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default Form.create()(SelectDeliver);
