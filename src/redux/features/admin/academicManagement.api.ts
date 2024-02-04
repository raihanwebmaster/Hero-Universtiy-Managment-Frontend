/** @format */

import { TAcademicSemester, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if(args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string)
          })
          // params.append(args[0].name, args[0].value)
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (semester) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: semester,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
