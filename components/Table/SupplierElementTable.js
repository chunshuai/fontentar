import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Route, Switch, Link } from 'dva/router';
import { Table, Divider, Popconfirm } from 'antd';
import styles from './SupplierElementTable.less';

class SuplierElementTable extends PureComponent {
 
  handleTableChange = (pagination) => {
    this.props.onChange(pagination);
  }

  render() {
    const { data: { rows: list, pageNumber: current, pageSize, total }, loading, columns } = this.props;

    const showTotal = () => `显示 ${((current - 1) * pageSize) + 1} 到 ${current * pageSize > total ? total : current * pageSize} 条 , 共 ${total} 条记录`;
    const paginationProps = {
      showTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      current,
      pageSize,
      total,
    };
    
    return (
      <div>
        <Table
          bordered
          size="middle"
          // className={styles.tablePagination}
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

export default SuplierElementTable;
