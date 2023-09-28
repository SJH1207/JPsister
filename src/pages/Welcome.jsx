import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col } from 'antd';
import { useIntl, FormattedMessage, Link, history } from 'umi';
import { searchTeacher } from '@/services/teacher';
import styles from './Welcome.less';

const Welcome = () => {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const res = await searchTeacher();
    console.log(res);
    if (res.code === 200) {
      setList(res.data);
    }
  }, []);

  return (
    <PageContainer>
      <Row gutter={[16, 24]}>
        {list &&
          list.length > 0 &&
          list.map((i) => {
            return (
              <Col className={styles.gutter} span={3} key={i.teacher_code}>
                <a>
                  <div
                    onClick={() => {
                      history.push(`/${i.teacher_path}`);
                    }}
                  >
                    {i.teacher_name}
                  </div>
                </a>
              </Col>
            );
          })}
      </Row>
    </PageContainer>
  );
};

export default Welcome;
