import {baseApi} from "./api.ts";
import {students} from "../app/urls.ts";
import {
    Events, Results,
    StudentAdd,
    StudentData,
    StudentProfile,
    UserProfileUpdate
} from "./types-api.ts";

export const studentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudents: build.query<StudentData[], void>({
            query: () => students,
            transformResponse: (response: StudentData[]) => response,
            providesTags: ["students"],
        }),
        getStudentProfile: build.query<StudentProfile, number>({
            query: (id: number) => `${students}${id}`,
            transformResponse: (response: StudentProfile) => response,
            providesTags: ["student-profile"],
        }),
        getEventsStudent: build.query<Events[], number>({
            query: (id: number) => `${students}${id}/events`,
            transformResponse: (response: Events[]) => response,
            providesTags: ["events-students"],
        }),
        getResultsStudent: build.query<Results[], number>({
            query: (id: number) => `${students}${id}/results`,
            transformResponse: (response: Results[]) => response,
            providesTags: ["results-students"],
        }),
        studentAdd: build.mutation({
            query: (params: StudentAdd) => ({
                url: `${students}add`,
                method: "POST",
                body: params,
            }),
            transformResponse: (response: any) => response,
            // invalidatesTags: ["student"],
        }),
        updateStudentProfile: build.mutation({
            query: ({id, params}: { id: number, params: UserProfileUpdate }) => ({
                url: `${students}${id}`,
                method: "PATCH",
                body: params,
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["student"],
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useGetStudentProfileQuery,
    useStudentAddMutation,
    useUpdateStudentProfileMutation,
    useGetEventsStudentQuery,
    useGetResultsStudentQuery
} = studentsApi;
