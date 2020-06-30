import React,{PureComponent} from 'react';
import { Col,Row,Button } from 'antd';
export default class pageFooter extends PureComponent{
    render(){
        return(
            <div>
                <Row gutter={8}>
                    <Col span={2}>

                    </Col>
                    <Col span={4}>
                        <Button>公司简介</Button>
                    </Col>
                    <Col span={4}>
                        <Button>联系我们</Button>
                    </Col>
                    <Col span={4}>
                        <Button>诚聘英才</Button>
                    </Col>
                    <Col span={4}>
                        <Button>隐私保护</Button>
                    </Col>
                    <Col span={4}>
                        <Button>冀B2-20140002</Button>
                    </Col>
                    <Col span={2}>

                    </Col>
                </Row>
            </div>
        );
    }
}
