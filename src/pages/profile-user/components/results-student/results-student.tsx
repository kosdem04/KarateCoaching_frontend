import {FC, Fragment, memo, useState} from "react";
import {Link} from "react-router-dom";
import {useGetResultsQuery} from "../../../../api/results.ts";

interface Props {
    pageStudent?: boolean;
}

export const ResultsStudent: FC<Props> = memo(({pageStudent}) => {
    const [expandedTournamentId, setExpandedTournamentId] = useState<null | number>(null);
    // const {data: results} = useGetResultsStudentQuery(studentId);
    const {data: results} = useGetResultsQuery();

    const toggleExpand = (id: number) => {
        setExpandedTournamentId(prev => (prev === id ? null : id));
    };

    return <div className="content">
        {!pageStudent && <div className="profile-header">
            <div className="profile-actions">
                <Link to={`/my_results/add`}>
                    <button className="add-btn">
                        Добавить
                    </button>
                </Link>
            </div>
        </div>}

        <p className="table-hint">Чтобы посмотреть результаты, нажмите на нужный турнир</p>
        <table>
            <thead>
            <tr>
                <th>Название турнира</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
            </tr>
            </thead>
            <tbody>
            {results?.map((tournament, index) => (
                <Fragment key={index}>
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
                                        {tournament.results.map((res) => (
                                            <tr key={res.id}
                                                // onClick={() => navigate(`/my_results/${res.id}/edit`)}
                                            >
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
    </div>;
});
