import React, { PureComponent } from 'react';
import { Button, Popconfirm, Divider, Radio, message, Table, Form, Input } from 'antd';
import { connect } from 'dva';
import style from './SetGeneral.less';
import AreaModal from './AreaModalAbroad';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
class AreaAbroadList extends React.Component {

  state = {
    data: [],
    pID: 1,
    status: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pID, status } = this.state;
    const val = {
      pID,
      status,
    };
    const params = Object.keys(val)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(val[k]))
      .join('&');
    dispatch({
      type: 'generalsetting/fetchAreaAbroad',
      payload: params,
      callback: () => {
        this.setState({ 
          data: this.props.list,
        });
      },
    });
  }

  tableChangeHandler = (pagination) => {
    let params = null;
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.name) == "undefined" || values.name == null) values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.page = pagination.current;
      values.rows = pagination.pageSize;
      values.pID = this.state.pID;
      values.status = this.state.status;
      params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
    });
    dispatch({
      type: 'generalsetting/fetchAreaAbroad',
      payload: params,
      callback: () => {
        this.setState({ 
          data: this.props.list,
        });
      },
    });
  }
  
  reloadHandler = (dispatch) => {
    let params = null;
    const { current, pageSize } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.name) == "undefined") values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.page = current;
      values.rows = pageSize;
      values.pID = this.state.pID;
      values.status = this.state.status;
      params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
    });
    dispatch({
      type: 'generalsetting/fetchAreaAbroad',
      payload: params,
      callback: () => {
        this.setState({ 
          data: this.props.list,
        });
      },
    });
  }

  editHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'generalsetting/updatearea',
      payload: values,
      callback: () => {
        const { success, msg } = this.props;
        if(success){
          message.success(msg);
          this.reloadHandler(dispatch);
        }else{
          message.error(msg);          
        }
      },
    });
  }

  createHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'generalsetting/addarea',
      payload: values,
      callback: () => {
        const { success, msg } = this.props;
        if(success){
          message.success(msg);
          this.reloadHandler(dispatch);
        }else{
          message.error(msg);          
        }
      },
    });
  }

  cancelHandler = (id) => {
    const { dispatch } = this.props;
    const cid = {id};
    dispatch({
      type: 'generalsetting/cancelarea',
      payload: cid,
      callback: () => {
        const { success, msg } = this.props;
        if(success){
          message.success(msg);
          this.reloadHandler(dispatch);
        }else{
          message.error(msg);          
        }
      },
    });    
  }

  restoreHandler = (id) => {
    const { dispatch } = this.props;
    const rid = {id};
    dispatch({
      type: 'generalsetting/restorearea',
      payload: rid,
      callback: () => {
        const { success, msg } = this.props;
        if(success){
          message.success(msg);
          this.reloadHandler(dispatch);
        }else{
          message.error(msg);          
        }
      },
    });
  }

  statusChange = (e) => {
    this.setState({ status: e.target.value }, () => {
      // this.props.form.resetFields();
      const { dispatch } = this.props;
      const {status, pID} = this.state;
      const val = {
        pID,
        status,
      };
      const params = Object.keys(val)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(val[k]))
        .join('&');
      dispatch({
        type: 'generalsetting/fetchAreaAbroad',
        payload: params,
        callback: () => {
          this.setState({ 
            data: this.props.list,
          });
        },
      });
    }); 
  }

  handleSearch = (e) => {
    e.preventDefault();
    
    const { dispatch, form } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.name) == "undefined") values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.pID = 1;
      values.status = this.state.status;
      const params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
      dispatch({
        type: 'generalsetting/fetchAreaAbroad',
        payload: params,
        callback: () => {
          this.setState({ 
            data: this.props.list,
          });
        },
      });
    });   
  }

  searchForm() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <FormItem 
          label="名称"
          {...formItemLayout}
        >
          {getFieldDecorator('name')(
            <Input placeholder="请输入地区名称" />
          )}
        </FormItem>
        <span>
          <Button type="primary" htmlType="submit">查询</Button>
        </span>
      </Form>
    );
  }

  render() {
    const { list, total, current, pageSize, loading } = this.props;
    const { data } = this.state;
    const columns = [
      {
        title: '地区',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
      }, {
        title: '排序',
        dataIndex: 'order',
        align: 'center',
        key: 'order',
        width: '15%',
      }, {
        title: '操作',
        key: 'action',
        width: '25%',
        align: 'center',
        render: (text, record, index) => (
          <span className={style.operation}>
            <AreaModal record={record} onOk={this.editHandler}>
              <a>编辑</a>
            </AreaModal>
            <Divider type="vertical" />
            {
              record.status === true ? 
                <Popconfirm title="确定取消该区域?" onConfirm={this.cancelHandler.bind(null, record.id)}>
                  <a>取消</a>
                </Popconfirm>
              :
                <Popconfirm title="确定恢复该区域?" onConfirm={this.restoreHandler.bind(null, record.id)}>
                  <a>恢复</a>
                </Popconfirm>
            }
        </span>
        ),
      },
    ];

    const showTotal = () => `显示 ${((current - 1) * pageSize) + 1} 到 ${current * pageSize > total ? total : current * pageSize} 条 , 共 ${total} 条记录`;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal,
      total,
      current,
      pageSize,
    };

    return (
      <div className={style.content}>
        <div className={style.toolBar}>
          <AreaModal record={{}} onOk={this.createHandler}>
            <Button type="primary" icon="plus">新建</Button>
          </AreaModal>
          <RadioGroup onChange={this.statusChange} defaultValue={true} style={{marginLeft: 12}}>
            <RadioButton value={true}>正常</RadioButton>
            <RadioButton value={false}>已取消</RadioButton>
          </RadioGroup>
          <div className={style.searchForm}>
            {this.searchForm()}
          </div>
        </div>
        {console.log(data)}
        {/* {data.length!=0 ? console.log("加载data"+data) : console.log("不加载加载data")} */}
        <Table
          size="middle"
          className={style.tablePagination}
          columns={columns}
          dataSource={data}
          rowKey={record => record.id}
          pagination={paginationProps}
          onChange={this.tableChangeHandler}
          bordered
        />
      </div>
    );
  }
}

export default connect(state => ({
  list: state.generalsetting.dataAreaAbroad.rows,
  current: state.generalsetting.dataAreaAbroad.pageNumber,
  total: state.generalsetting.dataAreaAbroad.total,
  pageSize: state.generalsetting.dataAreaAbroad.pageSize,
  loading: state.generalsetting.loading,
  success:state.generalsetting.actionres.success,
  msg:state.generalsetting.actionres.msg,
}))(AreaAbroadList);
