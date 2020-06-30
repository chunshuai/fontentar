import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
export default class login extends PureComponent{
    state={
        notice:'',
        type:'tab1',
        autoLogin:true,
    }
    onSubmit=(err,values)=>{
        console.log('value collected->',{...values,autoLogin:this.state.autoLogin});
        if(this.state.type==='tab1'){
            this.setState({
                notice:'',
            });
        }
    }
    onTabChange=(key)=>{
        this.setState({
            type:key,
        });
    }
    changeAutoLogin=(e)=>{
        this.setState({
            autoLogin:e.target.checked,
        })
    }
    render(){
        return(
        <div>
        <Login 
            defaultActiveKey={this.state.type}
            onTabChange={this.onTabChange}
            onSubmit={this.onSubmit}
        >
        <Tab key="tab1" tab="帐户">
        {
            this.state.notice&&
            <Alert style={{marginBottom:24}} message={this.state.notice} type="error" showIcon Closable/>
        }
            <Username name="账号"/>
            <Password name="mima"/>
        </Tab>
        <Tab key="tab2" tab="Mobile">
            <Mobile name="手机号"/>
            <Captcha onGetCaptcha={()=>console.log('get captcha!)}')} name="captcha"/>
        </Tab>
        <div>
                <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>记住登录状态</Checkbox>
                <a style={{float:'right'}} href="">wangjimima</a>
        </div>
        <div>
        <a style={{float:'right'}} href="">注册</a>
        </div>
        </Login>
        </div>
        );
        
    }
}