import s from './profile.module.css';
import {FC, memo, useState} from "react";
import avatar from '../../assets/agaev.jpg';
import {useForm} from "react-hook-form";
import {usersUpdate} from "../../app/urls.ts";
import api from "../../api/axios.ts";
import {Modal} from "../modal/modal.tsx";

interface Form {
    name: "first_name" | "last_name" | "sur_name" | 'date_of_birth' | 'phone_number' | 'password_repeat' | 'password';
    label: string;
    type_input: string;
}

const form: Form[] = [
    {name: 'first_name', label: 'Фамилия', type_input: 'text'},
    {name: 'last_name', label: 'Имя', type_input: 'text'},
    {name: 'sur_name', label: 'Отчество', type_input: 'text'},
    {name: 'password', label: 'Введите пароль:', type_input: 'password'},
    {name: 'password_repeat', label: 'Повторите пароль:', type_input: 'password'},
    {name: 'phone_number', label: 'Номер телефона', type_input: 'number'},
    {name: 'date_of_birth', label: 'Дата рождения', type_input: 'date'},
]

export interface UserInfo {
    id: number;
    first_name: string;
    last_name: string;
    sur_name: string;
    phone_number: string | null;
    date_of_birth: string | null;
    email: string;
    logo: string;
}

interface Props {
    user: UserInfo;
    refetch: () => void;
}

export const Profile: FC<Props> = memo(({user, refetch}) => {
    const [showModal, setShowModal] = useState(false);
    // const [updateProfile] = useUpdateUserMutation();

    const {register, handleSubmit, setValue} = useForm();
    const onClickModal = () => {
        setShowModal(prev => !prev);
        setValue('first_name', user.first_name)
        setValue('last_name', user.last_name)
        setValue('password', '')
        setValue('password_repeat', '')
        setValue('phone_number', user.phone_number)
        setValue('sur_name', user.sur_name)
        setValue('date_of_birth', user.date_of_birth)
    }
    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            api.patch(`${usersUpdate}/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                // setShowModal(prev => !prev);
                refetch()
            })
            // updateProfile({id: user.id, formData}).unwrap().then(() => refetch())
        }
    };

    const onSubmit = (data: any) => {
        const formData = new FormData();
        const params: any = {
            date_of_birth: data.date_of_birth,
            phone_number: data.phone_number,
            last_name: data.last_name,
            password: data.password || null,
            password_repeat: data.password_repeat || null,
            patronymic: data.sur_name,
            first_name: data.first_name,
        };

        for (const key in params) {
            // @ts-ignore
            if (params[key] !== undefined && params[key] !== '') {
                // @ts-ignore
                formData.append(key, params[key] as string);
            }
        }
        api.patch(`${usersUpdate}/${user.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
                setShowModal(prev => !prev);
                refetch()
            })
        // Вызов mutation с FormData
        // updateProfile({id: user.id, formData}).unwrap().then(() => refetch());
        // setShowModal(prev => !prev);
    };

    return (
        <>
            <section className={s.container}>
                <div className={s.avatar_wrapper}>
                    <img src={user.logo || avatar} alt="Avatar" className={s.avatar}/>
                    <label className={s.input_file}>
                        <input type="file" name="file" onChange={onChangeAvatar}/>
                        <span className={s.input_file_btn}>Изменить</span>
                    </label>
                </div>
                <div className={s.infoWrapper}>
                    <div className={s.name_wrapper}>
                        <h4 className={s.name}>{user.last_name} {user.first_name} {user.sur_name}</h4>
                        <button onClick={onClickModal}>Редактировать</button>
                    </div>
                    {user.date_of_birth && <p>
                        <strong>Дата рождения:</strong> {user.date_of_birth}
                    </p>}
                    {/*<p>*/}
                    {/*    <strong>Возраст:</strong> {profileInfo.age}*/}
                    {/*</p>*/}
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    {user.phone_number && <p>
                        <strong>Номер телефона:</strong> {user.phone_number}
                    </p>}
                </div>
            </section>
            {showModal && <Modal onClickClose={onClickModal}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    {form.map((item, index) => {
                        return <div className={s.input_wrapper} key={index}>
                            <label>{item.label}</label>
                            <input
                                className={s.input}
                                type={item.type_input}
                                {...register(item.name, {required: true})}/>
                        </div>
                    })}
                    <button type={'submit'}>Сохранить</button>
                </form>
            </Modal>}
        </>
    );
});
