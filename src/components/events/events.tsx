import s from './events.module.css'
import {Table} from "../table/table";
import {FC, memo, useState} from "react";
import TournamentAddForm from "@/components/tournament-add-form/tournament-add-form.tsx";
import {Modal} from "@/components/modal/modal.tsx";
import {formatDate} from "@/shared/utils/date.ts";
import {Events} from "@/api/types-api.ts";

const tableHead = ['Название турнира', 'Тип мероприятия', 'Дата начала', 'Дата окончания'];

interface Props {
    events: Events[];
    pageStudent?: boolean;
}

export const EventsStudent: FC<Props> = memo(({events, pageStudent}) => {
    const [updateEvent, setUpdateEvent] = useState(false);

    const onClickUpdateEvent = () => {
        setUpdateEvent(prev => !prev);
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
                renderTbody={events?.map((item, index) => {
                    return <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.type.name}</td>
                        <td>{formatDate(item.date_start)}</td>
                        <td>{formatDate(item.date_end)}</td>
                    </tr>
                })}
            />
            {updateEvent && <Modal onClickClose={onClickUpdateEvent}>
                <TournamentAddForm onClickClose={onClickUpdateEvent}/>
            </Modal>}
        </>
    );
});
