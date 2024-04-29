/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Template } from '../../layout/Template/template';
import { Col, Row, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './editJobsAndTask.module.less';
import { columns } from '../../components/Table/editJobsTable';
import { columnsTask } from '../../components/Table/editTaskTable';
import Head from 'next/head';
const { Search } = Input;

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 18,
      color: 'rgb(187,187,187)',
      paddingRight: '10px',
    }}
  />
);

export const EditJobsAndTask = (props: { jobsList: any; tasksList: any }) => {
  const onSearch = (value: string) => console.log(value);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowKeyTasks, setSelectedRowKeyTasks] = useState<React.Key[]>([]);
  const jobData = useState(props.jobsList);
  const taskData = useState(props.tasksList);

  const onSelectChangeJob = (newSelectedRowKey: React.Key[]) => {
    if (newSelectedRowKey.length === 0) {
      newSelectedRowKey = [];
    } else {
      newSelectedRowKey = newSelectedRowKey.slice(-1);
    }

    console.log('selectedRowKeys changed: ', newSelectedRowKey);

    setSelectedRowKeys(newSelectedRowKey);
  };

  const onSelectChangeTasks = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);

    setSelectedRowKeyTasks(newSelectedRowKeys);
  };

  const rowSelectionJob = {
    selectedRowKeys,
    onChange: onSelectChangeJob,
  };

  const rowSelectionTask = {
    selectedRowKeyTasks,
    onChange: onSelectChangeTasks,
  };

  return (
    <Template>
      <Head>
        <title>Admin Portal</title>
        <link rel="icon" href={'/cislogo.png'} />
      </Head>
      <div>
        <Row>
          <Col span={11} offset={0}>
            <div>
              <div>
                <Row>
                  <Col span={10} offset={0}>
                    <div className={styles.jobTitle}>
                      <span>Active Jobs</span>
                    </div>
                    <div className={styles.jobDesc}>
                      <span>At a time you can only select one Job</span>
                    </div>
                  </Col>
                  <Col span={10} offset={4}>
                    <div className={styles.searchButton}>
                      <Search
                        placeholder="Search for a job category"
                        allowClear
                        onSearch={onSearch}
                        style={{
                          borderBottom: '1px solid rgb(187, 187, 187)',
                        }}
                        bordered={false}
                        prefix={suffix}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={styles.tableJobDSize}>
                <Table
                  rowSelection={rowSelectionJob}
                  columns={columns}
                  dataSource={jobData[0]}
                  rowKey="id"
                  size="small"
                  pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: false,
                    responsive: true,
                    showLessItems: true,
                  }}
                />
              </div>
              <div className={styles.tableJobMSize}>
                <Table
                  rowSelection={rowSelectionJob}
                  rowKey="id"
                  columns={columns}
                  size="small"
                  dataSource={jobData[0]}
                  pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: false,
                    responsive: true,
                    showLessItems: true,
                  }}
                />
              </div>
            </div>
          </Col>
          <Col span={12} offset={1}>
            <div>
              <div>
                <Row>
                  <Col span={10} offset={0}>
                    <div className={styles.jobTitle}>
                      <span>Active Task</span>
                    </div>
                    <div className={styles.jobDesc}>
                      <span>At a time you can only select multiple task</span>
                    </div>
                  </Col>
                  <Col span={13} offset={1}>
                    <div className={styles.searchButton}>
                      <Search
                        placeholder="Search for a specific task or a job category"
                        allowClear
                        onSearch={onSearch}
                        style={{
                          borderBottom: '1px solid rgb(187, 187, 187)',
                        }}
                        bordered={false}
                        prefix={suffix}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={styles.tableTaskDSize}>
                <Table
                  rowSelection={rowSelectionTask}
                  columns={columnsTask}
                  dataSource={taskData[0]}
                  rowKey="id"
                  size="small"
                  pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: false,
                    responsive: true,
                    showLessItems: true,
                  }}
                />
              </div>
              <div className={styles.tableTaskMSize}>
                <Table
                  rowSelection={rowSelectionTask}
                  columns={columnsTask}
                  dataSource={taskData[0]}
                  rowKey="id"
                  size="small"
                  pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: false,
                    responsive: true,
                    showLessItems: true,
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.buttons}>
          <div className={styles.mergeButton}>
            <Button>Merge</Button>
          </div>
          <div className={styles.DeleteButton}>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
    </Template>
  );
};
