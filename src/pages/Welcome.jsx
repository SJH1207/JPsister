import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col } from 'antd';
import { useIntl, FormattedMessage, Link } from 'umi';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);


export default () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Row gutter={[16, 24]}>
      <Col className={styles.gutter} span={3}>
        <div> <Link to="/fengkelian">楓カレン</Link></div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div><Link to="/sangong">三宮つばき</Link></div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div><Link to="/sanshangyouya">三上悠亜</Link></div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div>col-6</div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div>col-6</div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div>col-6</div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div>col-6</div>
      </Col>
      <Col className={styles.gutter} span={3}>
        <div>col-6</div>
      </Col>
    </Row>
    </PageContainer>
  );
};
