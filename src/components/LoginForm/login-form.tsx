import './LoginForm.css';
import {useEffect, useState} from "react";
import api from "../../api/axios.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth-context.tsx";
import {useForm} from "react-hook-form";
import {useForgotPasswordMutation, useResetPasswordMutation} from "@/api/auth.ts";

const inputsLogin = [
    {name: "email", label: "Email:", type: "email"},
    {name: "password", label: "Пароль:", type: "password"},
]
const inputsNewPassword = [
    {name: "code", label: "Код из почты:", type: "text"},
    {name: "password", label: "Пароль:", type: "password"},
    {name: "repeat_new_password", label: "Повторите пароль:", type: "password"},
]

export default function LoginForm() {
    const {handleSubmit, register, reset} = useForm();
    const [error, setError] = useState<string | null>(null);
    const [userRoles, setUserRoles] = useState(null);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [writeNewPassword, setWriteNewPassword] = useState(false);
    const [changePassword] = useForgotPasswordMutation()
    const [resetPassword] = useResetPasswordMutation()

    const navigate = useNavigate();
    // @ts-ignore
    const {login} = useAuth();

    const onSubmit = async (data: any) => {
        setError(null);

        try {
            const response = await api.post("auth/login", {
                email: data.email,
                password: data.password,
            });

            const token = response.data.access_token;
            login(token);

            const rolesResponse = await api.get("/auth/get_user_roles");
            setUserRoles(rolesResponse.data.roles);
        } catch (error) {
            setError("Ошибка авторизации");
            console.error(error);
        }
    };

    const onSubmitEmail = (data: any) => {
        changePassword({email: data.email}).unwrap().then(() => setWriteNewPassword(true));
    };

    const onClickForgotPassword = () => setForgotPassword(prev => !prev);
    const onSubmitChangePassword = (data: any) => {
        if(data.password === data.repeat_new_password) {
            resetPassword(data).unwrap().then(() => {
                setError(null)
                reset();
                setWriteNewPassword(false);
                setForgotPassword(false);
            });
        }else {
            setError('Пароли не совпадают')
        }
    };

    useEffect(() => {
        console.log('@@@@', userRoles);
        if (!userRoles) return;

        // @ts-ignore
        const isAdmin = userRoles.some(role => role.role.code === "admin");
        // @ts-ignore
        const isCoach = userRoles.some(role => role.role.code === "coach_role");
        // @ts-ignore
        const isStudent = userRoles.some(role => role.role.code === "student");

        if (isAdmin) {
            console.log("Пользователь — администратор");
            // navigate("/admin_dashboard"); // если есть такая страница
        } else if (isCoach) {
            console.log("Пользователь — тренер");
            navigate("/coach_profile");
        } else if (isStudent) {
            console.log("Пользователь — ученик");
            navigate("/profile");
        } else {
            console.log("Нет подходящей роли");
            setError("Нет доступа: подходящая роль не найдена.");
        }
    }, [userRoles, navigate]);

    return (
        <div className="login-page">
            <div className="header">
                <h1>Авторизация</h1>
            </div>
            {forgotPassword
                ? (writeNewPassword
                    ? <>
                        <form className="login-form" onSubmit={handleSubmit(onSubmitChangePassword)}>
                            {inputsNewPassword.map((item, index) => (
                                <div key={index} className={'input-wrapper'}>
                                    <label>{item.label}</label>
                                    <input
                                        {...register(item.name, {required: true})}
                                        type={item.type}/>
                                </div>
                            ))}
                            <button type="submit" className="submit-button">Отправить</button>
                        </form>
                        {error && <div className="error-message">{error}</div>}
                    </>
                    : <form className="login-form" onSubmit={handleSubmit(onSubmitEmail)}>
                        <div className={'input-wrapper'}>
                            <label>Email:</label>
                            <input{...register('email', {required: true})} type={'email'}/>
                        </div>
                        <div className={'buttons-wrapper'}>
                            <button type="submit" className="submit-button">Отправить</button>
                            <button className={'forgot-password'} type={'button'} onClick={onClickForgotPassword}>Назад
                            </button>
                        </div>
                    </form>)
                : <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    {inputsLogin.map((item, i) => (
                        <div key={i} className={'input-wrapper'}>
                            <label>{item.label}</label>
                            <input
                                {...register(item.name, {required: true})}
                                type={item.type}/>
                        </div>
                    ))}
                    {error && <div className="error-message">{error}</div>}
                    <div className={'buttons-wrapper'}>
                        <button className={'forgot-password'} type={'button'} onClick={onClickForgotPassword}>Забыли
                            пароль?
                        </button>
                        <button type="submit" className="submit-button">Войти</button>
                    </div>
                    <br/><br/>
                    <label className="register-link">
                        <Link to="/sign_up">Зарегистрироваться</Link>
                    </label>
                </form>}
        </div>
    );
}
