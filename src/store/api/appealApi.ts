import { api } from 'store/api';

import { AppealCreateDto } from 'types/dto/appeal/create.dto';
import { AppealGetManyDto } from 'types/dto/appeal/get-many.dto';
import { AppealGetOneDto } from 'types/dto/appeal/get-one.dto';
import { AppealUpdateDto } from 'types/dto/appeal/update.dto';
import { Appeal } from 'types/entities/Appeal';

import { Path } from 'constants/paths';

const tagType = 'Appeal';

export const appealApi = api.injectEndpoints({
  endpoints: builder => ({
    getAppealList: builder.query<Appeal[], AppealGetManyDto>({
      query: () => ({
        url: `${Path.APPEALS}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ uuid }) => ({ type: tagType, id: uuid } as const)), { type: tagType, id: 'LIST' }]
          : [{ type: tagType, id: 'LIST' }],
    }),
    getAppeal: builder.query<Appeal, AppealGetOneDto>({
      query: ({ uuid }) => ({
        url: `${Path.APPEALS}/${uuid}`,
        method: 'GET',
      }),
      providesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
    createAppeal: builder.mutation<Appeal, AppealCreateDto>({
      query: body => ({
        url: `${Path.APPEALS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: tagType, id: 'LIST' }],
    }),
    updateAppeal: builder.mutation<Appeal, AppealUpdateDto>({
      query: ({ uuid, ...body }) => ({
        url: `${Path.APPEALS}/${uuid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: tagType, id: arg.uuid }],
    }),
    deleteAppeal: builder.mutation<Appeal, string>({
      query: uuid => ({
        url: `${Path.APPEALS}/${uuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
  }),
});

export const {
  useGetAppealListQuery,
  useGetAppealQuery,
  useCreateAppealMutation,
  useUpdateAppealMutation,
  useDeleteAppealMutation,
} = appealApi;
