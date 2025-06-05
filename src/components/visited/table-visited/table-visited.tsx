import {FC, memo, useEffect, useState} from "react";
import s from "./table-visited.module.css";
import {dates, DayWeek, Participant, updateParticipantAttendance} from "./constants.ts";
import delete_icon from '../../../assets/icons/icon_cross.svg';
import {useGetStudentsInGroupQuery} from "../../../api/groups.ts";
import {Table} from "../../table/table.tsx";
import {DescriptionsVisits} from "../descriptions-visits/descriptions-visits.tsx";

interface Props {
    groupId: number;
    openStudentInfo: (id: number) => void;
}

export const TableVisited: FC<Props> = memo(({groupId, openStudentInfo}) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const {data: students} = useGetStudentsInGroupQuery(groupId);

    useEffect(() => {
        if (students) {
            const example: Participant[] = students.map(item => (
                {
                    id: item.id,
                    name: `${item.last_name} ${item.first_name}`,
                    days_visited: new Set(),
                    days_missed: new Set(),
                    days_missed_without_reason: new Set(),
                    days: dates
                }));
            setParticipants(example)
        }
    }, [JSON.stringify(students)]);

    const handleVisitClick = (id: number, date: DayWeek) => {
        const participantVisited: Participant[] = participants.map(item => {
            if (id === item.id) {
                return updateParticipantAttendance(item, date);
            }
            return item;
        });

        setParticipants(participantVisited);
    };

    const deleteVisited = (id: number) => {
        const participantVisited: Participant[] = participants.filter(item => item.id !== id);
        setParticipants(participantVisited)
    }

    return (
        <section>
            <Table
                renderTheadClassName={s.head_table}
                renderThead={<>
                    <th className={s.name}>
                        <span>Участники:</span>
                    </th>
                    {dates.map((item, index) => <th key={index}>
                            <span>{item.day} </span>
                            <span>{item.dayWeek}</span>
                        </th>
                    )}
                    <th className={s.name}>
                        <span>Посещаемость:</span>
                    </th>
                </>}
                renderTbody={participants?.map((item) => (
                    <tr key={item.id}>
                        <td className={s.name_users}>
                            <h4 onClick={()=>openStudentInfo(item.id)}>{item.name}</h4>
                            <button className={s.button_delete} onClick={() => deleteVisited(item.id)}>
                                <img src={delete_icon} alt="delete icon"/>
                            </button>
                        </td>
                        {dates.map((date, index) => {
                            return <td key={index}>
                                <button
                                    className={item.days_visited.has(date)
                                        ? s.button_visited : item.days_missed_without_reason.has(date)
                                            ? s.missed_class : s.button_missed}
                                    onClick={() => handleVisitClick(item.id, date)}>
                                    {(item.days_visited.has(date)) ? '+' : '-'}
                                </button>
                            </td>
                        })}
                        <td className={s.visited_counts_wrapper}>
                            <span className={s.visited_count}>{item.days_visited.size}</span>
                            <span className={s.missed_count}>{item.days_missed.size}</span>
                            <span
                                className={s.missed_without_reason_count}>{item.days_missed_without_reason.size}</span>
                        </td>
                    </tr>
                ))}
            />
            <DescriptionsVisits/>
        </section>
    );
});
