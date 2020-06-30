import React from 'react';
import { Button, notification, Card, Table, Divider, Form, Input, Modal, Select,Popconfirm} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
// @Form.create()
export default class index extends React.Component {
    state = {
        value: 'test',
        visible1: false,
        visible2: false,
    };

    showModal1 = () => {
        this.setState({
            visible1: true,
        });
        console.log(this.state.visible1);
    };

    handleOk1 = e => {
        console.log(e);
        this.setState({
            visible1: false,
        });
        console.log(this.state.visible1);
    };

    handleCancel1 = e => {
        console.log(e);
        // this.state.visible1 = false;
        this.setState({
            visible1: false,
        });
    };
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    handleOk2 = e => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    };

    handleCancel2 = e => {
        console.log(e);
        this.setState({
            visible2: false,
        });
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
                <FormItem label="商品名称">
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
    render() {
        let list = {};
        const columns = [

            {
                title: '产品名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },
            {
                title: '供应商',
                dataIndex: 'businessname',
                key: 'businessname',
                align: 'center',
            },
            {
                title: '上架时间',
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
                                    <Button onClick={this.showModal1}>3D绑定</Button>
                                    <Modal
                                        title="3D绑定"
                                        visible={this.state.visible1}
                                        onOk={this.handleOk1}
                                        onCancel={this.handleCancel1}
                                    >
                                        <Select defaultValue="Nike 男鞋" style={{ width: 120 }} >
                                            <Option value="Nike">Nike 男鞋</Option>
                                           
                                        </Select>
                                    </Modal>
                                    <Divider type="vertical" />
                                    <Button onClick={this.showModal2}>AR绑定</Button>
                                    <Modal
                                        title="AR绑定"
                                        visible={this.state.visible2}
                                        onOk={this.handleOk2}
                                        onCancel={this.handleCancel2}
                                    >
                                        <Select defaultValue="Nike 男鞋" style={{ width: 120 }} >
                                            <Option value="Nike">Nike 男鞋</Option>
                                           
                                        </Select>
                                    </Modal>
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
                name: 'Nike耐克男鞋秋冬款空军一号',
                businessname: 'WebAR微商城',
                time: '2020-5-20',
            },

        ];
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div>
                        <div className={styles.toolBar} >
                            {/* {

                                <Button style={{ marginLeft: 10, marginBottom: 9 }} type="primary" onClick={this.newHandler}>新建场景</Button>
                            } */}
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