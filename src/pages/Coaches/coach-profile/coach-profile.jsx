import {useAuth} from "@/auth-context.tsx";
import './coach-profile.css';
import {useState} from "react";
import CoachGroups from "../../../components/CoachComponents/coach-groups.js";
import {Profile} from "@/components/profile/profile.js";
import {ResultList} from "@/components/ResultList/result-list.tsx";
import {useGetEventsQuery} from "@/api/events.js";
import {EventsStudent} from "@/components/events/events.js";
import {useGetUserDataQuery} from "@/api/auth.js";
import {Schedules} from "@/pages/profile-user/components/schedules/schedules.js";
import {Students} from "@/components/students/students.js";

const menuItems = [
    {id: "groups", label: "Группы"},
    {id: "events", label: "Мероприятия"},
    {id: "results", label: "Результаты"},
    {id: "schedule", label: "Расписание"},
    {id: "students", label: "Ученики"},
    // { id: "payments", label: "Оплата" },
    // { id: "purchases", label: "Мои покупки" },
    // { id: "education", label: "Моё обучение" },
    // { id: "shop", label: "Магазин" },
    // { id: "documents", label: "Документы" },
];

export default function CoachProfile() {
    const {isAuthenticated} = useAuth();
    const [activeSection, setActiveSection] = useState("groups");
    const {data: events} = useGetEventsQuery();
    const {data: user, refetch} = useGetUserDataQuery()

    if(!user){
        return null;
    }

    const useData = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        sur_name: user.patronymic,
        phone_number: user.phone_number,
        date_of_birth: user.date_of_birth,
        email: user.email,
        logo: user.img_url,
    }

    const renderActiveSection = () => {
        switch (activeSection) {
            case "groups":
                return <CoachGroups coachId={user}/>;
            case "events":
                return events && <EventsStudent events={events} />
            case "results":
                return <ResultList/>
            case "schedule":
                return <Schedules/>
            case "students":
                return <Students/>
            default:
                return <div style={{padding: '2rem'}}>Раздел в разработке</div>;
        }
    };

    return (
        <div className="profile-container">
            {isAuthenticated && <Profile refetch={refetch} user={useData}/>}
            <div className="profile-menu">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="profile-section">
                {renderActiveSection()}
            </div>
        </div>
    );
}
