/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import styles from './card.module.less';
import { SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useLogout } from '../../page-components/Auth/useLogout';

const items: MenuProps['items'] = [
  {
    label: 'Add Jobs and task',
    key: 'add',
  },
  {
    label: 'Edit Jobs and task',
    key: 'edit',
  },
  {
    label: 'Requested Jobs',
    key: 'request',
  },
];

export const TemplateCard = (props: any) => {
  const [current, setCurrent] = useState('add');
  const history = useRouter();
  const { logout } = useLogout();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key === 'add') {
      history.push('/admin/add-job-and-task');
    } else if (e.key === 'edit') {
      history.push('/admin/edit-jobs-and-task');
    } else if (e.key === 'request') {
      history.push('/admin/request-jobs');
    }
  };

  useEffect(() => {
    const pathName = async () => {
      const path = await history.pathname.split('/')[2];
      if (path === 'add-job-and-task') {
        setCurrent('add');
      } else if (path === 'edit-jobs-and-task') {
        setCurrent('edit');
      } else if (path === 'request-jobs') {
        setCurrent('request');
      }
    };

    pathName();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.card} bordered={false}>
          <div>
            <div className={styles.head}>
              <div className={styles.title}>
                <span>Template Management</span>
              </div>
              <div className={styles.leftProfile}>
                <div className={styles.leftIconButton}>
                  <Button
                    shape="round"
                    onClick={() => {
                      logout();
                      history.push('/login');
                    }}
                  >
                    Logout
                  </Button>
                </div>
                <div className={styles.leftIcon}>
                  <SearchOutlined />
                </div>
                <div className={styles.leftIcon}>
                  {' '}
                  <BellOutlined />
                </div>
                <div>
                  <Avatar
                    icon={<UserOutlined />}
                    // style={{ color: 'gray', background: 'yellow' }}
                    size={45}
                  />
                </div>
              </div>
            </div>

            <div className={styles.MenuItems}>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
            </div>
          </div>
          <div className={styles.cardBody}>{props.body}</div>
        </Card>
      </div>
    </>
  );
};
