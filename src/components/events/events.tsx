// import s from './events.module.css'
import {Table} from "../table/table";
import {memo} from "react";

const tableHead = ['Название турнира', 'Дата начала', 'Дата окончания'];
const tableBody = [
    {title: 'Тестовый турнир', start: '07.05.2025', finish: ' 17.05.2025'},
    {title: 'Кубок Амана', start: '05.05.2025 ', finish: ' 06.05.2025'},
    {title: 'Кубок Покрышкина', start: '01.05.2025', finish: ' 02.05.2025'},
    {title: 'Кубок Успеха', start: '28.04.2025', finish: ' 29.04.2025'},

];


export const Events = memo(() => {
    return (
        <Table
            renderThead={tableHead.map((item, index) => (
                <th key={index}>{item}</th>
            ))}
            renderTbody={tableBody.map((item, index) => {
                return <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.start}</td>
                    <td>{item.finish}</td>
                </tr>
            })}
        />
    );
});
