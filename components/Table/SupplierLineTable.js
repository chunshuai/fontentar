import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './SupplierLineTable.less';

export default class SuplierElementTable extends PureComponent {

  handleTableChange = (pagination) => {
    this.props.onChange(pagination);
  }

  render() {
    console.log(this.props);
    console.log("this.props");

    const { data: { rows: list, pageNumber: current, pageSize, total }, loading, columns } = this.props;

    const showTotal = () => `显示 ${((current - 1) * pageSize) + 1} 到 ${current * pageSize > total ? total : current * pageSize} 条 , 共 ${total} 条记录`;
    const paginationProps = {
      showTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      //current,
      //pageSize,
      total,
    };

    return (
      <div>
        <Table
          bordered
          size="middle"
          className={styles.tablePagination}
          loading={loading}
          rowKey={record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
