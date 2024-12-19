/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUploadHomeIconRequest } from '@/app/interfaces/request.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fileApi = createApi({
    reducerPath: 'file',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({      
      uploadHomeIcon: builder.mutation<void, IUploadHomeIconRequest>({
        query: (uploadRequest) => ({
            url:`/file/uploadHomeIcon/${uploadRequest?.homeId}/${uploadRequest?.userId}`,
            method: 'POST',
            body: uploadRequest?.file,
            formData: true
        })
      })
    })
  });
  
  export const { 
    useUploadHomeIconMutation
  } = fileApi;