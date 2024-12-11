import { IAuthRequest } from '@/app/interfaces/auth.interface';
import { IUser } from '@/app/interfaces/user.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
      login: builder.mutation<IUser, IAuthRequest>({
        query: body => ({
            url:`/user/login`,
            method: 'POST',
            body
        })
      }),
    })
  });
  
  export const { 
    useLoginMutation, 
  } = userApi;