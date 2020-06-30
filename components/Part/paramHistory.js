import React, {PureComponent } from 'react';
import { Modal, Form, Input, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
@connect(state => ({
  history: state.getData,
}))
class ParamHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    const { dispatch } = this.props;
    const param={
      id:this.props.id,
    }
    dispatch({
      type: 'getData/getSysParamHistory',
      payload: param,
    });
    if (e) e.stopPropagation();

    this.setState({
      visible: true,
      loading:false,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
      this.hideModelHandler();
  };

  render() {
    const  columns= [
      {
        title: '',
        dataIndex: 'num',
        key: 'num',
        render:(text,record,index)=>(
          <span>{index+1}</span>
        ),
      },
      {
      title: '参数名称',
      dataIndex: 'settingName',
      key: 'settingName',
    }, {
      title: '参数取值',
      dataIndex: 'settingValue',
      key: 'settingValue',
    }, {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):""}</span>,
    }
    , {
      title: '失效时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):""}</span>,
    }
    , {
      title: '状态',
      dataIndex: 'isValid',
      key: 'isValid',
      render: text => (
        <span>{text===null?"":(text===true?"有效":"无效")}</span>
      ),
    }];
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { history: { modalLoading:historyLoading,sysParamHistory } } = this.props;
    return (
      <span >
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="查询历史记录"
          width="800px"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
        <Table
            columns={columns}
            bordered
            dataSource={sysParamHistory.obj}
            rowKey={record => record.id}
        ></Table>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ParamHistory);
