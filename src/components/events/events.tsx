import s from './events.module.css'
import {Table} from "../table/table";
import {FC, memo, useState} from "react";
import TournamentAddForm from "@/components/tournament-add-form/tournament-add-form.tsx";
import {Modal} from "@/components/modal/modal.tsx";
import {formatDate} from "@/shared/utils/date.ts";
import {Events} from "@/api/types-api.ts";
import delete_icon from "@/assets/icons/icon_cross.svg";
import {useGetStudentsQuery} from "@/api/students.ts";

const tableHead = ['Название турнира', 'Тип мероприятия', 'Дата начала', 'Дата окончания'];

interface Props {
    events: Events[];
    pageStudent?: boolean;
}

export const EventsStudent: FC<Props> = memo(({events, pageStudent}) => {
    const [updateEvent, setUpdateEvent] = useState(false);
    const [showStudents, setShowStudents] = useState(false);
    const {data: students} = useGetStudentsQuery()

    const onClickUpdateEvent = () => {
        setUpdateEvent(prev => !prev);
    }

    const onClickShowStudents = () => setShowStudents(prev => !prev);

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
                renderTbody={events?.map((item, index) => {
                    return <tr key={index}>
                        <td onClick={onClickShowStudents} style={{cursor: 'pointer'}}>{item.name}</td>
                        <td>{item.type.name}</td>
                        <td>{formatDate(item.date_start)}</td>
                        <td>{formatDate(item.date_end)}</td>
                    </tr>
                })}
            />
            {showStudents && <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={onClickShowStudents}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <h3>Участники:</h3>
                    <div className={s.card_container}>
                        {students?.map((item) => {
                            return (
                                <div className={s.card_schedule} key={item.id}>
                                    <p><strong>Имя:</strong> {item.first_name}</p>
                                    <p><strong>Фаилия:</strong> {item.last_name}</p>
                                    <p><strong>Почта:</strong> {item.email}</p>
                                </div>)
                        })}
                    </div>
                </div>
            </div>}
            {updateEvent && <Modal onClickClose={onClickUpdateEvent}>
                <TournamentAddForm onClickClose={onClickUpdateEvent}/>
            </Modal>}
        </>
    );
});
