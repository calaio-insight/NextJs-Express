import { IHome } from '@/app/interfaces/home.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'home',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
      getHomesByUserId: builder.query<IHome[], number|undefined>({
        query: (userId) => `/home/getHomesByUserId/${userId}`
      }),
    })
  });
  
  export const { 
    useGetHomesByUserIdQuery, 
  } = homeApi;