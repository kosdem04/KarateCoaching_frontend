import avatar from "../../assets/agaev.jpg";
import s from './profile.module.css';
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import {memo, useState} from "react";
import {Modal} from "@/components/modal/modal.tsx";
import {useForm} from 'react-hook-form';

interface Form {
    name: "first_name" | "last_name" | "sur_name" | "email" | "phone_number";
    label: string;
}

const form: Form[] = [
    {name: 'first_name', label: 'Фамилия'},
    {name: 'last_name', label: 'Имя'},
    {name: 'sur_name', label: 'Отчество'},
    {name: 'email', label: 'Почта'},
    {name: 'phone_number', label: 'Телефон'},
]
const defaultValuesProfile = {
    first_name: 'Иван',
    last_name: 'Иванов',
    sur_name: 'Иванович',
    email: 'skalitsenia@mail.ru',
    phone_number: '+375335569556',
}

export const Profile = memo(() => {
    const [showModal, setShowModal] = useState(false);
    const [profileInfo, setProfileInfo] = useState(defaultValuesProfile)

    const {register, handleSubmit} = useForm({
        defaultValues: defaultValuesProfile
    });
    const onClickModal = () => setShowModal(prev => !prev)

    const onSubmit = (data: any) => {
        setProfileInfo(data);
        setShowModal(prev => !prev)
    }

    return (
        <>
            <section className={s.profile}>
                <section className={s.profile_container}>
                    <div className={s.avatar_wrapper}>
                        <img src={avatar} alt="avatar" className={s.avatar}/>
                        <button className={s.button_edit} onClick={onClickModal}>Изменить</button>
                    </div>
                    <div className={s.profile_info_container}>
                        <h2>{profileInfo.last_name} {profileInfo.first_name} {profileInfo.sur_name}</h2>
                        <div className={s.profile_contact_container}>
                            <div className={s.profile_contact_wrapper}>
                                <img src={email} alt="email" className={s.icon}/>
                                <span className={s.contact}>{profileInfo.email}</span>
                            </div>
                            <div className={s.profile_contact_wrapper}>
                                <img src={phone} alt="phone" className={s.icon}/>
                                <span className={s.contact}>{profileInfo.phone_number}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={s.buttons_wrapper}>
                    <button>Example1</button>
                    <button>Example2</button>
                    <button>Example3</button>
                </div>
            </section>
            {showModal && <Modal onClickClose={onClickModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {form.map((item, index) => {
                        return <div className={s.input_wrapper} key={index}>
                            <label>{item.label}</label>
                            <input
                                className={s.input}
                                type="text"
                                {...register(item.name, {required: true})}/>
                        </div>
                    })}
                    <button type={'submit'}>Сохранить</button>
                </form>
            </Modal>}
        </>
    );
});
