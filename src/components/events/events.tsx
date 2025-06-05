import s from './events.module.css'
import {Table} from "../table/table";
import {FC, memo, useState} from "react";
import delete_icon from "../../assets/icons/icon_cross.svg";
import {Events} from "../../api/types-api.ts";
import {useAddStudentEventMutation, useLazyGetEventsStudentsQuery} from "../../api/events.ts";
import {formatDate} from "../../shared/utils/date.ts";
import {ProfileUser} from "../../pages/profile-user/profile-user.tsx";
import TournamentAddForm from "../tournament-add-form/tournament-add-form.tsx";
import {Modal} from "../modal/modal.tsx";
import {useGetStudentsQuery} from "../../api/students.ts";

const tableHead = ['Название турнира', 'Тип мероприятия', 'Дата начала', 'Дата окончания'];

interface Props {
    events: Events[];
    pageStudent?: boolean;
}

export const EventsStudent: FC<Props> = memo(({events, pageStudent}) => {
    const [updateEvent, setUpdateEvent] = useState(false);
    const [showStudents, setShowStudents] = useState<number | null>(null);
    const [showStudentProfile, setShowStudentProfile] = useState<number | null>(null);
    const [trigger, {data: students}] = useLazyGetEventsStudentsQuery();
    const {data: studentsAll} = useGetStudentsQuery();
    const [addStudentEvent] = useAddStudentEventMutation()
    const [studentId, setStudentId] = useState<number | null>(null);

    const onClickUpdateEvent = () => {
        setUpdateEvent(prev => !prev);
    }

    const onClickShowProfile = (data: number | null) => setShowStudentProfile(data)

    const onClickShowStudents = (data: number | null) => {
        if (data) {
            trigger(data)
        }
        setShowStudents(data)
    };

    const clickAddStudent = () => {
        if (studentId && showStudents) {
            addStudentEvent({student_id: studentId, event_id: showStudents});
        }
    }

    return (
        <>
            <div className={s.title_wrapper}>
                <h2>Список мероприятий</h2>
                {!pageStudent && <button className={s.add_event} onClick={onClickUpdateEvent}>Добавить</button>}
            </div>
            <Table
                renderThead={tableHead.map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
                renderTbody={events?.map((item) => {
                    return <tr key={item.id}>
                        <td onClick={() => pageStudent ? undefined :onClickShowStudents(item.id)} style={{cursor: 'pointer'}}>{item.name}</td>
                        <td>{item.type.name}</td>
                        <td>{formatDate(item.date_start)}</td>
                        <td>{formatDate(item.date_end)}</td>
                    </tr>
                })}
            />
            {showStudents && <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={() => onClickShowStudents(null)}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <div className={s.title_wrapper}>
                        <h3>Участники:</h3>
                        <div className={s.select_wrapper}>
                            <select className={s.select} onChange={(e) => setStudentId(+e.target.value)}>
                                <option value="" disabled selected>Выберите</option>
                                {studentsAll?.map((student) => (
                                    !students?.some(item => item.id === student.student_data.id) ? (
                                        <option key={student.student_data.id} value={student.student_data.id}>
                                            {student.student_data.last_name} {student.student_data.first_name}
                                        </option>
                                    ) : null
                                ))}
                            </select>
                            <button onClick={clickAddStudent}>Добавить</button>
                        </div>
                    </div>
                    <div className={s.card_container}>
                        {students?.map((item) => {
                            return (
                                <div className={s.card_schedule} key={item.id}
                                     onClick={() => onClickShowProfile(item.id)}>
                                    <p><strong>Имя:</strong> {item.first_name}</p>
                                    <p><strong>Фаилия:</strong> {item.last_name}</p>
                                    <p><strong>Почта:</strong> {item.email}</p>
                                </div>)
                        })}
                    </div>
                </div>
            </div>}
            {showStudentProfile && <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={() => onClickShowProfile(null)}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <ProfileUser student_id={showStudentProfile}/>
            </div>}
            {updateEvent && <Modal onClickClose={onClickUpdateEvent}>
                <TournamentAddForm onClickClose={onClickUpdateEvent}/>
            </Modal>}
        </>
    );
});
