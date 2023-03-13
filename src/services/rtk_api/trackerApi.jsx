import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APIContext } from "../..";


export const trackerApi = createApi({
    reducerPath: "api",
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:1323/cf`,
    }),
    endpoints: (builder) => ({
        getUserRating: builder.query({
            query: ({userHandle}) => `/getUserRating?user-handle=${userHandle}`
        }),
        getUserSubmissions : builder.query({
            query: (cfParams)=> `/getUserSubmissions?user_handle=${cfParams.username}&contest_id=${cfParams.contestID}&pname=${cfParams.pname}`
        })
    })
})


export const {useGetUserRatingQuery, useGetUserSubmissionsQuery} = trackerApi;