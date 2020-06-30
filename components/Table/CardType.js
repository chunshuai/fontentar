import React, { PureComponent } from 'react';
import { Table, Button, Radio, Popconfirm, Divider, message } from 'antd';
import { connect } from 'dva';
import style from './SetGeneral.less';
import CardTypeModal from './CardTypeModal';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class CardTypeList extends PureComponent {

  state = {
    status: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { status } = this.state;
    const pageable = {};
    const cardtype = {
      status,
    };
    const params = {
      pageable,
      cardtype,
    };
    dispatch({
      type: 'generalsetting/fetchCardTypes',
      payload: params,
    });
    // this.reloadHandler(dispatch);
  }

  tableChangeHandler = (pagination) => {
    const { dispatch } = this.props;
    const {status} = this.state;
    const pageable = {
      page: pagination.current,
      rows: pagination.pageSize,
    };
    const cardtype = {
      status,
    };
    const params = {
      pageable,
      cardtype,
    };
    dispatch({
      type: 'generalsetting/fetchCardTypes',
      payload: params,
    });
  }
  
  reloadHandler = (dispatch) => {
    console.log("reload调用了吗");
    const { current, pageSize } = this.props;
    const { status } = this.state;
    const pageable = {
      page: current,
      rows: pageSize,
    };
    const cardtype = {
      status,
    };
    const params = {
      pageable,
      cardtype,
    };
    dispatch({
      type: 'generalsetting/fetchCardTypes',
      payload: params,
    });
  }

  editHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'generalsetting/updatecardtype',
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

  // editHandler = (id, values) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'generalsetting/updateCardType',
  //     payload: { id, values },
  //   });
  // }

  createHandler = (values) => {
    const { dispatch } = this.props;
    // const { dispatch, current, pageSize } = this.props;
    // const { status } = this.state;
    // const params = {
    //   page: current,
    //   rows: pageSize,
    //   status,
    // };
    dispatch({
      type: 'generalsetting/addcardtype',
      payload: values,
      // payload: { values, params },
      callback: () => {
        const { success, msg } = this.props;
        if(success){
          message.success(msg);
          console.log("before reload");
          // dispatch({
          //   type: 'generalsetting/fetchCardTypes',
          //   payload: params,
          // });
          this.reloadHandler(dispatch);
          console.log("after reload");
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
      type: 'generalsetting/cancelcardtype',
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
      type: 'generalsetting/restorecardtype',
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
      const { dispatch } = this.props;
      const {status} = this.state;
      const pageable = {};
      const cardtype = {
        status,
      };
      const params = {
        pageable,
        cardtype,
      };
      dispatch({
        type: 'generalsetting/fetchCardTypes',
        payload: params,
      });
    });
  }

  render() {
    const { list, total, current, pageSize, loading } = this.props;
    const isedit = this.state;

    const columns = [
      {
        title: '',
        key: 'rowNumber',
        width: 50,
        align: 'center',
        render: (text, record, index) => <span>{index + 1 + ((current - 1) * pageSize)}</span>,
      }, {
        title: '证件类型',
        dataIndex: 'name',
        width: '60%',
        key: 'name',
        className: `${style.center}`,
      }, {
        title: '排序',
        dataIndex: 'order',
        align: 'center',
        key: 'order',
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            {/* {
              record.stateA === true ? 
                <span> */}
                  <CardTypeModal record={record} onOk={this.editHandler} edit={true}>
                    <a>编辑</a>
                  </CardTypeModal>
                  <Divider type="vertical" />
                  <CardTypeModal record={record} edit={false}>
                    <a>查看</a>
                  </CardTypeModal>
                  <Divider type="vertical" />
                  {
                    record.status === true ? 
                      <Popconfirm title="确定取消该证件类型?" onConfirm={this.cancelHandler.bind(null, record.id)}>
                        <a>取消</a>
                      </Popconfirm>
                    :
                      <Popconfirm title="确定恢复该证件类型?" onConfirm={this.restoreHandler.bind(null, record.id)}>
                        <a>恢复</a>
                      </Popconfirm>
                  }
                {/* </span>
              : 
                <CardTypeModal record={record} edit={false}>
                  <a>查看</a>
                </CardTypeModal>
            } */}
        </span>
        ),
      },
    ];

    const showTotal = () => `显示 ${((current - 1) * pageSize) + 1} 到 ${current * pageSize > total ? total : current * pageSize} 条 , 共 ${total} 条记录`;
    const rowKey = record => record.id;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      // pageSizeOptions: ['1', '3', '5', '20'],
      showTotal,
      total,
      current,
      pageSize,
    };

    return (
      <div className={style.content}>
        <div className={style.toolBar}>
          <CardTypeModal record={{}}  edit={true} onOk={this.createHandler}>
            <Button type="primary" icon="plus">新建</Button>
          </CardTypeModal>
          <RadioGroup onChange={this.statusChange} defaultValue="true" style={{marginLeft: 12}}>
            <RadioButton value="true">正常</RadioButton>
            <RadioButton value="false">已取消</RadioButton>
          </RadioGroup>
        </div>
        <div>
          <Table
            className={style.tablePagination} //在div ant-table-wrapper 上
            size="middle"
            columns={columns}
            dataSource={list}
            rowKey={rowKey}
            loading={loading}
            pagination={paginationProps}
            onChange={this.tableChangeHandler}
            bordered
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.generalsetting.dataCardType.rows,
  current: state.generalsetting.dataCardType.pageNumber,
  total: state.generalsetting.dataCardType.total,
  pageSize: state.generalsetting.dataCardType.pageSize,
  loading: state.generalsetting.loading,
  success:state.generalsetting.actionres.success,
  msg:state.generalsetting.actionres.msg,
}))(CardTypeList);
