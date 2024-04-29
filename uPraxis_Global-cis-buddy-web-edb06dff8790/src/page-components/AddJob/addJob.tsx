/* eslint-disable n/no-callback-literal */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';
import { Template } from './../../layout/Template/template';
import styles from './addJob.module.less';
import { LoadingOutlined, FileImageTwoTone } from '@ant-design/icons';
import { message, Upload, Form, Input, Button, Select } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Head from 'next/head';

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

export const AddJobAndTask = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [merge, setMerge] = useState<Boolean>(false);
  const [override, setOverride] = useState<Boolean>(false);
  const [form] = Form.useForm<{ selectTask: string; selectJob: string }>();
  const selectTaskValue = Form.useWatch('selectTask', form);
  const selectJobValue = Form.useWatch('selectJob', form);

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
        console.log('url', url);
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

  const onFinishJOb = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailedJob = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishTask = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailedTask = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishMerge = (values: any) => {
    if (merge) {
      console.log('Merge Success:', values);
      setMerge(false);
    }
    if (override) {
      console.log('Override Success:', values);
      setOverride(false);
    }
  };

  const onFinishFailedMerge = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Template>
        <Head>
          <title>Admin Portal</title>
          <link rel="icon" href={'/cislogo.png'} />
        </Head>
        <div className={styles.JobContainer}>
          <div className={styles.jobSection}>
            <div className={styles.titleBox}>
              <span className={styles.number}>1</span>{' '}
              <span className={styles.numberTitle}>Add Job</span>
            </div>
            <div className={styles.formContainer}>
              <Form
                name="Job Form"
                labelCol={{ span: 0, offset: 0 }}
                // wrapperCol={{ span: 4, offset: 0 }}
                onFinish={onFinishJOb}
                onFinishFailed={onFinishFailedJob}
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
                  rules={[{ required: true, message: 'Please input your name of the Job!' }]}
                  className={styles.formInputItem}
                >
                  <Input
                    size="large"
                    className={styles.formInput}
                    placeholder={'Type the name of the Job'}
                  />
                </Form.Item>

                <Form.Item>
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
          </div>
          <div className={styles.taskSection}>
            <div className={styles.titleBox}>
              <span className={styles.number}>2</span>{' '}
              <span className={styles.numberTitle}>Add Task</span>
            </div>
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
                    placeholder={'Type the name of the Task'}
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
          </div>
        </div>

        <div className={styles.mergeOverrideContainer}>
          <div className={styles.mergeTitle}>
            <span>Merge Jobs with Task</span>
          </div>
          <div className={styles.mergeJobsAlignment}>
            <Form
              form={form}
              name="Merge Form"
              labelCol={{ span: 24, offset: 0 }}
              onFinish={onFinishMerge}
              onFinishFailed={onFinishFailedMerge}
              autoComplete="off"
              layout={'inline'}
              requiredMark={false}
              className={styles.formLabel}
            >
              <Form.Item
                label="Select Jobs"
                name="selectJob"
                className={styles.formSelect}
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="1">Demo1</Select.Option>
                  <Select.Option value="2">Demo2</Select.Option>
                  <Select.Option value="3">Demo3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Task"
                name="selectTask"
                className={styles.formSelect}
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="1">Demo1</Select.Option>
                  <Select.Option value="2">Demo2</Select.Option>
                  <Select.Option value="3">Demo3</Select.Option>
                </Select>
              </Form.Item>
              <div className={styles.formMergeJobButton}>
                <Form.Item className={styles.formMergeButton}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={styles.formButton}
                    shape="round"
                    onClick={() => setMerge(true)}
                    disabled={!(!!selectTaskValue && !!selectJobValue)}
                  >
                    Merge
                  </Button>
                </Form.Item>
              </div>
              <div className={styles.formOverrideJobButton}>
                <Form.Item shouldUpdate className={styles.formMergeButton}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={styles.formButton}
                    shape="round"
                    onClick={() => setOverride(true)}
                    disabled={!(!!selectTaskValue && !!selectJobValue)}
                  >
                    Override
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Template>
    </>
  );
};
