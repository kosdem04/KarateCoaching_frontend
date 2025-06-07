import {baseApi} from "./api.ts";
import {CreateEventEvents, Events, EventsTypes, Student} from "./types-api.ts";
import {events, eventsAdd, eventsTypes} from "../app/urls.ts";


export const eventsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<Events[], void>({
            query: () => events,
            transformResponse: (response: Events[]) => response,
            providesTags: ["events-types"],
        }),
        getEventsStudents: build.query<Student[], number>({
            query: (student_id: number) => `${events}${student_id}/students`,
            transformResponse: (response: Student[]) => response,
            providesTags: ["events-students"],
        }),
        getEventsTypes: build.query<EventsTypes[], void>({
            query: () => eventsTypes,
            transformResponse: (response: EventsTypes[]) => response,
            providesTags: ["events"],
        }),
        addEvent: build.mutation({
            query: ({name, type_id, date_start, date_end}: CreateEventEvents) => ({
                url: eventsAdd,
                method: "POST",
                body: {
                    name,
                    type_id,
                    date_start,
                    date_end
                },
            }),
            invalidatesTags: ["events-types"],
        }),
        deleteEvent: build.mutation({
            query: (eventId: number) => ({
                url: `/${events}${eventId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["events-types"],
        }),
        addStudentEvent: build.mutation({
            query: ({event_id, student_id}: { event_id: number, student_id: number }) => ({
                url: `/${events}${event_id}/${student_id}`,
                method: "POST",
            }),
            invalidatesTags: ["events-students"],
        }),
    }),
});
export const {
    useDeleteEventMutation,
    useGetEventsQuery,
    useGetEventsTypesQuery,
    useAddEventMutation,
    useLazyGetEventsStudentsQuery,
    useAddStudentEventMutation
} = eventsApi;
