import './AddResultForm.css';
import {useForm} from "react-hook-form";
import {useGetEventsQuery} from "../../api/events.ts";
import {useGetStudentsQuery} from "../../api/students.ts";
import {useAddResultMutation, useGetResultsPlacesQuery} from "../../api/results.ts";

const inputs = [
    {name: 'points_scored', label: 'Количество заработанных баллов:'},
    {name: 'points_missed', label: 'Количество пропущенных баллов:'},
    {name: 'number_of_fights', label: 'Количество боев:'},
]

const AddResultForm = () => {
    const {data: events} = useGetEventsQuery();
    const {data: students} = useGetStudentsQuery();
    const {data: resultsPlaces} = useGetResultsPlacesQuery();
    const [addResult] = useAddResultMutation();
    const {handleSubmit, register, reset} = useForm();

    const onSubmit = (data: any) => {
        addResult({
            event_id: data.tournament_id,
            student_id: data.sportsman_id,
            place_id: data.place_id,
            points_scored: data.points_scored,
            points_missed: data.points_missed,
            number_of_fights: data.number_of_fights,
        }).unwrap().then(() => reset());
    };

    return (
        <>
            <div className="add-result-page">
                <div className="header">
                    <h1>Добавить результат спортсмена</h1>
                </div>

                <form className="result-form" onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Соревнование:
                        <select
                            {...register('tournament_id', {required: true})}>
                            <option value="">Выберите...</option>
                            {events?.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Спортсмен:
                        <select
                            {...register('sportsman_id', {required: true})}>
                            <option value="">Выберите...</option>
                            {students?.map(s => (
                                <option key={s.student_data.id} value={s.student_data.id}>{s.student_data.last_name} {s.student_data.first_name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Место:
                        <select
                            {...register('place_id', {required: true})}>
                            <option value="">Выберите...</option>
                            {resultsPlaces?.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </label>
                    {inputs.map((item, index) => {
                        return <div style={{width: '100%'}} key={index}>
                            <label>{item.label}</label>
                            <input
                                style={{width: '100%'}}
                                {...register(item.name, {required: true})}
                                type="number"/>
                        </div>
                    })}
                    <button type="submit" className="submit-button">Добавить</button>
                </form>
            </div>
        </>
    );
}
export default AddResultForm;
