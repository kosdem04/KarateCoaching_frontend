import {baseApi} from "./api.ts";
import {Groups, Student} from "./types-api.ts";
import {groupAdd, groups} from "../app/urls.ts";

export const groupsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGroups: build.query<Groups[], void>({
            query: () => groups,
            transformResponse: (response: Groups[]) => response,
            providesTags: ["groups"],
        }),
        getStudentsInGroup: build.query<Student[], number>({
            query: (id: number) => `${groups}${id}/students`,
            transformResponse: (response: Student[]) => response,
            providesTags: ["student-in-groups"],
        }),
        deleteGroup: build.mutation({
            query: (id: number) => ({
                url: `${groups}/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["groups"],
        }),
        createGroup: build.mutation({
            query: (name: string) => ({
                url: groupAdd,
                method: "POST",
                body: {name},
            }),
            invalidatesTags: ["groups"],
        }),
        addStudentGroup: build.mutation({
            query: ({group_id, student_id}: { group_id: number, student_id: number }) => ({
                url: `${groups}/${group_id}/add_student/${student_id}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["student-in-groups", 'students'],
        }),
        deleteStudentGroup: build.mutation({
            query: ({group_id, student_id}: { group_id: number, student_id: number }) => ({
                url: `${groups}/${group_id}/add_student/${student_id}`,
                method: "DELETE",
                body: {},
            }),
            invalidatesTags: ["student-in-groups", 'students'],
        }),
    }),
});

export const {useGetGroupsQuery, useDeleteGroupMutation, useCreateGroupMutation, useGetStudentsInGroupQuery, useAddStudentGroupMutation,
    useDeleteStudentGroupMutation} = groupsApi
