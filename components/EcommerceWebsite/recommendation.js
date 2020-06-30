import React,{PureComponent} from 'react';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
export default class recommendation extends PureComponent{
    render(){
        return(
            <div>
                <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
                    <TabPane tab="国内游" key="1">
                        <p>
                            当季热门：
                        </p>
                        <p>
                            热门风光：
                        </p>
                        <p>
                            精选城市：
                        </p>
                        <Search placeholder="请输入关键词" enterButton="搜索" size="large" />
                    </TabPane>
                    <TabPane tab="出境游" key="2">
                        <p>
                            当季热门：
                        </p>
                        <p>
                            自然风光：
                        </p>
                        <p>
                            热门区域：
                        </p>
                        <Search placeholder="请输入关键词" enterButton="搜索" size="large" />
                    </TabPane>
                    <TabPane tab="签证" key="3">
                        <p>
                            热门国家：
                        </p>
                        <Search placeholder="请输入关键词" enterButton="搜索" size="large" />
                    </TabPane>
                    <TabPane tab="门票" key="4">
                        <p>
                            当季热门：
                        </p>
                        <p>
                            自然风光：
                        </p>
                        <p>
                            热门区域：
                        </p>
                        <Search placeholder="请输入关键词" enterButton="搜索" size="large" />
                    </TabPane>
                    <TabPane tab="酒店" key="5">
                    </TabPane>
                    <TabPane tab="酒+景" key="6">
                    </TabPane>
                    <TabPane tab="特产" key="7">
                        <p>
                            精选分类：
                        </p>
                        <Search placeholder="请输入关键词" enterButton="搜索" size="large" />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}