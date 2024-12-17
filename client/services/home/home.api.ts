/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHome } from '@/app/interfaces/home.interface';
import { IHomeRequest, IUpsertHomeRequest } from '@/app/interfaces/request.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'home',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['HomeById'],
    endpoints: (builder) => ({
      getHomesByUserId: builder.query<IHome[], number|undefined>({
        query: (userId) => `/home/getHomesByUserId/${userId}`
      }),
      getHomeById: builder.query<IHome, IHomeRequest|undefined>({
        query: (homeRequest) => `/home/getHomeById/${homeRequest?.homeId}/${homeRequest?.userId}`,
        providesTags: (_) => ['HomeById']
      }),
      upsertHome: builder.mutation<number, IUpsertHomeRequest>({
        query: (upsertRequest) => ({
            url:`/home/upsertHome/${upsertRequest?.userId}`,
            method: 'POST',
            body: upsertRequest?.home
        }),
        invalidatesTags: (_) => ['HomeById']
      }),
    })
  });
  
  export const { 
    useGetHomesByUserIdQuery, 
    useGetHomeByIdQuery,
    useUpsertHomeMutation
  } = homeApi;