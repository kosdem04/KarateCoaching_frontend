import {baseApi} from "@/api/api.ts";
import {Student, UserProfileUpdate} from "@/api/types-api.ts";
import {users, usersUpdate} from "@/app/urls.ts";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudents: build.query<Student[], void>({
            query: () => users,
            transformResponse: (response: Student[]) => response,
            providesTags: ["users"],
        }),
        updateUser: build.mutation({
            query: ({id, params}: { id: number, params: UserProfileUpdate }) => ({
                url: `${usersUpdate}/${id}`,
                method: "PATCH",
                body: params,
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["groups"],
        }),
    }),
});

export const {useUpdateUserMutation} = usersApi;
