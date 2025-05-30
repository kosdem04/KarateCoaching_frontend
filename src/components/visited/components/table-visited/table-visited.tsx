import {memo, useState} from "react";
import s from "./table-visited.module.css";
import {Table} from "@/components/table/table.tsx";
import {
    dates, DayWeek, Participant, participantsDefault, updateParticipantAttendance
} from "./constants.ts";
import {DescriptionsVisits} from "@/components/visited/components/descriptions-visits/descriptions-visits.tsx";


export const TableVisited = memo(() => {
    const [participants, setParticipants] = useState<Participant[]>(participantsDefault);

    const handleVisitClick = (id: number, date: DayWeek) => {
        const participantVisited: Participant[] = participants.map(item => {
            if (id === item.id) {
                return updateParticipantAttendance(item, date);
            }
            return item;
        });

        setParticipants(participantVisited);
    };

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
                renderTbody={participants.map((item, index) => (
                    <tr key={index}>
                        <td className={s.name}>{item.name}</td>
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
