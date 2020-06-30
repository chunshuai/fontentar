import React, { PureComponent } from 'react';
import { Button, Popconfirm, Divider, message, Table, Form, Input } from 'antd';
// import Table from 'rc-table';
// import 'rc-table/assets/index.css';
import { connect } from 'dva';
import style from './SetGeneral.less';
import AreaModal from './AreaModalDomestic';

const FormItem = Form.Item;

@Form.create()
class AreaDomesticList extends React.Component {

  state = {
    // status: true,
    data: [],
    val: {
      pID: 0,
    },
    current: null,
    pageSize: null,
    total: null,
    combodata: null,
    expandedRowKeys: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { val } = this.state;
    const params = Object.keys(val)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(val[k]))
      .join('&');
    dispatch({
      type: 'generalsetting/fetchAreaDomestic',
      payload: params,
      callback: () => {
        const { list, currentPage, pageSie, total1 } = this.props;
        this.setState({ 
          data: list,
          current: currentPage,
          pageSize: pageSie,
          total: total1,
        });
        console.log("componentDidMountdata");
        console.log(this.state.data);
        this.combotextlistHandler(dispatch);
      },
    });
  }

  combotextlistHandler = (dispatch) => {
    const id = 0;
    const value1 = {id};
    dispatch({
      type: 'generalsetting/fetchAreaDomesticCombotext',
      payload: value1,
      callback: () => {
        this.setState({ 
          combodata: this.props.combotextlist,
        });
      },
    });
  }

  tableChangeHandler = (pagination) => {
    let params = null;
    const { dispatch } = this.props;
    const { val } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.name) == "undefined") values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.page = pagination.current;
      values.rows = pagination.pageSize;
      values.pID = 0;
      params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
    });
    dispatch({
      type: 'generalsetting/fetchAreaDomestic',
      payload: params,
      callback: () => {
        const { list, currentPage, pageSie, total1 } = this.props;
        this.setState({ 
          data: list,
          current: currentPage,
          pageSize: pageSie,
          total: total1,
          expandedRowKeys: [],
        });
      },
    });
  }
  
  reloadHandler = (dispatch) => {
    let params = null;
    const { val, current, pageSize, total } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.setState({ 
        data: [],
      });
      if(typeof(values.name) == "undefined") values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.page = current;
      values.rows = pageSize;
      values.pID = 0;
      params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
    });
    dispatch({
      type: 'generalsetting/fetchAreaDomestic',
      payload: params,
      callback: () => {
        const { list, currentPage, pageSie, total1 } = this.props;
        this.setState({ 
          data: list,
          current: currentPage,
          pageSize: pageSie,
          total: total1,
          expandedRowKeys: [],
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
          this.combotextlistHandler(dispatch);
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
          this.combotextlistHandler(dispatch);
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

  onExpand = (expanded,record) => {
    console.log("onExpand"+expanded);
    console.log("record"+record.children.length+record.id);
    if(expanded && record.children.length==0){
      const { dispatch } = this.props;
      const { data } = this.state;
      const pID = record.id;
      const values = {pID};
      values.page = 1;
      values.rows = 80;
      const params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
      dispatch({
        type: 'generalsetting/fetchAreaDomestic',
        payload: params,
        callback: () => {
          const subData = this.props.list;
          console.log("subData"+subData);
          if(subData) {
            const tp = this.findTreePath(pID, data);
            console.log('tp'+tp);
            let odata = data;
            console.log('odata'+odata);
            tp.length == 1 ? odata[tp[0]].children=subData : odata[tp[0]].children[tp[1]].children=subData;
            this.setState({ 
              data: odata,
            });
          }
        },
      });
    }
  }

  findTreePath = (pid, data) => {
    let treepath = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].id == pid) {
        treepath.push(i);
        return treepath;
      }else{
        if(!data[i].isleaf) {
          for(let j=0; j<data[i].children.length; j++) {
            if(data[i].children[j].id == pid) {
              console.log(i);
              console.log(j);
              treepath.push(i,j);
              return treepath;
            }
          }
        }
      } 
    }
  }

  onExpandedRowsChange = (rows) => {
    this.setState({
      expandedRowKeys: rows,
    });
    console.log("this.state.expandedRowKeys");
    console.log(rows);
    console.log(this.state.expandedRowKeys);
  }

  handleSearch = (e) => {
    e.preventDefault();
    
    const { dispatch, form } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      this.setState({ 
        data: [],
      });
      if(typeof(values.name) == "undefined") values.name = '';
      values.name = values.name.replace(/\s+/g,'');
      values.pID = 0
      const params = Object.keys(values)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
        .join('&');
      dispatch({
        type: 'generalsetting/fetchAreaDomestic',
        payload: params,
        callback: () => {
          const { list, currentPage, total1, pageSie } = this.props;
          this.setState({ 
            data: list,
            current: currentPage,
            total: total1,
            pageSize: pageSie,
            expandedRowKeys: [],
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
    const { list, total1, currentPage, pageSie, loading, combotextlist } = this.props;
    const { data, total, current, pageSize, combodata, expandedRowKeys } = this.state;
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
            <AreaModal record={record} areaList={combodata} onOk={this.editHandler}>
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
          <AreaModal record={{}} areaList={combodata} onOk={this.createHandler}>
            <Button type="primary" icon="plus">新建</Button>
          </AreaModal>
          <div className={style.searchForm}>
            {this.searchForm()}
          </div>
        </div>
        {data.length!=0 ? console.log("加载data"+data) : console.log("不加载加载data")}
        <Table
          size="middle"
          className={style.tablePagination}
          columns={columns}
          dataSource={data}
          rowKey={record => record.id}
          // loading={loading}
          pagination={paginationProps}
          onChange={this.tableChangeHandler}
          bordered
          onExpand={this.onExpand}
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange}
        />
      </div>
    );
  }
}

export default connect(state => ({
  list: state.generalsetting.dataAreaDomestic.rows,
  currentPage: state.generalsetting.dataAreaDomestic.pageNumber,
  total1: state.generalsetting.dataAreaDomestic.total,
  pageSie: state.generalsetting.dataAreaDomestic.pageSize,
  loading: state.generalsetting.loading,
  success: state.generalsetting.actionres.success,
  msg: state.generalsetting.actionres.msg,
  combotextlist: state.generalsetting.dataAreaCombotextList.obj,
}))(AreaDomesticList);
