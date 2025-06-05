import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './EditResultForm.css';
import api from "../../api/axios.ts";
import DeleteResultModal from "../DeleteResultModal/delete-result-modal.tsx";
import {useGetStudentsQuery} from "../../api/students.ts";
import {useGetEventsQuery} from "../../api/events.ts";
import {useGetResultsPlacesQuery} from "../../api/results.ts";

interface Form {
    event_id: string
    student_id: string
    place_id: string
    points_scored: string
    points_missed: string
    number_of_fights: string
}

export default function EditResultForm() {
    const { id } = useParams(); // id результата
    const {data: sportsmen} = useGetStudentsQuery()
    const {data: tournaments} = useGetEventsQuery()
    const {data: places} = useGetResultsPlacesQuery()
    // const [sportsmen, setSportsmen] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Form>({
        event_id: '',
        student_id: '',
        place_id: '',
        points_scored: '',
        points_missed: '',
        number_of_fights: ''
    });
    const [originalData, setOriginalData] = useState<Form>({
        event_id: '0',
        student_id: '0',
        place_id: '0',
        points_scored: '0',
        points_missed: '0',
        number_of_fights: '0'
    });

    useEffect(() => {
        api.get(`results/${id}`)
            .then(res => {
                setFormData(res.data);
                setOriginalData(res.data);
            });
    }, [id]);

    const handleDelete = () => {
        api.delete(`results/${id}`)
            .then(() => {
                navigate("/my_results");
                // Можно перенаправить пользователя или обновить состояние
            })
            .catch(error => {
                console.error('Ошибка при удалении:', error);
            });
        setShowModal(false); // Закрываем модальное окно после удаления
    };

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        // Преобразуем все значения в числа (в том числе пустые строки будут преобразовываться в NaN)
        const newValue = parseInt(value, 10);

        setFormData({ ...formData, [name]: isNaN(newValue) ? value : newValue });
    };

    const isChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!isChanged) return;

        api.put(`results/${id}/update`, formData)
            .then(() => {
                setMessage({ text: 'Изменения сохранены!', type: 'success' });
                setOriginalData(formData);
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            })
            .catch(() => {
                setMessage({ text: 'Ошибка при сохранении.', type: 'error' });
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            });
    };

    return (
        <div className="add-result-page">
            <div className="header">
                <h1>Редактировать результат</h1>
            </div>

            <div className="profile-header">
                <div className="profile-actions">
                    <button className="delete-btn" onClick={() => setShowModal(true)}>
                        Удалить
                    </button>
                </div>
            </div>

            <form className="result-form" onSubmit={handleSubmit}>
                <label>
                    Соревнование:
                    <select
                        name="tournament_id"
                        value={formData.event_id || originalData.event_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите...</option>
                        {tournaments?.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Спортсмен:
                    <select
                        name="sportsman_id"
                        value={formData.student_id || originalData.student_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите...</option>
                        {sportsmen?.map(s => (
                            <option key={s.student_data.id} value={s.student_data.id}>{s.student_data.last_name} {s.student_data.first_name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Место:
                    <select
                        name="place_id"
                        value={formData.place_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите...</option>
                        {places?.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Кол-во заработанных баллов:
                    <input type="number" name="points_scored" value={formData.points_scored} onChange={handleChange}
                           required/>
                </label>
                <label>
                    Кол-во пропущенных баллов:
                    <input type="number" name="points_missed" value={formData.points_missed} onChange={handleChange}
                           required/>
                </label>
                <label>
                    Кол-во боев:
                    <input type="number" name="number_of_fights" value={formData.number_of_fights}
                           onChange={handleChange} required/>
                </label>

                {isChanged && (
                    <button type="submit" className="submit-button">Сохранить изменения</button>
                )}

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </form>
            <DeleteResultModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
