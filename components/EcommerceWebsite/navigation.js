import React,{PureComponent} from 'react';
import { Col,Row } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class navigation extends PureComponent{
    render(){
        return(
            <div>
                <Row gutter={8}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">主页</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">国内游</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">出境游</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">签证</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">门票</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">酒店</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">酒店+景点</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">特产</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">个人中心</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">登录</a>
                        </Menu.Item>
                    </Col>
                    <Col span={2}>
                        <Menu.Item key="homepage">
                            <a href="http://www.lfhygl.com/" target="_blank" rel="noopener noreferrer">注册</a>
                        </Menu.Item>
                    </Col>
                </Menu>
                </Row>
            </div>
            
            
        );
    }
}