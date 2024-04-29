/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import styles from './auth.module.less';
import Logo from './../../../public/cislogo.png';
import Image1 from './../../../public/loginImage.jpg';
import Image from 'next/image';
import { Button, Form, Input } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ScreenSizeMessage } from '../../components/ScreenSize/message';
import { useLogin } from './useLogin';

export const Login = () => {
  const history = useRouter();
  const { login } = useLogin();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    login(values)
      .then(async () => await history.push('/admin/add-job-and-task'))
      .catch((e: any) => alert(e));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Head>
        <title>Admin Portal</title>
        <link rel="icon" href={'/cislogo.png'} />
      </Head>
      <div className={styles.bgImage}>
        <Image src={Image1} alt="bg image" className={styles.leftImage} />
      </div>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div>
            <Image src={Logo} alt="logo" className={styles.Logo} />
          </div>
          <div className={styles.title}>
            <p>Admin Portal</p>
          </div>

          <div>
            <Form
              name="Login Form"
              labelCol={{ span: 8, offset: 6 }}
              wrapperCol={{ span: 12, offset: 6 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout={'vertical'}
              requiredMark={false}
              className={styles.formLabel}
            >
              <Form.Item
                style={{ paddingBottom: '11pt' }}
                label="Enter your email"
                name="email"
                // rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input size="large" className={styles.formInput} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" className={styles.formInput} />
              </Form.Item>

              <Form.Item className={styles.formButtonItem}>
                <Button type="primary" htmlType="submit" size="large" className={styles.formButton}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <ScreenSizeMessage />
    </>
  );
};
