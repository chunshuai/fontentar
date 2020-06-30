import React, {PureComponent } from 'react';
import { Modal, Form, Input, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;

@Form.create()
class BateRatioHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current:1,
    };
  }

  showModelHandler = (e) => {
    const { dispatch } = this.props;
    const param={
      id:this.props.id,
    }
    dispatch({
      type: 'getData/getBateRatioHistory',
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
  
  handleTableChange = (pagination) => {
    this.setState({
      current:pagination.current,
    });
};

  render() {
    const  columns= [
        {
          title: '',
          dataIndex: 'num',
          key: 'num',
          render:(text,record,index)=>(
            <span>{index+1+((this.state.current-1)*5)}</span>
          ),
        },{
          title: '比例类型',
          dataIndex: 'issueType',
          key: 'issueType',
        },{
          title: '比例',
          dataIndex: 'rebateRatio',
          key: 'rebateRatio',
        },{
            title: '操作员',
            dataIndex: 'operator',
            key: 'operator',
        },{
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):""}</span>,
        },{
          title: '失效时间',
          dataIndex: 'endTime',
          key: 'endTime',
          render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):""}</span>,
        },{
          title: '状态',
          dataIndex: 'isActive',
          key: 'isActive',
          render: text => (
            <span>{text===null?"":(text===true?"有效":"无效")}</span>
          ),
        }];
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { data} = this.props;
    const paginationProps = {
        pageSize:5,
      };
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
            pagination={paginationProps}
            bordered
            dataSource={data}
            rowKey={record => record.id}
            onChange={this.handleTableChange}
        ></Table>
        </Modal>
      </span>
    );
  }
}

export default connect(state => ({
    data: state.getData.bateRatioHistory.obj,
  }))(BateRatioHistory);
