import {useState} from "react";
import s from "./students-in-group.module.css";
import {TableVisited} from "@/components/visited/table-visited/table-visited.js";
import StudentProfile from "@/components/CoachComponents/StudentProfile/student-profile.tsx";
import delete_icon from "@/assets/icons/icon_cross.svg";

interface Props {
    groupId: number;
    onClose: () => void;
}

const StudentsInGroup = ({groupId, onClose}: Props) => {
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    return (
        <>
            <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={onClose}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <h3>Ученики группы</h3>
                    <TableVisited groupId={groupId}/>
                </div>
            </div>

            {selectedStudentId && (
                <StudentProfile
                    studentId={selectedStudentId}
                    onClose={() => setSelectedStudentId(null)}
                />
            )}
        </>
    );
}
export default StudentsInGroup;
