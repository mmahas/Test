import React from 'react';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

interface DataType {
  id: string;
  tasks: string;
  icon: string;
  createDate: string;
  title: string;
  jobTitle: string;
}

export const columnsTask: ColumnsType<DataType> = [
  {
    title: 'No',
    key: 'id',
    render(text, record, index) {
      return {
        children: index,
      };
    },
  },
  {
    title: 'Task',
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: 'Job',
    key: 'jobTitle',
    dataIndex: 'jobTitle',
    render(text, record) {
      let col = '';
      if (text === 'Carpenter') {
        col = 'blue';
      } else if (text === 'Not assigned') {
        col = 'gray';
      } else if (text === 'Electrician') {
        col = 'green';
      } else if (text === 'Painter') {
        col = 'red';
      } else {
        col = 'yellow';
      }
      return {
        children: <Tag color={col}>{text}</Tag>,
      };
    },
  },

  {
    title: 'Image',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: 'Create date',
    dataIndex: 'createDate',
    key: 'createDate',
    render(text) {
      return {
        children: <div>{moment(text).format('DD/MM/YYYY')}</div>,
      };
    },
  },
];
