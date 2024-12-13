import { IUserTrustedNeighbor } from '@/app/interfaces/userTrustedNeighbor.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userTrustedNeighborApi = createApi({
    reducerPath: 'userTrustedNeighbor',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
        getUserTrustedNeighborsByUserId: builder.query<IUserTrustedNeighbor[], number|undefined>({
            query: (userId) => `/userTrustedNeighbor/getUserTrustedNeighborsByUserId/${userId}`
        }),
        getPossibleTrustedNeighborByUserEmail: builder.query<IUserTrustedNeighbor|null, string|undefined>({
            query: (userEmail) => `/userTrustedNeighbor/getPossibleTrustedNeighborByUserEmail/${userEmail}`
        }),
    })
  });
  
  export const { 
    useGetUserTrustedNeighborsByUserIdQuery, 
    useGetPossibleTrustedNeighborByUserEmailQuery
  } = userTrustedNeighborApi;