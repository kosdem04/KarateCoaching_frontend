import {Fragment, useState} from 'react';
import './ResultList.css';
import {Link, useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useGetResultsQuery} from "../../api/results.ts";
import {CardMobile} from "../card-mobile/card-mobile.tsx";

export function ResultList() {
    const [expandedTournamentId, setExpandedTournamentId] = useState<null | number>(null);
    const isMobileScreen = useMediaQuery({query: '(max-width: 768px)'});
    const navigate = useNavigate();
    const {data: results} = useGetResultsQuery();

    const toggleExpand = (id: number) => {
        setExpandedTournamentId(prev => (prev === id ? null : id));
    };

    return (
        <div className="content">
            <div className="profile-header">
                <div className="profile-actions">
                    <Link to={`/my_results/add`}>
                        <button className="add-btn">
                            Добавить
                        </button>
                    </Link>
                </div>
            </div>

            <p className="table-hint">Чтобы посмотреть результаты, нажмите на нужный турнир</p>

            {!isMobileScreen ? (
                <table>
                    <thead>
                    <tr>
                        <th>Название турнира</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results?.map((tournament) => (
                        <Fragment key={tournament.id}>
                            <tr
                                onClick={() => toggleExpand(tournament.id)}
                                style={{cursor: 'pointer'}}
                            >
                                <td>{tournament.name}</td>
                                <td>{new Date(tournament.date_start).toLocaleDateString('ru-RU')}</td>
                                <td>{new Date(tournament.date_end).toLocaleDateString('ru-RU')}</td>
                            </tr>

                            {expandedTournamentId === tournament.id && (
                                <tr>
                                    <td colSpan={3}>
                                        {tournament.results?.length > 0 ? (
                                            <table className="inner-table">
                                                <thead>
                                                <tr>
                                                    <th>Спортсмен</th>
                                                    <th>Место</th>
                                                    <th>Заработано баллов</th>
                                                    <th>Пропущено баллов</th>
                                                    <th>Средний балл</th>
                                                    <th>КПД</th>
                                                    <th>Бои</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {tournament.results.map((res, idx) => (
                                                    <tr key={idx}
                                                        onClick={() => navigate(`/my_results/${res.id}/edit`)}>
                                                        <td>{res.student.student_data.last_name}
                                                            {res.student.student_data.first_name.charAt(0)}.
                                                            {res.student.student_data.patronymic ? res.student.student_data.patronymic.charAt(0) + '.' : ''}</td>
                                                        <td>{res.place.name}</td>
                                                        <td>{res.points_scored}</td>
                                                        <td>{res.points_missed}</td>
                                                        <td>{res.average_score}</td>
                                                        <td>{res.efficiency}</td>
                                                        <td>{res.number_of_fights}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Нет данных о результатах</p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="mobile-results">
                    {results?.map((tournament) => (
                        <CardMobile onClick={() => toggleExpand(tournament.id)}>
                            <p><strong>Название:</strong> {tournament.name}</p>
                            <p><strong>Начало:</strong> {new Date(tournament.date_start).toLocaleDateString('ru-RU')}
                            </p>
                            <p><strong>Окончание:</strong> {new Date(tournament.date_end).toLocaleDateString('ru-RU')}
                            </p>

                            {expandedTournamentId === tournament.id ? (
                                <div className="result-details">
                                    {tournament.results?.length > 0 ? (
                                        tournament.results.map((res, idx) => (
                                            <div key={idx} onClick={() => navigate(`/my_results/${res.id}/edit`)}>
                                                <div><strong>Спортсмен:</strong> {res.student.student_data.last_name}</div>
                                                <div><strong>Место:</strong> {res.place.name}</div>
                                                <div><strong>Заработано:</strong> {res.points_scored}</div>
                                                <div><strong>Пропущено:</strong> {res.points_missed}</div>
                                                <div><strong>Средний балл:</strong> {res.average_score}</div>
                                                <div><strong>КПД:</strong> {res.efficiency}</div>
                                                <div><strong>Бои:</strong> {res.number_of_fights}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Нет данных о результатах</p>
                                    )}
                                </div>
                            ) : null}
                        </CardMobile>
                    ))}
                </div>
            )}
        </div>
    );
}
