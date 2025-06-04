import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "trainer",
    tagTypes: ["events", "events-types", 'groups', 'results', 'students', 'users', 'student', 'student-profile', 'events-students', 'auth-get-user', 'results-students'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost/api/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: () => ({}),
});
