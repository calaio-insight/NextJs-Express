/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHomeItem } from '@/app/interfaces/homeItem.interface';
import { IUpsertHomeItemRequest } from '@/app/interfaces/request.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeItemApi = createApi({
    reducerPath: 'homeItem',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['HomeItemById'],
    endpoints: (builder) => ({
      getHomeItemsByHomeId: builder.query<IHomeItem[], number|undefined>({
        query: (homeId) => `/homeItem/getHomeItemsByHomeId/${homeId}`,
        providesTags: (_) => ['HomeItemById']
      }),
      getHomeItemById: builder.query<IHomeItem, number|undefined>({
        query: (homeItemId) => `/homeItem/getHomeItemById/${homeItemId}`,
        providesTags: (_) => ['HomeItemById']
      }),
      upsertHomeItem: builder.mutation<number, IUpsertHomeItemRequest>({
        query: (upsertRequest) => ({
            url:`/homeItem/upsertHomeItem/${upsertRequest?.userId}`,
            method: 'POST',
            body: upsertRequest?.homeItem
        }),
        invalidatesTags: (_) => ['HomeItemById']
      }),
    })
  });
  
  export const { 
    useGetHomeItemsByHomeIdQuery,
    useGetHomeItemByIdQuery,  
    useUpsertHomeItemMutation   
  } = homeItemApi;