import { IHomeItem } from '@/app/interfaces/homeItem.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeItemApi = createApi({
    reducerPath: 'homeItem',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
      getHomeItemsByHomeId: builder.query<IHomeItem[], number|undefined>({
        query: (homeId) => `/homeItem/getHomeItemsByHomeId/${homeId}`
      }),
      getHomeItemById: builder.query<IHomeItem, number|undefined>({
        query: (homeItemId) => `/home/getHomeItemById/${homeItemId}`
      }),
    })
  });
  
  export const { 
    useGetHomeItemsByHomeIdQuery,
    useGetHomeItemByIdQuery,     
  } = homeItemApi;