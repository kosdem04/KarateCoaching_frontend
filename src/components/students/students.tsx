import s from './students.module.css';
import {Fragment, memo} from "react";
import {useGetStudentsQuery} from "@/api/students.ts";

export const Students = memo(() => {
    const {data: students} = useGetStudentsQuery()

    return (
        <div className={s.card_container}>
            {students?.map((item) => {
                return (
                    <Fragment key={item.id}>
                        <div className={s.card_schedule}>
                            <p><strong>Имя:</strong> {item.first_name}</p>
                            <p><strong>Фаилия:</strong> {item.last_name}</p>
                            <p><strong>Почта:</strong> {item.email}</p>
                        </div>
                    </Fragment>)
            })}
        </div>
    );
});
