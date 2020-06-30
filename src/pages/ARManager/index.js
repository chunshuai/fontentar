import React from 'react';
import { Button, notification, Card, Table, Divider, Form,Input ,Popconfirm,Modal,Select} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';

const FormItem = Form.Item;
// @Form.create()
export default class index extends React.Component {
    state = {
        value: 'test',
        visible11:false,
    };

    handleChange = (value) => {
        this.setState({
            value,
        });
    };

    prompt = () => {
        notification.open({
            message: 'We got value:',
            description: <span dangerouslySetInnerHTML={{ __html: this.state.value }} />,
        });
    };
    searchForm() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 24 },
        };
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <FormItem label="名称">
                    {/* {getFieldDecorator('scenename')( */}
                        <Input style={{ width: 200 }} />
                    {/* )} */}
                </FormItem>
                <span>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                </span>
            </Form>
        );
    }
    newHandler=()=>{
        this.setState({
            visible11:true,
        });
    }
    handleCancel1=()=>{
        this.setState({
            visible11:false,
        });
    }
    handleOk1=()=>{
        this.setState({
            visible11:false,
        });
    }
    unlockHandler=(id)=>{
        
    }
    render() {
        let list = {};
        const columns = [

            {
                title: '场景名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },

            {
                title: '创建时间',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
            },

            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (record) => (
                    <div>
                        {
                            record.privilege == "view" ?
                                <span />
                                :
                                <div>
                                    <Modal
                                        title="新建场景"
                                        visible={this.state.visible11}
                                        onOk={this.handleOk1}
                                        onCancel={this.handleCancel1}
                                    >
                                        <Form>
                                            <Form.Item label="场景名称"><Input style={{width:200}}></Input></Form.Item>
                                            <Form.Item label="AR模型"><Select defaultValue="Nike 男鞋" style={{ width: 120 }} >
                                            <Option value="Nike">Nike 男鞋</Option>
                                           
                                        </Select></Form.Item>
                                        </Form>
                                        
                                    </Modal>
                                    <Button onClick={this.newHandler}>编辑</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={this.newHandler}>查看</Button>
                                    <Divider type="vertical" />
                                    <Popconfirm title="是否删除？" onConfirm={this.unlockHandler.bind(null, record.username)}>
                                                <Button>删除</Button>
                                            </Popconfirm>
                                </div>
                        }
                    </div>
                ),
            },
        ];
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['3', '10', '20'],
            pageSize: 1,
            current: 1,
            total: 0,
        };
        const data = [
            {
                key: '1',
                name: 'Nike 男鞋',
                time: '2020-5-20',
            },

        ];
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div>
                        <div className={styles.toolBar} >
                            {

                                <Button style={{ marginLeft: 10, marginBottom: 9 }} type="primary" onClick={this.newHandler}>新建场景</Button>
                            }
                            <div className={styles.searchForm}>
                                {this.searchForm()}
                            </div>
                        </div>
                        <div>
                            <Table
                                dataSource={data}
                                // loading={true}
                                // onChange={this.handleStandardTableChange}
                                columns={columns}
                                // pagination={paginationProps}
                                // rowKey={record => record.id}
                                bordered
                            />
                        </div>
                    </div>
                </Card>
            </PageHeaderWrapper>

        );
    }
}