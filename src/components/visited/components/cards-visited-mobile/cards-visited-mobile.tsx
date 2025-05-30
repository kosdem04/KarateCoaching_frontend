import {CardMobile} from "@/components/card-mobile/card-mobile.tsx";
import {
    dates,
    DayWeek,
    Participant,
    participantsDefault,
    updateParticipantAttendance
} from "@/components/visited/components/table-visited/constants.ts";
import s from "./cards-visited-mobile.module.css";
import {DescriptionsVisits} from "@/components/visited/components/descriptions-visits/descriptions-visits.tsx";
import {memo, useState} from "react";

export const CardsVisitedMobile = memo(() => {
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
        <div className={s.container}>
            {participants.map((item, index) => {
                return <CardMobile key={index}>
                    <h6 className={s.name}>{item.name}</h6>
                    <div className={s.dates}>{dates.map((date, index) => {
                        return <div className={s.date_container} key={index}>
                            <div className={s.date}>
                                <span>{date.day}</span>
                                <span>{date.dayWeek}</span>
                            </div>
                            <button
                                className={item.days_visited.has(date)
                                    ? s.button_visited : item.days_missed_without_reason.has(date)
                                        ? s.missed_class : s.button_missed}
                                onClick={() => handleVisitClick(item.id, date)}>
                                {(item.days_visited.has(date)) ? '+' : '-'}
                            </button>
                        </div>
                    })}</div>
                </CardMobile>
            })}
            <DescriptionsVisits/>
        </div>
    );
});
