import React, {PureComponent } from 'react';
import { Modal, Form, Input,Table,Row,Col,Button, Cascader,Checkbox  } from 'antd';
import { connect } from 'dva';
import styles from '../../routes/List/TableList.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
@connect(state => ({
    productList: state.getData.productList.obj,
  }))
class RecommendProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  onproductlistChange = (value) => {
    console.log("onproductlistChange");
    const { dispatch } = this.props;
      if(value.length !=0){
        this.setState({
          categoryid:value[value.length-1],
        });
        const param={
          categoryid:value[value.length-1],
        };
        dispatch({
          type: 'getData/getProductList',
          payload: param,
        });
      }
      else{
        this.setState({
          categoryid:'',
        });
        dispatch({
          type: 'getData/getProductList',
        });
      }
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
    });
  };

  selectedRow =(record,selected,selectedRows) => {
  };

  handleSearch = (e) =>{

  };

  okHandler = () => {
    this.hideModelHandler();
  };
  onRecommendChange = (checkedValue)=>{
      console.log(checkedValue);
  };


  render() {
    const { children,productList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = productList.map(d =>({
      label:d.name,
      value:d.id,
    }));
    const paginationProps = {
      pageSize:5,
    };
    return (
      <span >
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="添加推荐产品"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
        <div style={{marginBottom:10}}>
        <Cascader options={this.props.MenuList} onChange={this.onproductlistChange}  style={{width:185,marginRight:10}} placeholder="请选择特产种类"/>
        </div>
        <CheckboxGroup options={options} onChange={this.onRecommendChange} />
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RecommendProduct);
