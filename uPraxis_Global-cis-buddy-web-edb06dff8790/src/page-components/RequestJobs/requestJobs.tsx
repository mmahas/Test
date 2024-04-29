/* eslint-disable n/no-callback-literal */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { Template } from '../../layout/Template/template';
import { DataType } from '../../components/Table/requestJobsTable';
import { Space, Table, Popconfirm, message, Modal, Upload, Form, Input, Button } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileImageTwoTone,
  LoadingOutlined,
} from '@ant-design/icons';
import styles from './requestJobs.module.less';
import Head from 'next/head';
import moment from 'moment';
import { jobRequestService } from '../../Services';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Column } = Table;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const RequestJobs = (props: { requestJobsList: any }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);
  const requestJobsList = useState(props.requestJobsList);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const onFinishTask = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailedTask = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <FileImageTwoTone twoToneColor="@primary-color" style={{ fontSize: '20px' }} />
      )}
      <div style={{ marginTop: 8 }}>Browse Image</div>
    </div>
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const Approve = async (id: string, file: string) => {
    const res = await jobRequestService.Approve(id, file);
    if (res) {
      message.success('Approved');
    } else {
      message.error('Something Error');
    }
  };

  const ModalPopUp = (props: { id: string }) => {
    console.log('id', props.id);
    return (
      <Modal
        title="Upload Icon"
        open={open}
        onOk={async () => await Approve(props.id, '')}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.formContainer}>
          <Form
            name="Task Form"
            labelCol={{ span: 0, offset: 0 }}
            // wrapperCol={{ span: 4, offset: 0 }}
            onFinish={onFinishTask}
            onFinishFailed={onFinishFailedTask}
            autoComplete="off"
            layout={'vertical'}
            requiredMark={false}
            className={styles.formLabel}
          >
            <Form.Item
              label="upload"
              name="jobImage"
              rules={[{ required: true, message: 'Please upload your image!' }]}
              className={styles.formUpload}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                // beforeUpload={() => false}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your name of the Task!' }]}
              className={styles.formInputItem}
            >
              <Input
                size="large"
                className={styles.formInput}
                placeholder={'Type the name of the Job'}
              />
            </Form.Item>

            <Form.Item className={styles.formButtonItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={styles.formButton}
                shape="round"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  };

  const Reject = async (id: string) => {
    const res = await jobRequestService.Rejected(id);
    if (res) {
      message.success('Rejected');
    } else {
      message.error('Something Error');
    }
  };

  return (
    <Template>
      <Head>
        <title>Admin Portal</title>
        <link rel="icon" href={'/cislogo.png'} />
      </Head>
      <div className={styles.requestTable}>
        <Table
          dataSource={requestJobsList[0]}
          rowSelection={rowSelection}
          size="small"
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            responsive: true,
            showLessItems: true,
          }}
        >
          <Column title="First Name" dataIndex="name" key="name" className={styles.colOne} />
          <Column title="Email Address" dataIndex="email" key="email" />

          <Column title="Requested Jobs" dataIndex="job" key="job" />
          <Column title="Mobile Number" dataIndex="phone" key="phone" />
          <Column
            title="Request Date"
            dataIndex="requestDate"
            key="requestDate"
            render={(text) => moment(text).format('DD/MM/YYYY')}
          />
          <Column
            title="Onboarding status"
            dataIndex="profileCompleted"
            key="profileCompleted"
            render={(text) => (text ? <div>completed</div> : <div>Pending</div>)}
          />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: DataType) => (
              <Space size="small">
                <Popconfirm
                  title="Are you sure to Approve this request "
                  okText="Yes"
                  cancelText="No"
                  onConfirm={async () => setOpen(true)}
                >
                  <a>
                    <CheckCircleFilled style={{ fontSize: '22px', color: 'rgb(40 108 100)' }} />
                  </a>
                </Popconfirm>
                <Popconfirm
                  title="Are you sure to remove this request"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={async () => await Reject(record.id)}
                >
                  <a>
                    <CloseCircleFilled style={{ fontSize: '22px', color: 'red' }} />
                  </a>
                </Popconfirm>
                <ModalPopUp id={record.id} />
              </Space>
            )}
          />
        </Table>
      </div>
    </Template>
  );
};
