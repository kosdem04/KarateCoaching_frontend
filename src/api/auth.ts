import {baseApi} from "@/api/api.ts";
import {UserProfile} from "@/api/types-api.ts";
import {authGetUserData, studentRegisterCoach, usersPasswordForgot, usersPasswordReset} from "@/app/urls.ts";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<UserProfile[], void>({
            query: () => authGetUserData,
            transformResponse: (response: UserProfile[]) => response,
            providesTags: ["auth-get-user"],
        }),
        forgotPassword: build.mutation({
            query: (data:{email: string}) => ({
                url: usersPasswordForgot,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
        }),
        resetPassword: build.mutation({
            query: (data:{new_password: string, repeat_new_password: string, code: string}) => ({
                url: usersPasswordReset,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
        }),
        studentRegisterCoach: build.mutation({
            query: ({couch_id, data}: any) => ({
                url: `${studentRegisterCoach}${couch_id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
        }),
    }),
});

export const {useGetUserDataQuery, useForgotPasswordMutation, useResetPasswordMutation, useStudentRegisterCoachMutation} = usersApi;
