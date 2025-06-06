import s from './students.module.css';
import {memo, useState} from "react";
import delete_icon from "../../assets/icons/icon_cross.svg";
import {useGetStudentsQuery} from "../../api/students.ts";
import {ProfileUser} from "../../pages/profile-user/profile-user.tsx";
// const inputs = [
//     {label: 'Имя', name: 'first_name', type: 'text'},
//     {label: 'Фамилия', name: 'last_name', type: 'text'},
//     {label: 'Отчество', name: 'patronymic', type: 'text'},
//     {label: 'Дата рождения:', name: 'date_of_birth', type: 'date'},
// ]

export const Students = memo(() => {
    const {data: students} = useGetStudentsQuery();
    const [showStudentProfile, setShowStudentProfile] = useState<number | null>(null);


    const onClickShowProfile = (data: number | null) => setShowStudentProfile(data)
    // const [clickAddStudent, setClickAddStudent] = useState(false);

    // const onClickAddStudent = () => setClickAddStudent(prev => !prev);

    // const {setValue, register, watch, handleSubmit} = useForm();

    // const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const objectUrl = URL.createObjectURL(file);
    //         setValue('avatar', objectUrl);
    //
    //         return () => {
    //             URL.revokeObjectURL(objectUrl);
    //         };
    //     }
    // };
    // const onSubmit = (data: any) => {
    //     const cleanedAvatar = data.avatar.replace(/^blob:/, '');
    // const formData = new FormData();
    // formData.append('first_name', data.first_name);
    // formData.append('last_name', data.last_name);
    // formData.append('patronymic', data.patronymic);
    // formData.append('date_of_birth', data.date_of_birth);
    // formData.append('avatar', data.avatar);
    //
    // api.patch(`${students}add`, formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })
    // }

    return (
        <>
            {/*<section className={s.section}>*/}
            {/*<button onClick={onClickAddStudent}>Добавить ученика</button>*/}
            <div className={s.card_container}>
                {students?.map((item) => {
                    return (
                        <div className={s.card_schedule} key={item.student_data.id}
                             onClick={() => onClickShowProfile(item.student_data.id)}>
                            <p><strong>Имя:</strong> {item.student_data.first_name}</p>
                            <p><strong>Фаилия:</strong> {item.student_data.last_name}</p>
                            <p><strong>Почта:</strong> {item.student_data.email}</p>
                            {item.group && <p><strong>Группа:</strong> {item.group.name}</p>}
                        </div>)
                })}
            </div>
            {showStudentProfile && <div className={s.group_details_overlay}>
                <button className={s.delete_button} onClick={() => onClickShowProfile(null)}>
                    <img src={delete_icon} alt={'delete icon'}/>
                </button>
                <ProfileUser student_id={showStudentProfile} page={'couch'}/>
            </div>}
            {/*</section>*/}
            {/*{clickAddStudent && <Modal onClickClose={onClickAddStudent}>*/}
            {/*    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>*/}
            {/*        <div className={s.avatar_wrapper}>*/}
            {/*            <img src={watch('avatar') || avatar} alt="Avatar" className={s.avatar}/>*/}
            {/*            <label className={s.input_file}>*/}
            {/*                <input type="file" name="file" onChange={onChangeAvatar} required/>*/}
            {/*                <span className={s.input_file_btn}>Добавить фото</span>*/}
            {/*            </label>*/}
            {/*        </div>*/}
            {/*        {inputs.map((item, index) => (*/}
            {/*            <div className={s.input_wrapper} key={index}>*/}
            {/*                <label>{item.label}</label>*/}
            {/*                <input*/}
            {/*                    className={s.input}*/}
            {/*                    type={item.type}*/}
            {/*                    {...register(item.name, {required: true})}/>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*        <button type={'submit'}>Добавить</button>*/}
            {/*    </form>*/}
            {/*</Modal>}*/}
        </>
    );
});
