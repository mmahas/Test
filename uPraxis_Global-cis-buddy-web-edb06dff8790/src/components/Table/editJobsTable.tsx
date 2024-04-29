/* eslint-disable react/react-in-jsx-scope */
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

interface DataType {
  id: string;
  tasks: number;
  icon: string;
  createDate: string;
  title: string;
}

export const columns: ColumnsType<DataType> = [
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
    title: 'Job',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Image',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: 'Tasks',
    dataIndex: 'tasks',
    key: 'tasks',
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
