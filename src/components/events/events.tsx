import s from './events.module.css'
import {Table} from "../table/table";
import {FC, memo, useState} from "react";
import TournamentAddForm from "@/components/tournament-add-form/tournament-add-form.tsx";
import {Modal} from "@/components/modal/modal.tsx";
import {formatDate} from "@/shared/utils/date.ts";
import {Events} from "@/api/types-api.ts";
import delete_icon from "@/assets/icons/icon_cross.svg";
import {useLazyGetEventsStudentsQuery} from "@/api/events.ts";
import {ProfileUser} from "@/pages/profile-user/profile-user.tsx";

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
                        <td onClick={() => onClickShowStudents(item.id)} style={{cursor: 'pointer'}}>{item.name}</td>
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
                    <h3>Участники:</h3>
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
