import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Space, message, Tabs, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { connect } from 'dva';
import styles from './index.less';

const Login = ({ dispatch, history }) => {
  const [regForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const handleSubmit = async (values) => {
    setSubmitting(true);
    dispatch({
      type: 'user/login',
      payload: values,
      callback: async (res) => {
        if (res.code === 200) {
          const defaultLoginSuccessMessage = intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: '登录成功！',
          });
          message.success(defaultLoginSuccessMessage);
          /** 此方法会跳转到 redirect 参数所在的位置 */

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query;
          history.replace(redirect || '/');
          return;
        } else {
          message.warning('登录失败')
        }
      },
    });

    setSubmitting(false);
  };

  const regUser = () => {
    regForm
      .validateFields()
      .then((value) => {
        console.log('value',value);
        dispatch({
          type: 'user/regUser',
          payload: {
            username:value.reg_username,
            password:value.reg_password,
            nickname:value.reg_nickname,
          },
          callback: async (res) => {
            if (res.code === 200) {
              message.success('注册成功，请登录');
              setShowModal(false)
              return;
            } else {
              message.warning('注册失败，请稍后');
              return;
            }
          },
        });
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
            </Tabs>

            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '请输入用户名',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '请输入密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
                onClick={() => {
                  regForm.resetFields();
                  setShowModal(true);
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="注册" />
              </a>
            </div>
          </ProForm>
        </div>

        <Modal
          title="注册"
          maskClosable={false}
          visible={showModal}
          onOk={regUser}
          onCancel={() => {
            setShowModal(false);
          }}
        >
          <Form form={regForm}>
            <Form.Item
              name="reg_username"
              label="账号"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
              name="reg_password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="reg_nickname"
              label="昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentState: state.user,
  };
};
export default connect(mapStateToProps)(Login);
