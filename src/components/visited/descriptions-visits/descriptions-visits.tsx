import s from './descriptions-visits.module.css';
import {memo} from "react";

export const DescriptionsVisits = memo(() => {

    return (
        <div className={s.reasons_container}>
            <div className={s.reason_wrapper}>
                <button className={s.button_visited}>+</button>
                <p>Посетил занятие</p>
            </div>
            <div className={s.reason_wrapper}>
                <button className={s.button_missed}>-</button>
                <p>Пропустил занятие</p>
            </div>
            <div className={s.reason_wrapper}>
                <button className={s.missed_class}>-</button>
                <p>Посетил занятие без уважительной причины</p>
            </div>
        </div>
    );
});
