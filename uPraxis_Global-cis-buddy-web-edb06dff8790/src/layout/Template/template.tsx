/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState, useEffect } from 'react';
import styles from './template.module.less';
import { Button } from 'antd';
import DropIcon from './../../../public/dropdown.png';
import Image from 'next/image';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import CISTitle from './../../../public/cisTitle.png';
import { TemplateCard } from './../../components/TemplateCard/card';
import { useRouter } from 'next/router';
import { ScreenSizeMessage } from '../../components/ScreenSize/message';

export const Template = (props: any) => {
  const [upIcon, setUpIcon] = useState(true);
  const [job1, setJob1] = useState(true);
  const [job2, setJob2] = useState(false);
  const history = useRouter();

  const open = () => {
    setUpIcon(!upIcon);
  };

  const barSelect1 = () => {
    setJob1(true);
    setJob2(false);
    history.push('/admin/add-job-and-task');
  };

  // const barSelect2 = () => {
  //   setJob2(true);
  //   setJob1(false);
  //   history.push('/home');
  // };

  useEffect(() => {
    if (history.pathname.split('/')[1] === 'home') {
      setJob2(true);
      setJob1(false);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.barContainer}>
          <div className={styles.cisTitleImageAlignment}>
            <Image src={CISTitle} alt="cis title" className={styles.cisTitleImage} />
          </div>
          <ul className={styles.barAlignment}>
            <li className={styles.TitleMenu}>
              <div className={styles.menuItems}>
                <div className={styles.switchButton1}>
                  <Button onClick={open} className={styles.switchButton}>
                    {upIcon ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </Button>
                </div>
                <div className={styles.flexTitle}>
                  <div className={styles.TemplateIcon}>
                    <Image src={DropIcon} alt="icon" />
                  </div>
                  <div className={styles.tempManTitle}>
                    <span>Template Management</span>
                  </div>
                </div>
              </div>
              {upIcon ? (
                <ul>
                  <li className={styles.subMenu1}>
                    <Button
                      type="link"
                      onClick={barSelect1}
                      className={job1 ? styles.falseColor : styles.trueColor}
                    >
                      Add Job and task
                    </Button>
                  </li>
                  <li className={styles.subMenu2}>
                    <Button
                      type="link"
                      // onClick={barSelect2}
                      className={job2 ? styles.falseColor : styles.trueColor}
                    >
                      {' '}
                      Add Template
                    </Button>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </li>
          </ul>
        </div>

        <div className={styles.cardTemplate}>
          <TemplateCard body={props.children} />
        </div>
      </div>
      <ScreenSizeMessage />
    </>
  );
};
