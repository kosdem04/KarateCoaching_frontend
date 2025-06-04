import {baseApi} from "@/api/api.ts";
import {UserProfile} from "@/api/types-api.ts";
import {authGetUserData} from "@/app/urls.ts";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<UserProfile[], void>({
            query: () => authGetUserData,
            transformResponse: (response: UserProfile[]) => response,
            providesTags: ["auth-get-user"],
        }),
        // updateUser: build.mutation({
        //     query: ({id, params}: { id: number, params: UserProfileUpdate }) => ({
        //         url: `${usersUpdate}/${id}`,
        //         method: "PATCH",
        //         body: params,
        //     }),
        //     transformResponse: (response: any) => response,
        //     invalidatesTags: ["groups"],
        // }),
    }),
});

export const {useGetUserDataQuery} = usersApi;
