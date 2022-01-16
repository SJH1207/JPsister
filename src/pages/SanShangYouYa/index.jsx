import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Tag} from 'antd';
import ProTable from '@ant-design/pro-table';
import { getSanshangyouya } from '@/services/jpsisters';

const SanShangYouYa = (props) => {

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '番号',
            dataIndex: 'number',
        },
        {
            title: '磁力',
            dataIndex: 'torrentmagnet',
        },
        {
            title: '是否为中文',
            dataIndex: 'isChinese',
            render: (_, record) => {
                console.log(record);
                let editOperation = [];
                if (record.isChinese) {
                    editOperation.push(
                        <Tag color="geekblue">有中文</Tag>
                    );
                } else {
                    editOperation.push(
                        <Tag color="red">无中文</Tag>

                    );
                }
                return editOperation;
            }
        },

    ];

    //  发送请求获得数据
    let [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const resData = await getSanshangyouya()
            setData(resData)
            console.log(data);
        }
        fetchData();
    }, [])

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                dataSource={data}
                rowKey="key"
                search={false}
                dateFormatter="string"
                headerTitle="三上悠亜"
            />
        </PageContainer>
    );
};

export default SanShangYouYa
