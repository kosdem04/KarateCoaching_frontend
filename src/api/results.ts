import {baseApi} from "@/api/api.ts";
import {ResultAdd, Results, ResultsPlaces} from "@/api/types-api.ts";
import {resultAdd, results, resultsPlaces} from "@/app/urls.ts";

export const resultsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getResults: build.query<Results[], void>({
            query: () => results,
            transformResponse: (response: Results[]) => response,
            providesTags: ["results"],
        }),
        getResultsPlaces: build.query<ResultsPlaces[], void>({
            query: () => resultsPlaces,
            transformResponse: (response: ResultsPlaces[]) => response,
            // providesTags: ["results"],
        }),
        addResult: build.mutation({
            query: (result: ResultAdd) => ({
                url: resultAdd,
                method: "POST",
                body: result,
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["results"],
        }),
        // createGroup: build.mutation({
        //     query: (name: string) => ({
        //         url: groupAdd,
        //         method: "POST",
        //         body: {name},
        //     }),
        //     invalidatesTags: ["groups"],
        // }),
    }),
});

export const {useGetResultsQuery, useGetResultsPlacesQuery, useAddResultMutation} = resultsApi;
