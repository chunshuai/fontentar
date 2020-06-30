import React, {PureComponent } from 'react';
import { Divider,message,Modal, Form, Input,Table,Row,Col,Button, Cascader,Checkbox,Radio } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@connect(state => ({
    productList: state.getData.productspecialList.obj,
    menuList: state.getData.MenuList.obj,
    specification: state.getData.specification.obj,
    specialPrice: state.getData.specialPrice.obj,
  }))
class SelectOnlyProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      productList:[],
      specialtyid:'',
      specialtyname:'',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
        type: 'getData/getMenuList',
    });
 }
  onproductlistChange = (value) => {
    const { dispatch } = this.props;
    this.setState({
      menuList:value,
      specialtyid:'',
      specialtyname:'',
    });
      if(value.length !=0){
        this.setState({
          categoryid:value[value.length-1],
        });
        const param={
          categoryid:value[value.length-1],
        };
        dispatch({
          type: 'getData/getProductSpecialList',
          payload: param,
          callback: () => {
            if(this.props.productList!=null){
            this.setState({
              productList: this.props.productList,
            });
          }
          },
        });
      }
      else{
          this.setState({
            productList: [],
          })
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
      productList:[],
      menuList:[],
      specialtyid:'',
      specialtyname:'',
    });
  };

  selectedRow =(record,selected,selectedRows) => {
  };

  handleSearch = (e) =>{

  };

  okHandler = () => {
    const { onOk } = this.props;
    const {specialtyid,specialtyname}=this.state;
    if(this.state.specialtyid===''){
        message.error("请选择完整信息再点击确认");
        return;
    }
    else{
        onOk(specialtyid,specialtyname);
        this.hideModelHandler();
    }
  };

  onRecommendChange = (checkedValue)=>{
    const { dispatch } = this.props;
    const specialtyname=this.state.productList.filter(v => checkedValue.target.value === v.id );
    this.setState({
      specialtyid:checkedValue.target.value,
      specialtyname:specialtyname[0].name,
    })
  };


  render() {
    const { children,menuList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = this.state.productList.map(d =>({
      label:d.name,
      value:d.id,
    }));
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
        <Cascader value={this.state.menuList} options={menuList} onChange={this.onproductlistChange}  style={{width:185,marginRight:10}} placeholder="请选择特产种类"/>
        </div>
        <div style={{marginBottom:4}}>商品名称:</div>
        <RadioGroup  value={this.state.specialtyid} options={options} onChange={this.onRecommendChange} />        
        </Modal>
      </span>
    );
  }
}

export default Form.create()(SelectOnlyProduct);
