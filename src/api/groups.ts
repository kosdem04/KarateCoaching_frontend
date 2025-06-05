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
            // providesTags: ["groups"],
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
    }),
});

export const {useGetGroupsQuery, useDeleteGroupMutation, useCreateGroupMutation, useGetStudentsInGroupQuery} = groupsApi
