import {useState} from "react";
import s from "./students-in-group.module.css";
import {TableVisited} from "@/components/visited/table-visited/table-visited.js";
import delete_icon from "@/assets/icons/icon_cross.svg";
import {ProfileUser} from "@/pages/profile-user/profile-user.tsx";

interface Props {
    groupId: number;
    onClose: () => void;
}

const StudentsInGroup = ({groupId, onClose}: Props) => {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

    return (
        <>
            <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={selectedStudentId ? undefined : onClose}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <h3>Ученики группы</h3>
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
