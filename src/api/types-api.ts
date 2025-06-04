export interface Events {
    coach_id: number;
    date_end: string;
    date_start: string;
    id: number;
    name: string;
    type: { id: number, name: string };
}

export interface EventsTypes {
    id: number;
    name: string;
}

export interface CreateEventEvents {
    name: string;
    type_id: number;
    date_start: Date;
    date_end: Date;
}

export interface Groups {
    id: number;
    name: string;
    coach_id: number;
}

export interface Student {
    date_of_birth: string | null;
    email: string;
    first_name: string;
    id: number;
    img_url: string;
    last_name: string;
    patronymic: string;
    phone_number: string | null;
}

export interface StudentProfile {
    student_data: {
        id: 0,
        first_name: string;
        patronymic: string;
        last_name: string;
        email: string;
        date_of_birth: string | null;
        phone_number: string | null;
        img_url: string;
    },
    coach_id: number;
    group_id: number;
}

export interface Results {
    id: number
    name: string;
    date_start: string;
    date_end: string;
    coach_id: number;
    results: {
        id: number;
        event_id: number;
        student: StudentProfile,
        place: {
            id: number;
            name: string;
        };
        points_scored: number;
        points_missed: number;
        number_of_fights: number;
        average_score: number;
        efficiency: number;
    }[]
}

export interface ResultsStudent {
    event: {
        id: number;
        name: string;
        type: {
            id: number;
            name: string;
        },
        date_start: string;
        date_end: string;
        coach_id: number;
    },
    student_id: number;
    place: {
        id: number;
        name: string;
    },
    points_scored: number;
    points_missed: number;
    number_of_fights: number;
    average_score: number;
    efficiency: number;
}

export interface ResultsPlaces {
    id: number;
    name: string;
}

export interface ResultAdd {
    event_id: number;
    student_id: number;
    place_id: number;
    points_scored: number;
    points_missed: number;
    number_of_fights: number;
}

export interface UserProfileUpdate {
    first_name: string | null;
    last_name: string | null;
    patronymic: string | null;
    phone_number: string | null;
    password: string | null;
    password_repeat: string | null;
    date_of_birth: string | null;
    avatar: string | null;
}

export interface UserProfile {
    date_joined: string;
    date_of_birth: string | null;
    email: string;
    first_name: string;
    id: number;
    img_url: string;
    last_name: string;
    password: string;
    patronymic: string;
    phone_number: string | null;
}

export interface StudentAdd {
    first_name: string;
    patronymic: string;
    last_name: string;
    date_of_birth: string;
    avatar: string;
}
