import s from './students.module.css';
import {Fragment, memo, useState} from "react";
import {useGetStudentsQuery} from "@/api/students.ts";
import api from "@/api/axios.ts";
import {Modal} from "@/components/modal/modal.tsx";
import avatar from "@/assets/agaev.jpg";
import {useForm} from "react-hook-form";

const inputs = [
    {label: 'Имя', name: 'first_name', type: 'text'},
    {label: 'Фамилия', name: 'last_name', type: 'text'},
    {label: 'Отчество', name: 'patronymic', type: 'text'},
    {label: 'Дата рождения:', name: 'date_of_birth', type: 'date'},
]

export const Students = memo(() => {
    const {data: students} = useGetStudentsQuery()
    const [clickAddStudent, setClickAddStudent] = useState(false);

    const onClickAddStudent = () => setClickAddStudent(prev => !prev);

    const {setValue, register, watch, handleSubmit} = useForm();

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
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('patronymic', data.patronymic);
        formData.append('date_of_birth', data.date_of_birth);
        formData.append('avatar', data.avatar);

        api.patch(`${students}add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
        <>
            <section className={s.section}>
                <button onClick={onClickAddStudent}>Добавить ученика</button>
                <div className={s.card_container}>
                    {students?.map((item) => {
                        return (
                            <Fragment key={item.id}>
                                <div className={s.card_schedule}>
                                    <p><strong>Имя:</strong> {item.first_name}</p>
                                    <p><strong>Фаилия:</strong> {item.last_name}</p>
                                    <p><strong>Почта:</strong> {item.email}</p>
                                </div>
                            </Fragment>)
                    })}
                </div>
            </section>
            {clickAddStudent && <Modal onClickClose={onClickAddStudent}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.avatar_wrapper}>
                        <img src={watch('avatar') || avatar} alt="Avatar" className={s.avatar}/>
                        <label className={s.input_file}>
                            <input type="file" name="file" onChange={onChangeAvatar} required/>
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
});
