import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';

const { confirm } = Modal;
const SearchTable = ({ dispatch, teacher_name }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'teacher_name',
      hideInSearch: true,
    },
    {
      title: '番号',
      dataIndex: 'video_code_ch',
      render: (text, record) => {
        if (record.chinese === '1') {
          return record.video_code_ch;
        } else {
          return record.video_code;
        }
      },
    },
    {
      title: '磁力',
      dataIndex: 'magnet',
    },
    {
      title: '片名',
      dataIndex: 'video_name',
    },
    {
      title: '是否为中文',
      dataIndex: 'chinese',
      hideInSearch: true,
      render: (text, record) => {
        if (record.chinese === '1') {
          return <Tag color="geekblue">有中文</Tag>;
        } else {
          return <Tag color="red">无中文</Tag>;
        }
      },
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <div>
            <a>
              <span
                style={{ color: '#1890ff' }}
                onClick={() => {
                  setShowModal(true);
                  setRecord(record);
                  setModalName('编辑');
                  form.setFieldsValue({
                    video_code: record.video_code,
                    video_code_ch: record.video_code_ch,
                    chinese: record.chinese,
                    video_name: record.video_name,
                    magnet: record.magnet,
                  });
                }}
              >
                编辑
              </span>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a>
              <span
                style={{ color: 'red' }}
                onClick={() => {
                  confirm({
                    title: '你确定要删除该数据吗?',
                    icon: <ExclamationCircleOutlined />,
                    onOk() {
                      del(record);
                    },
                  });
                }}
              >
                删除
              </span>
            </a>
          </div>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  //  发送请求获得数据
  let [data, setData] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [record, setRecord] = useState({});
  let [modalName, setModalName] = useState('新增');
  let [order, setOrder] = useState('desc');
  useEffect(() => {
    getList();
  }, [order]);

  const getList = () => {
    dispatch({
      type: 'teacher/search',
      payload: {
        teacher_name,
        order,
      },
      callback: (res) => {
        if (res.code === 200) {
          setData(res.data);
        }
      },
    });
  };

  const add = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        if (modalName === '新增') {
          dispatch({
            type: 'teacher/add',
            payload: { teacher_name, ...values },
            callback: (data) => {
              if (data.code === 200) {
                message.success('新增成功！');
                form.resetFields();
                setShowModal(false);
                getList();
              }
            },
          });
        } else {
          dispatch({
            type: 'teacher/edit',
            payload: { ...record, ...values },
            callback: (data) => {
              if (data.code === 200) {
                message.success('编辑成功！');
                form.resetFields();
                setShowModal(false);
                getList();
              }
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const del = (record) => {
    dispatch({
      type: 'teacher/del',
      payload: { id: record.id },
      callback: (data) => {
        if (data.code === 200) {
          message.success('删除成功！');
          getList();
        }
      },
    });
  };

  const addMore = () => {
    let list = [];
    list.map((values, index) => {
      setTimeout(() => {
        dispatch({
          type: 'teacher/add',
          payload: { teacher_name, ...values },
        });
      }, 2000 * (index + 1));
    });
    return;
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={data}
        search={{
          defaultCollapsed: false,
        }}
        onSubmit={(value) => {
          console.log(value);
          dispatch({
            type: 'teacher/search',
            payload: {
              teacher_name,
              ...value,
            },
            callback: (res) => {
              if (res.code === 200) {
                setData(res.data);
              }
            },
          });
        }}
        onReset={getList}
        headerTitle={teacher_name}
        options={{
          reload: () => {
            getList();
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setShowModal(true);
              setModalName('新增');
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              addMore();
            }}
          >
            <PlusOutlined />
            批量新建
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              if (order === 'desc') {
                setOrder('asc');
              } else {
                setOrder('desc');
              }
            }}
          >
            {order === 'desc' ? '正序' : '倒叙'}
          </Button>,
        ]}
      />

      <Modal
        title={modalName + ' - ' + teacher_name}
        centered
        forceRender
        maskClosable={false}
        open={showModal}
        onOk={add}
        onCancel={() => {
          form.resetFields();
          setShowModal(false);
        }}
      >
        <Form form={form} name="teacher" initialValues={{ chinese: '1' }} autoComplete="off">
          <Form.Item
            label="番号"
            name="video_code"
            rules={[{ required: true, message: '请输入番号!' }]}
          >
            <Input
              placeholder="请输入番号!"
              onChange={(e) => {
                form.setFieldValue('video_code', e.target.value.toUpperCase());
                if (form.getFieldValue('chinese') == 1) {
                  form.setFieldValue('video_code_ch', e.target.value.toUpperCase() + '-C');
                } else {
                  form.setFieldValue('video_code_ch', e.target.value.toUpperCase());
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="磁力"
            name="magnet"
            rules={[{ required: true, message: '请输入磁力!' }]}
          >
            <Input placeholder="请输入磁力!" />
          </Form.Item>
          <Form.Item
            label="片名"
            name="video_name"
            rules={[{ required: true, message: '请输入片名!' }]}
          >
            <Input placeholder="请输入片名!" />
          </Form.Item>
          <Form.Item
            label="是否中文"
            name="chinese"
            rules={[{ required: true, message: '请选择是否中文!' }]}
          >
            <Radio.Group
              onChange={(e) => {
                let list = form.getFieldValue('video_code_ch').split('-');
                console.log(e.target.value, list);
                if (list.length === 2) {
                  if (e.target.value == 1) {
                    list = [...list, 'C'];
                    form.setFieldValue('video_code_ch', list.join('-').toUpperCase());
                  }
                } else if (list.length > 2) {
                  if (e.target.value == 0) {
                    list = list.slice(0, list.length - 1);
                    form.setFieldValue('video_code_ch', list.join('-').toUpperCase());
                  }
                }
              }}
            >
              <Radio value="1">是</Radio>
              <Radio value="0">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="中文番号"
            name="video_code_ch"
            rules={[{ required: true, message: '请输入中文番号!' }]}
          >
            <Input placeholder="请输入中文番号!" disabled />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    currentState: state.teacher,
  };
};
export default connect(mapStateToProps)(SearchTable);
