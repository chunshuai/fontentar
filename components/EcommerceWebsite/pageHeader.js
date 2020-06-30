import React,{PureComponent} from 'react';
import { Col,Row } from 'antd';
export default class pageHeader extends PureComponent{
    render(){
        return(
            <div>
                <Row gutter={8}>
                    <Col span={2}>
                    

                    </Col>
                    <Col span={5}>
                    <a href="/">
                    <img src="http://hyimages.lyouoa.com/uploads/logo/2016/1/18/20160118150126348.png"  width="280px"  height="80px" alt="logo" id="LogoURL" onerror="javascript:this.src='/themes/tourweb/images/nopic.jpg'"/>
                    </a>
                    </Col>
                    <Col span={5}>
                        <tr>
                            <td valign="middle">
                                <pre>
                                    国内十强旅行社
                                    河北省十佳诚信旅行社
                                    河北省诚信企业
                                </pre>
                            </td>
                        </tr>
                    </Col>
                    <Col span={5}>
                    <div class="headSearch">
                            <div class="headSearch-title">
                                <div class="headSearch-title-txt" searchurl="/Line/Search?">全 部</div>
                                <div class="headSearch-title-body">
                                    <div class="headSearch-title-body-item" defaultkey="请输入线路,行程,目的地关键字搜索" searchurl="/Line/Search?">全 部</div>
                                    <div class="headSearch-title-body-item" defaultkey="请输入线路关键字搜索" searchurl="/Line/LineSearch?searchtype=1&">线 路</div>
                                    <div class="headSearch-title-body-item" defaultkey="请输入特产关键字搜索" searchurl="/Specialty/SpecialtySearch?searchtype=6&">特 产</div>
                                </div>
                            </div>
                            <div class="headSearch-search">搜 索</div>
                            <div class="headSearch-input">
                            <input id="s_key" type="text" value="请输入线路,行程,目的地,特产关键字搜索" defaultkey="请输入线路,行程,目的地,特产关键字搜索" />
                            </div>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div>
                            <div id="telephone"><div style="clear:both;height:27px;"></div>4006-596-516</div>
                            <div class="toptel24"></div> 
                            <div style="clear: both;"></div>
                        </div>

                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
            </div>
        );        
    }
}