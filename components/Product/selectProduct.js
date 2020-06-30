import React, {PureComponent } from 'react';
import { Divider,message,Modal, Form, Input,Table,Row,Col,Button, Cascader,Checkbox,Radio } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@connect(state => ({
    productList: state.getData.productList.obj,
    menuList: state.getData.MenuList.obj,
    specification: state.getData.specification.obj,
    specialPrice: state.getData.specialPrice.obj,
  }))
class SelectProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      specification:[],
      productList:[],
      specialtyid:'',
      specialtyname:'',
      specificationid:'',
      specificationname:'',
      marketPrice:'',
      platformPrice:'',
      costPrice:'',
      menuList:[],
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
        type: 'getData/getPurchaseMenu',
    });
 }
  onproductlistChange = (value) => {
    const { dispatch } = this.props;
    this.setState({
      menuList:value,
      specialtyid:'',
      specificationid:'',
      specialtyname:'',
      specificationname:'',
      specification:[],
    });
      if(value.length !=0){
        this.setState({
          categoryid:value[value.length-1],
        });
        const param={
          categoryid:value[value.length-1],
          providerid:this.props.supplier,
        };
        dispatch({
          type: 'getData/getSpecialList',
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
            specification:[],
          })
      }

  }
  showModelHandler = (e) => {
    const { dispatch } = this.props;
    if(!this.props.supplier){
      message.error("请先选择供应商");
      return;
    }
    this.setState({
      visible: true,
    });
  };

  handleTableChange = (pagination) => {
  };
  hideModelHandler = () => {
    this.setState({
      visible: false,
      specification:[],
      productList:[],
      menuList:[],
      specialtyid:'',
      specificationid:'',
      specialtyname:'',
      specificationname:'',
    });
  };

  selectedRow =(record,selected,selectedRows) => {
  };

  handleSearch = (e) =>{

  };

  okHandler = () => {
    const { onOk,dispatch } = this.props;
    if(this.state.specificationid==='' || this.state.specialtyid===''){
        message.error("请选择完整信息再点击确认");
        return;
    }
    else{
      const param={
        specificationid:this.state.specificationid,
      };
      const {specificationid,specialtyid,specialtyname,specificationname}=this.state;
      dispatch({
        type: 'getData/getSpecialPrice',
        payload: param,
        callback : () =>{
          onOk(specificationid,specialtyid,specialtyname,specificationname,this.props.specialPrice.marketPrice,this.props.specialPrice.platformPrice,this.props.specialPrice.costPrice);
        },
      });
      this.hideModelHandler();
    }
  };
  onSpecificationChange = (checkedValue)=>{
    const { dispatch } = this.props;
    const specificationname=this.state.specification.filter(v => checkedValue.target.value === v.value);
    this.setState({
      specificationid:checkedValue.target.value,
      specificationname:specificationname[0].label,
    })
  };
  onRecommendChange = (checkedValue)=>{
    const { dispatch } = this.props;
    const specialtyname=this.state.productList.filter(v => checkedValue.target.value === v.id );
    this.setState({
      specialtyid:checkedValue.target.value,
      specialtyname:specialtyname[0].name,
    })
    const param={
      specialtyid:checkedValue.target.value,
    };
    dispatch({
        type: 'getData/getSpecification',
        payload:param,
        callback: () => {
          
          this.setState({
            specification: this.props.specification,
          });
        },
    });
  };


  render() {
    const { children,menuList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = this.state.productList.map(d =>({
      label:d.name,
      value:d.id,
    }));
    const specificationOptions = this.state.specification.map(d =>({
      label:d.label,
      value:d.value,
      name:d.label,
    }));
    return (
      <span >
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="添加采购产品"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
        <div style={{marginBottom:10}}>
        <Cascader value={this.state.menuList} options={menuList} onChange={this.onproductlistChange}  style={{width:185,marginRight:10}} placeholder="请选择特产种类"/>
        </div>
        <div style={{marginBottom:4}}>商品名称:</div>
        <RadioGroup  value={this.state.specialtyid} options={options} onChange={this.onRecommendChange} />
        <Divider />
        <div style={{marginBottom:4}}>包装规格:</div>
        <RadioGroup  value={this.state.specificationid} options={specificationOptions} onChange={this.onSpecificationChange} />
        <Divider />
        <div style={{marginBottom:4,marginTop:4}}>您已选择的产品是:{this.state.specialtyname} {this.state.specificationname}</div>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(SelectProduct);
