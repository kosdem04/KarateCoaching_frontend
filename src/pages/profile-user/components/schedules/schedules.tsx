import {Fragment, memo} from "react";
import s from './schedules.module.css'

interface SchedulesType {
    data: string;
    address: string;
    visited: string;
}

const schedules: SchedulesType[] = [
    {data: '12.05.2025 15.00', address: 'Нестерова 66', visited: 'Посетил'},
    {data: '05.05.2025 18.00', address: 'Сурганова 22', visited: 'Прогул'},
    {data: '01.05.2025 14.00', address: 'Голодеда 11', visited: 'Посетил'},
    {data: '25.04.2025 17.00', address: 'Громова 30', visited: 'Посетил'},
    {data: '12.04.2025 13.00', address: 'Шевченко 11', visited: 'Прогул'},
    {data: '02.04.2025 06.00', address: 'Нестерова 15', visited: 'Прогул'},
];

export const Schedules = memo(() => {
    return (
        <section className={s.section}>
            <h2>Расписания занятий</h2>

            <div className={s.card_container}>
                {schedules.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <div className={s.card_schedule}>
                                <p><strong>Дата:</strong> {item.data}</p>
                                <p><strong>Адрес:</strong> {item.address}</p>
                                <p><strong>Посещаемость:</strong> {item.visited}</p>
                            </div>
                            {schedules.length !== index + 1 && <hr className={s.line}/>}
                        </Fragment>)
                })}
            </div>
        </section>
    );
});
