import React from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Card, Form, Input, Select, Button, message, Popconfirm, Divider, Table, Cascader } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../SupplierManage/SupplierList.less';


const FormItem = Form.Item;
const Option = Select.Option;

@connect(state => ({
  productData: state.getData.productData,
  loading: state.getData.loading,
  success: state.getData.productData.success,
  msg: state.getData.productData.msg,
  menuList: state.getData.MenuList.obj,
  provider: state.getData.supplierSelect.obj,
  sidemenuAuth: state.global.sidemenu.obj.checkedRange,
}))
@Form.create()
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      categoryid:'',
      data: [],
      }
    }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'getData/getProduct',
    });
    dispatch({
      type: 'getData/getMenuList',
    });
    dispatch({
      type: 'getData/getSpecialtySupplier',
      callback: () => {
          this.setState({
              data: this.props.provider,
          });
      },
  });
  }

  handleStandardTableChange = (pagination) => {
    let params = null;
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (typeof (values.providerid) == "undefined" || values.providerid == null) delete values.providerid;
      if (typeof (values.deliverType) == "undefined" || values.deliverType == null) delete values.deliverType;
      if (typeof (values.shipType) == "undefined" || values.shipType == null) delete values.shipType;
      if (typeof (values.name) == "undefined" || values.name == null) values.name = '';
      values.name=values.name.replace(/\s+/g,'');
      if(values.name == '') delete values.name;
      values.page = pagination.current;
      values.rows = pagination.pageSize;
      if(this.state.categoryid!=''){
        values.categoryid=this.state.categoryid;
      }
      dispatch({
        type: 'getData/getProduct',
        payload: values,
      });
    });
  }

  newHandler = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('product-manage/add-product'));
  }


  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      if (typeof (values.providerid) == "undefined" || values.providerid == null) delete values.providerid;
      if (typeof (values.deliverType) == "undefined" || values.deliverType == null) delete values.deliverType;
      if (typeof (values.shipType) == "undefined" || values.shipType == null) delete values.shipType;
      if (typeof (values.name) == "undefined" || values.name == null) values.name = '';
      values.name=values.name.replace(/\s+/g,'');
      if(values.name == '') delete values.name;      if(this.state.categoryid!=''){
        values.categoryid=this.state.categoryid;
      }
      dispatch({
        type: 'getData/getProduct',
        payload: values,
      });
    });
  }
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    if(this.state.categoryid == ''){
      dispatch({
        type: 'getData/getProduct',
      });
    }
    else{
      const param = {
        categoryid:this.state.categoryid,
      };
      dispatch({
        type: 'getData/getProduct',
        payload: param,
      });
    }
  }
  onChange = (value) => {
    const { form, dispatch } = this.props;
    form.resetFields();
      if(value.length !=0){
        this.setState({
          categoryid:value[value.length-1],
        });
        const param={
          categoryid:value[value.length-1],
        };
        dispatch({
          type: 'getData/getProduct',
          payload: param,
        });
      }
      else{
        this.setState({
          categoryid:'',
        });
        dispatch({
          type: 'getData/getProduct',
        });
      }
  }
  searchForm() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };
    const options = this.state.data.map(d => <Option value={d.id}>{d.providerName}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {/* <FormItem label="发货类型">
          {getFieldDecorator('deliverType')(
            <Select style={{ width: 80 }}>
              <Option value={0}>供应商</Option>
              <Option value={1}>商城</Option>
            </Select>)}
        </FormItem>
        <FormItem label="送货类型">
          {getFieldDecorator('shipType')(
            <Select style={{ width: 110 }}>
              <Option value={0}>送货到家</Option>
              <Option value={1}>加钱送货到家</Option>
            </Select>)}
        </FormItem> */}
        <FormItem label="特产供应商">
          {getFieldDecorator('providerid')(
            <Select
                style={{ width: 155 }}
                showSearch
                optionFilterProp="children"
                placeholder="请选择供应商"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
             >
            {options}
            </Select>)}
        </FormItem>
        <FormItem label="特产名称">
          {getFieldDecorator('name')(
            <Input placeholder="请输入特产名称" style={{ width: 160 }}/>
          )}
        </FormItem>
        <span>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
        </span>
      </Form>
    );
  }

  render() {
    const { menuList,loading, productData: { success, msg, obj: data }, sidemenuAuth, match } = this.props;
    const { rows: list, pageNumber: current, pageSize, total } = data;
    const currentUrl = match.url;
    const arr = sidemenuAuth.filter(v => currentUrl === v.fullUrl);
    const columns = [
      {
        title: '',
        key: 'rowNumber',
        width: 50,
        align: 'center',
        render: (text, record, index) => <span>{index + 1 + ((current - 1) * pageSize)}</span>,
      },
      {
        title: '特产编号',
        dataIndex: 'code',
        key: 'code',
        width:110,
        align: 'center',
      },
      {
        title: '特产名称',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
        width:300,
      },
      {
        title: '分区',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
        render: val => <span>{val?val.name:""}</span>,
      },
      // {
      //   title: '产地',
      //   dataIndex: 'originalPlace',
      //   key: 'originalPlace',
      //   align: 'center',
      // },
      {
        title: '供应商',
        dataIndex: 'provider',
        key: 'provider',
        align: 'center',
        render: val => <span>{val?val.providerName:""}</span>,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        render: val => (<span>{moment(val).format('YYYY-MM-DD')}</span>),
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      key: 'creatorName',
      align: 'center',
      render: val => <span>{val?val:""}</span>,
    },
      // {
      //   title: '发货类型',
      //   dataIndex: 'deliverType',
      //   key: 'deliverType',
      //   align: 'center',
      //  render: text => (
      //     <span>{text===null?"":(text===0?"供应商":"商城")}</span>
      //   ),
      // },
      // {
      //   title: '送货类型类型',
      //   dataIndex: 'shipType',
      //   key: 'shipType',
      //   align: 'center',
      //  render: text => (
      //     <span>{text===null?"":(text===0?"送货到家":"加钱送货到家")}</span>
      //   ),
      // },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) => (
            <span>
              {record.privilege == "view" ?
                 <Link to={{ pathname: "product-manage/product-detail", params: { id: record.id, isEdit: false } }}>查看</Link>
                  :
                  <div>
                <Link to={{ pathname: "product-manage/product-detail", params: { id: record.id, isEdit: false } }}>查看</Link>
                <Divider type="vertical" />
                <Link to={{ pathname: "product-manage/product-detail", params: { id: record.id, isEdit: true } }}>编辑</Link>              
                </div>
                }
            </span>
        ),
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['3', '10', '20'],
      pageSize,
      current,
      total,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div>
            <div className={styles.toolBar} >
            {
                sidemenuAuth.length>0 && arr.length>0 && arr[0].co !== 'view' ?
                <Button type="primary" icon="plus" onClick={this.newHandler} style={{marginRight:10}}>新建</Button>
                : <span />
              }
            <Cascader options={menuList} onChange={this.onChange} changeOnSelect style={{width:185,marginRight:10}} placeholder="请选择特产种类"/>

              <div className={styles.searchForm}>
               {this.searchForm()}
              </div>
            </div>
            <div>
              <Table
                dataSource={list}
                loading={loading}
                onChange={this.handleStandardTableChange}
                columns={columns}
                pagination={paginationProps}
                rowKey={record => record.id}
              />
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
