import {CreateEventEvents, Events, EventsTypes} from "@/api/types-api.ts";
import {events, eventsAdd, eventsTypes} from "@/app/urls.ts";
import {baseApi} from "@/api/api.ts";

export const eventsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<Events[], void>({
            query: () => events,
            transformResponse: (response: Events[]) => response,
            providesTags: ["events-types"],
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
    }),
});
export const {useGetEventsQuery, useGetEventsTypesQuery, useAddEventMutation} = eventsApi;
