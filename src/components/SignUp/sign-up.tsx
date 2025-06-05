import './SignUp.css';
import {useState} from "react";
import api from "../../api/axios.ts";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useStudentRegisterCoachMutation} from "../../api/auth.ts";

const inputsRegister = [
    {name: "first_name", label: 'Фамилия:', type: "text", required: true},
    {name: "last_name", label: 'Имя:', type: "text", required: true},
    {name: "patronymic", label: 'Отчество (необязательно):', type: "text", required: false},
    {name: "email", label: 'Email:', type: "email", required: true},
    {name: "password", label: 'Пароль:', type: "password", required: true},
    {name: "password_repeat", label: 'Повтор пароля:', type: "password", required: true},
]
const inputsRegisterStudent = [
    {name: "first_name", label: 'Фамилия:', type: "text", required: true},
    {name: "last_name", label: 'Имя:', type: "text", required: true},
    {name: "patronymic", label: 'Отчество (необязательно):', type: "text", required: false},
    {name: "email", label: 'Email:', type: "email", required: true},
    {name: "date_of_birth", label: 'Дата рождения:', type: "date", required: true},
]

export default function SignUp() {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [studentRegisterCoach] = useStudentRegisterCoachMutation();
    const couch_id = searchParams.get('couch_id')

    const handleSubmitRegisterCoach = (data: any) => {
        studentRegisterCoach({couch_id: couch_id, data: {...data}}).unwrap().then(()=> navigate("/login"));
    }

    const handleSubmitRegister = async (data: any) => {
        setError(null);

        if (data.password !== data.password_repeat) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            await api.post("auth/register", data);

            // После регистрации перенаправляем на страницу логина
            navigate("/login");
        } catch (err) {
            // @ts-ignore
            console.log(err.response.data);
            // @ts-ignore
            setError(err.response?.data?.detail || "Ошибка регистрации");
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="header">
                    <h1>Регистрация</h1>
                </div>
                {couch_id
                    ? <form className="login-form" onSubmit={handleSubmit(handleSubmitRegisterCoach)}>
                        {inputsRegisterStudent.map((item, index) => (
                            <div key={index} className={'input-wrapper'}>
                                <label>{item.label}</label>
                                <input type={item.type}{...register(item.name, {required: item.required})}/>
                            </div>
                        ))}
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="submit-button">Зарегистрироваться</button>
                    </form>
                    : <form className="login-form" onSubmit={handleSubmit(handleSubmitRegister)}>
                        {inputsRegister.map((item, index) => (
                            <div key={index} className={'input-wrapper'}>
                                <label>{item.label}</label>
                                <input type={item.type}{...register(item.name, {required: item.required})}/>
                            </div>
                        ))}
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="submit-button">Зарегистрироваться</button>
                        <br/><br/>
                        <label className="register-link">
                            <Link to="/login/">Уже есть аккаунт</Link>
                        </label>
                    </form>}
            </div>
        </>
    );
}
