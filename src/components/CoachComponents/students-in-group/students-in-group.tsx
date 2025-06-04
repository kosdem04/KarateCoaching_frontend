import {useState} from "react";
import s from "./students-in-group.module.css";
import {TableVisited} from "@/components/visited/table-visited/table-visited.js";
import StudentProfile from "@/components/CoachComponents/StudentProfile/student-profile.tsx";
import delete_icon from "@/assets/icons/icon_cross.svg";
import {Modal} from "@/components/modal/modal.tsx";
import avatar from "@/assets/agaev.jpg";
import {useForm} from "react-hook-form";
import {useStudentAddMutation} from "@/api/students.ts";
import {formatTypeDate} from "@/shared/utils/date.ts";

interface Props {
    groupId: number;
    onClose: () => void;
}

const inputs = [
    {label: 'Имя', name: 'first_name', type: 'text'},
    {label: 'Фамилия', name: 'last_name', type: 'text'},
    {label: 'Отчество', name: 'patronymic', type: 'text'},
    {label: 'Дата рождения:', name: 'date_of_birth', type: 'date'},
]

const StudentsInGroup = ({groupId, onClose}: Props) => {
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const {setValue, register, watch, handleSubmit} = useForm();
    const [addStudent] = useStudentAddMutation()

    const [clickAddStudent, setClickAddStudent] = useState(false);

    const onClickAddStudent = () => setClickAddStudent(prev => !prev);

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setValue('avatar', objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }
    };

    const onSubmit = (data: any) => {
        // const cleanedAvatar = data.avatar.replace(/^blob:/, '');
        addStudent({
            first_name: data.first_name,
            patronymic: data.patronymic,
            last_name: data.last_name,
            date_of_birth: formatTypeDate(data.date_of_birth),
            avatar: data.avatar,
        })
    }

    return (
        <>
            <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={onClose}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <div className={s.group_details_panel}>
                    <div>
                        <h3>Ученики группы</h3>
                        <button onClick={onClickAddStudent}>Добавить ученика</button>
                    </div>
                    <TableVisited groupId={groupId}/>
                </div>
            </div>

            {selectedStudentId && (
                <StudentProfile
                    studentId={selectedStudentId}
                    onClose={() => setSelectedStudentId(null)}
                />
            )}
            {clickAddStudent && <Modal onClickClose={onClickAddStudent}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.avatar_wrapper}>
                        <img src={watch('avatar') || avatar} alt="Avatar" className={s.avatar}/>
                        <label className={s.input_file}>
                            <input type="file" name="file" onChange={onChangeAvatar}/>
                            <span className={s.input_file_btn}>Добавить фото</span>
                        </label>
                    </div>
                    {inputs.map((item, index) => (
                        <div className={s.input_wrapper} key={index}>
                            <label>{item.label}</label>
                            <input
                                className={s.input}
                                type={item.type}
                                {...register(item.name, {required: true})}/>
                        </div>
                    ))}
                    <button type={'submit'}>Добавить</button>
                </form>
            </Modal>}
        </>
    );
}
export default StudentsInGroup;
