import {FC, memo} from "react";
import {useGetEventsStudentQuery} from "@/api/students.ts";
import {EventsStudent} from "@/components/events/events.tsx";

interface Props {
    studentId: number;
}

export const EventsProfile:FC<Props> = memo(({studentId}) => {
const {data} = useGetEventsStudentQuery(studentId)

    return <EventsStudent events={data || []}/>;
});
