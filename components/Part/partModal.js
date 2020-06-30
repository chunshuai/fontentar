import React, {PureComponent } from 'react';
import { Modal, Form, Input,Table,Row,Col,Button } from 'antd';
import { connect } from 'dva';
import styles from '../../routes/List/TableList.less';

const FormItem = Form.Item;
@connect(state => ({
  parentPart: state.getData,
}))
class PartModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current:1,
      pid:"",
      parent:"",
    };
  }

  showModelHandler = (e) => {
    console.log(this.props.id);
    const { dispatch } = this.props;
    if(this.props.id===undefined){
        const param={
          isActive:true,
          id:'',
          name:'',
        };
        dispatch({
          type: 'getData/getSelectList',
          payload:param,
        });
    }
    else{
        const param={
          isActive:true,
          id:this.props.id,
          name:'',
        }
        dispatch({
          type: 'getData/getSelectList',
          payload:param,
        });
    }
    this.setState({
      visible: true,
    });
  };

  handleTableChange = (pagination) => {
      this.setState({
        current:pagination.current,
      });
  };
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  selectedRow =(record,selected,selectedRows) => {
    console.log(record);
    this.setState({
      pid:record.id,
      parent:record.name,
    });
  };

  handleSearch = (e) =>{
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      if(typeof(values.name) == "undefined" || values.name == null) {
         values.name = '';
       }
       values.isActive='';
       if(this.props.id===undefined){
         values.id = '';
       }
       else{
         values.id=this.props.id;
       }

      dispatch({
        type: 'getData/getSelectList',
        payload: values,
      });
    });

  };

  okHandler = () => {
    const { onOk } = this.props;
    onOk(this.state.parent,this.state.pid);
    this.hideModelHandler();
  };

  renderForm(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form  layout="inline" onSubmit={this.handleSearch}>
      <Row >
        <Col span={12} style={{ marginLeft: 10}}>
        <FormItem label="分区名称">
        {getFieldDecorator('name')(
          <Input placeholder="请输入分区名称" style={{ width: 160 }} />)}
          </FormItem>
        </Col>
        <Col span={2}></Col>
        <Col span={8}>
        <Button type="primary"  onClick={this.handleSearch} style={{ marginLeft: 10,marginTop: 4}}>查询</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
        </Col>
      </Row>
      </Form>
    );
  }


  render() {
    const { parentPart: { modalLoading:parentLoading,parentPart } } = this.props;
    const  columns= [
      {
        title: '',
        dataIndex: 'num',
        key: '9',
        render:(text,record,index)=>(
          <span>{index+1+((this.state.current-1)*5)}</span>
        ),
      },
      {
      title: '分区',
      dataIndex: 'name',
      key: '1',
    },
    {
    title: '父分区',
    dataIndex: 'parent',
    key: '2',
    render: val => <span>{val?val.name:""}</span>,
  },
  ];
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const paginationProps = {
      pageSize:5,
    };
    const rowSelectionProps = {
      hideDefaultSelections:true,
      type:"radio",
      onSelect:this.selectedRow,
    };
    return (
      <span >
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="搜索父分区"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
        <div className={styles.tableListForm}>
          {this.renderForm()}
        </div>
        <Table columns={columns}
           dataSource={parentPart.obj}
           pagination={paginationProps}
           loading={parentLoading}
           onChange={this.handleTableChange}
           rowKey='id'
           rowSelection={rowSelectionProps}
           bordered
         />
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PartModal);
