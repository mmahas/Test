import React from 'react';
import styles from './message.module.less';

export const ScreenSizeMessage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>The admin portal can only be viewed in desktop mode </h1>
      </div>
    </>
  );
};
