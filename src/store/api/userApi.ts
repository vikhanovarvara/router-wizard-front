import { api } from 'store/api';

import { UserCreateDto } from 'types/dto/user/create.dto';
import { UserGetManyDto } from 'types/dto/user/get-many.dto';
import { UserGetOneDto } from 'types/dto/user/get-one.dto';
import { UserUpdateDto } from 'types/dto/user/update.dto';
import { User } from 'types/entities/User';

import { Path } from 'constants/paths';

const tagType = 'User';

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserList: builder.query<User[], UserGetManyDto>({
      query: () => ({
        url: `${Path.USERS}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ uuid }) => ({ type: tagType, id: uuid } as const)), { type: tagType, id: 'LIST' }]
          : [{ type: tagType, id: 'LIST' }],
    }),
    getUser: builder.query<User, UserGetOneDto>({
      query: ({ uuid }) => ({
        url: `${Path.USERS}/${uuid}`,
        method: 'GET',
      }),
      providesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
    createUser: builder.mutation<User, UserCreateDto>({
      query: body => ({
        url: `${Path.USERS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: tagType, id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, UserUpdateDto>({
      query: ({ uuid, ...body }) => ({
        url: `${Path.USERS}/${uuid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: tagType, id: arg.uuid }],
    }),
    deleteUser: builder.mutation<User, string>({
      query: uuid => ({
        url: `${Path.USERS}/${uuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (r, _e, _arg) => [{ type: tagType, id: r?.uuid }],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
