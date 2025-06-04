import s from './profile-user.module.css';
import {memo, useState} from "react";
import {Profile, UserInfo} from "@/components/profile/profile.tsx";
import {Schedules} from "@/pages/profile-user/components/schedules/schedules.tsx";
import {useParams} from "react-router-dom";
import {useGetStudentProfileQuery} from "@/api/students.ts";
import {EventsProfile} from "@/pages/profile-user/components/events-student/events-student.tsx";
import {ResultsStudent} from "@/pages/profile-user/components/results-student/results-student.tsx";

const buttons = [
    {title: 'Расписания', id: 'schedule'},
    {title: 'Мероприятия', id: 'events'},
    {title: 'Результаты', id: 'results'},
]

export const ProfileUser = memo(() => {
    const [listActive, setListActive] = useState(buttons[0].id);
    const params = useParams();
    const studentId = params.id ? +params.id : 0;
    const {data: student, refetch} = useGetStudentProfileQuery(studentId)


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
            {listActive === buttons[1].id && <EventsProfile studentId={studentId}/>}
            {listActive === buttons[2].id && <ResultsStudent pageStudent={true}/>}
        </section>
    );
});
