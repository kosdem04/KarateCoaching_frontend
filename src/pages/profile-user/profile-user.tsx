import s from './profile-user.module.css';
import {FC, memo, useState} from "react";
import {Profile, UserInfo} from "@/components/profile/profile.tsx";
import {Schedules} from "@/pages/profile-user/components/schedules/schedules.tsx";
import {useGetStudentProfileQuery} from "@/api/students.ts";
import {EventsProfile} from "@/pages/profile-user/components/events-student/events-student.tsx";
import {ResultsStudent} from "@/pages/profile-user/components/results-student/results-student.tsx";
import { jwtDecode } from 'jwt-decode';

const buttons = [
    {title: 'Расписания', id: 'schedule'},
    {title: 'Мероприятия', id: 'events'},
    {title: 'Результаты', id: 'results'},
]

interface Props {
    student_id?: number;
}

export const ProfileUser:FC<Props> = memo(({student_id}) => {
    const [listActive, setListActive] = useState(buttons[0].id);
    const jwt = localStorage.getItem('token')
    const studentId = jwt ? (jwtDecode(jwt)?.sub ?? 0) : 0;

    const {data: student, refetch} = useGetStudentProfileQuery(student_id || +studentId)


    const onClickHandler = (id: string) => setListActive(id)

    if (!student) {
        return <p>...Загрузка</p>
    }

    const useData: UserInfo = {
        id: student.student_data.id,
        first_name: student.student_data.first_name,
        last_name: student.student_data.last_name,
        sur_name: student.student_data.patronymic,
        phone_number: student.student_data.phone_number,
        date_of_birth: student.student_data.date_of_birth,
        email: student.student_data.email,
        logo: student.student_data.img_url,
    }

    return (
        <section className={s.profile}>
            <Profile user={useData} refetch={refetch}/>
            <div className={s.buttons_wrapper}>
                {buttons.map(item => {
                    return <button
                        className={listActive === item.id ? s.button : undefined}
                        key={item.id} onClick={() => onClickHandler(item.id)}>{item.title}</button>
                })}
            </div>
            {listActive === buttons[0].id && <Schedules/>}
            {listActive === buttons[1].id && <EventsProfile studentId={student_id || +studentId}/>}
            {listActive === buttons[2].id && <ResultsStudent pageStudent={true}/>}
        </section>
    );
});
