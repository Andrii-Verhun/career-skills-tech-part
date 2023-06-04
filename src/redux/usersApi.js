import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://6479830da455e257fa63439f.mockapi.io' }),
    tagTypes: ['Get'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (limit) => `/users?page=1&limit=${limit}`,
            providesTags: ['Get'],
        }),
        followUser: builder.mutation({
            query: ( {id, patch} ) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Get'],
        }),
    }),
});

export const { useGetUsersQuery, useFollowUserMutation } = usersApi