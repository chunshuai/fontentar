import React, {PureComponent } from 'react';
import { Modal, Form, Input, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
@connect(state => ({
  history: state.getData,
}))
class HistoryModal extends PureComponent {
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
      type: 'getData/getPartHistory',
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
        key: '9',
        render:(text,record,index)=>(
          <span>{index+1}</span>
        ),
      },
      {
      title: '分区名称',
      dataIndex: 'categoryName',
      key: '1',
    }, {
      title: '父分区',
      dataIndex: 'pCategoryName',
      key: '2',
      render: text => <span>{text?text:""}</span>,
    }, {
      title: '操作员',
      dataIndex: 'operator',
      key: '3',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: '4',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }
    , {
      title: '失效时间',
      dataIndex: 'deadTime',
      key: '5',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }
    , {
      title: '状态',
      dataIndex: 'isActive',
      key: '6',
      render: text => (
        <span>{text===null?"":(text===true?"有效":"无效")}</span>
      ),
    }];
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { history: { modalLoading:historyLoading,partHistory } } = this.props;
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
            dataSource={partHistory.obj}
        ></Table>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(HistoryModal);
