
import { Input } from "antd";
import React, { ReactText, useState } from "react";
import { AnyAction } from "redux";
import { Course } from "../../global";
import CourseTable from "./courseTable";

const { Search } = Input



interface CourseProps {
    courses: Course[]
    dispatch: (arg: AnyAction) => void
}


function CourseList(props: CourseProps) {
    console.log("CourseProps:", props);


    // state 
    const [searchOn, setSearchOn] = useState(false);
    const [searchKeyWold, setSearchKeyWold] = useState('');

    const [courseChoosed, setCourseChoosed] = useState(props.courses.filter(item => item.choosed))


    const [courseUnChoosed, setCourseUnChoosed] = useState(
        props.courses.filter(item => {

            if (searchOn) {
                return (item.search(searchKeyWold) && (!item.choosed))
            } else {

                return (!item.choosed)
            }

        })
    )
    // 执行搜索,获取搜索之后的数组







    //  搜索框的方法
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 如果搜索框清空，则关闭搜索
        if (e.target.value === '') {
            setSearchOn(false)
            setSearchKeyWold('')
        }
    }
    const onSearch = (value: string) => {
        setSearchKeyWold(value)
        setSearchOn(true)
    }

    const handleTableconfirm = (tag: string, selectedRowKeys: ReactText[]) => {
        console.log("handleTableconfirm", selectedRowKeys);

        let type: string
        if (tag === '选课') {
            type = 'select'
        } else {
            type = 'unSelect'

        }

        const action = {
            type: type,
            selectedRowKeys: selectedRowKeys as string[]
        }

        props.dispatch(action)

    }

    return (
        <>
            <div className='CourseList'>
                <h3>可选课程</h3>
                <Search
                    placeholder="input search text"
                    allowClear
                    size='middle'
                    onSearch={onSearch}
                    onChange={onChange}
                ></Search>
                <CourseTable callback={handleTableconfirm} confirm='选课' course={courseUnChoosed}></CourseTable>
            </div>
            <div className='CourseList'>
                <h3>已选课程</h3>
                <CourseTable callback={handleTableconfirm} confirm='退课' course={courseChoosed}></CourseTable>
            </div>
        </>
    )
}



export default CourseList