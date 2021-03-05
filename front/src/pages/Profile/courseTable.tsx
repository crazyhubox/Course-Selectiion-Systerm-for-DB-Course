import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { ReactText, useState } from "react";
import { Course } from "../../global";


// 内部小组件
function CourseTable(props: any) {

    const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([])


    // 定义表格格式
    const columns: ColumnsType<Course> = [
        {
            title: '课号',
            dataIndex: 'cno',
        },
        {
            title: '  课 名  ',
            dataIndex: 'cname',
        },
        {
            title: '学分',
            dataIndex: 'credit',
        },
        {
            title: '院系',
            dataIndex: 'cdept',
        },
        {
            title: '任课老师',
            dataIndex: 'tname',
        },
    ];


    // 处理按钮选择
    const onSelectChange = (selectedRowKeys: ReactText[]) => {
        setSelectedRowKeys(selectedRowKeys)
    }


    //  定义表格初始选择数组以及回调函数
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    // 处理 confirm 按钮点击事件
    const onConfirm = () => {
        props.callback(props.confirm, selectedRowKeys)
        onSelectChange([])
    }


    return (
        <div className="CourseTable" >
            <Table<Course> size='small' columns={columns}
                rowSelection={rowSelection}
                rowKey={record => record.cno}
                footer={() => '共' + props.course.length + '门课'}
                pagination={{
                    size: "small",
                    pageSize: 8
                }}
                dataSource={props.course} />
            <Button onClick={onConfirm} >{props.confirm}</Button>
        </div>
    )
}




export default CourseTable