import React from 'react';
import { Button, notification, Card, Table, Divider, Form, Input, Popconfirm,Upload ,Modal,Select} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { UploadOutlined } from '@ant-design/icons';


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
    unlockHandler = (id) => {

    }
    
    render() {
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
        let list = {};
        const columns = [

            {
                title: '资源名称',
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
                title: '类型',
                dataIndex: 'type',
                key: 'type',
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
                                        title="资源"
                                        visible={this.state.visible11}
                                        onOk={this.handleOk1}
                                        onCancel={this.handleCancel1}
                                    >
                                        <Form>
                                            <FormItem label="名称"><Input style={{ width: 120 }}/></FormItem>
                                            <FormItem label="类型"><Select defaultValue="模型" style={{ width: 120 }} >
                                            <Option value="模型">模型</Option>
                                            <Option value="模型">模型</Option>
                                        </Select></FormItem>
                                        <FormItem label="资源"><Upload {...props}>
                                            <Button>
                                                <UploadOutlined /> Click to Upload
                                             </Button>
                                        </Upload></FormItem>
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
                type: '模型',
            },

        ];
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div>
                        <div className={styles.toolBar} >
                            {

                                <Button style={{ marginLeft: 10, marginBottom: 9 }} type="primary" onClick={this.newHandler}>新建资源</Button>
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