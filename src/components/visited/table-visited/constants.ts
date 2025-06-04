export interface DayWeek {
    day: string;
    dayWeek: string
}

export interface Participant {
    id: number;
    name: string;
    days_visited: Set<DayWeek>;
    days_missed: Set<DayWeek>;
    days_missed_without_reason: Set<DayWeek>;
    days: DayWeek[];
}

function getDatesArray(daysCount: number): DayWeek[] {
    const datesArray = [];
    const today = new Date();

    for (let i = 0; i < daysCount; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = getDayOfWeek(date);

        datesArray.push({day, dayWeek: dayOfWeek});
    }

    return datesArray;
}

function getDayOfWeek(date: Date): string {
    const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return daysOfWeek[date.getDay()];
}

export const dates = getDatesArray(7);

export const updateParticipantAttendance = (item: Participant, date: DayWeek): Participant => {
    let typeVisit;

    if (!item.days_visited.has(date) && !item.days_missed.has(date)) {
        typeVisit = 'visited'; // Первый клик
    } else if (item.days_visited.has(date)) {
        typeVisit = 'missed'; // Второй клик
    } else {
        typeVisit = 'missed_without_reason'; // Третий клик
    }

    const newDaysVisited = new Set(item.days_visited);
    const newDaysMissed = new Set(item.days_missed);
    const newDaysMissedWithoutReason = new Set(item.days_missed_without_reason);

    switch (typeVisit) {
        case 'visited':
            newDaysVisited.add(date);
            break;
        case 'missed':
            newDaysMissed.add(date);
            newDaysVisited.delete(date);
            break;
        case 'missed_without_reason':
            newDaysMissedWithoutReason.add(date);
            newDaysMissed.delete(date);
            break;
        default:
            return { ...item };
    }

    return {
        ...item,
        days_visited: newDaysVisited,
        days_missed: newDaysMissed,
        days_missed_without_reason: newDaysMissedWithoutReason,
    };
};
