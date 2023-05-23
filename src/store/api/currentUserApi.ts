import { api } from 'store/api';

import { CurrentUserUpdateDto } from 'types/dto/current-user/update.dto';
import { User } from 'types/entities/User';

import { Path } from 'constants/paths';

const tagType = 'User';

export const currentUserApi = api.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.CURRENT_USER}`,
        method: 'GET',
      }),
      providesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
    updateCurrentUser: builder.mutation<User, CurrentUserUpdateDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.CURRENT_USER}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
    deleteCurrentUser: builder.mutation<User, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.CURRENT_USER}`,
        method: 'DELETE',
      }),
      invalidatesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useDeleteCurrentUserMutation } = currentUserApi;
