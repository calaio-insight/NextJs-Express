import { IHome } from '@/app/interfaces/home.interface';
import { IHomeRequest } from '@/app/interfaces/request.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'home',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
      getHomesByUserId: builder.query<IHome[], number|undefined>({
        query: (userId) => `/home/getHomesByUserId/${userId}`
      }),
      getHomeById: builder.query<IHome, IHomeRequest|undefined>({
        query: (homeRequest) => `/home/getHomeById/${homeRequest?.homeId}/${homeRequest?.userId}`
      }),
    })
  });
  
  export const { 
    useGetHomesByUserIdQuery, 
    useGetHomeByIdQuery
  } = homeApi;