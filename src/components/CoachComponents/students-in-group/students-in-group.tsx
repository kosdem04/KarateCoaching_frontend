import {useState} from "react";
import s from "./students-in-group.module.css";
import delete_icon from "../../../assets/icons/icon_cross.svg";
import {TableVisited} from "../../visited/table-visited/table-visited.tsx";
import {ProfileUser} from "../../../pages/profile-user/profile-user.tsx";
import {useGetStudentsQuery} from "../../../api/students.ts";
import {useAddStudentGroupMutation} from "../../../api/groups.ts";

interface Props {
    groupId: number;
    onClose: () => void;
}

const StudentsInGroup = ({groupId, onClose}: Props) => {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const {data: students} = useGetStudentsQuery();
    const [addStudent] = useAddStudentGroupMutation()
    const [studentId, setStudentId] = useState<number | null>(null);

    const clickAddStudent = () => {
        if(studentId){
            addStudent({group_id: groupId, student_id: studentId});
            setStudentId(null);
        }
    }

    return (
        <>
            <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={selectedStudentId ? undefined : onClose}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <div className={s.title_wrapper}>
                        <h3>Ученики группы</h3>
                        <div className={s.select_wrapper}>
                            <select className={s.select} onChange={(e) => setStudentId(+e.target.value)}>
                                <option value="" disabled selected>Выберите</option>
                                {students?.map((student) => (
                                    !student.group ? (
                                        <option key={student.student_data.id} value={student.student_data.id}>
                                            {student.student_data.last_name} {student.student_data.first_name}
                                        </option>
                                    ) : null
                                ))}
                            </select>
                            <button onClick={clickAddStudent}>Добавить</button>
                        </div>
                    </div>
                    <TableVisited groupId={groupId} openStudentInfo={(id) => setSelectedStudentId(id)}/>
                </div>
            </div>

            {selectedStudentId && (
                <div className={s.group_details_overlay}>
                    <button className={s.delete_button}
                            onClick={() => selectedStudentId ? setSelectedStudentId(null) : onClose}>
                        <img src={delete_icon} alt={'delete icon'}/>
                    </button>
                    <ProfileUser student_id={selectedStudentId}/>
                </div>
            )}
        </>
    );
}
export default StudentsInGroup;
