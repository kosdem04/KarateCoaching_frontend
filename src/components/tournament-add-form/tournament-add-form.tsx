import {FC} from 'react';
import s from './tournament-add-form.module.css';
import {useForm} from "react-hook-form";
import {useAddEventMutation, useGetEventsTypesQuery} from "../../api/events.ts";

interface Props {
    onClickClose: () => void;
}

const inputs = [
    {type: 'text', label: 'Название турнира:', name: 'title'},
    {type: 'date', label: 'Дата начала соревнований:', name: 'start'},
    {type: 'date', label: 'Дата окончания соревнований:', name: 'finish'},
];

const TournamentAddForm: FC<Props> = ({onClickClose}) => {
    const {handleSubmit, register} = useForm();
    const [addEvent] = useAddEventMutation();
    const {data: eventsTypes} = useGetEventsTypesQuery()

    const onSubmit = (data: any) => {
        addEvent({
            date_start: new Date(data.start),
            date_end: new Date(data.finish),
            name: data.title,
            type_id: data.event_type
        });
        onClickClose()
    }

    return (
        <>
            <div className={s.add_result_page}>
                <div className={s.header}>
                    <h1>Добавить турнир</h1>
                </div>

                <form className={s.result_form} onSubmit={handleSubmit(onSubmit)}>
                    {inputs.map((item, index) => {
                        return <div key={index} className={s.wrapper_input}>
                            <label>{item.label}</label>
                            <input
                                {...register(item.name, {required: true})}
                                type={item.type} className={s.input_form}/>
                        </div>
                    })}
                    <select {...register('event_type', {required: true})}>
                        {eventsTypes?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className={s.submit_button}>Добавить</button>
                </form>
            </div>
        </>
    );
}
export default TournamentAddForm;
