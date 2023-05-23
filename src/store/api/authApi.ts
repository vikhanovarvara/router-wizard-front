import { api } from 'store/api';

import { CheckCodeDto } from 'types/dto/auth/check-code.dto';
import { SendCodeDto } from 'types/dto/auth/send-code.dto';
import { SignInDto } from 'types/dto/auth/sign-in.dto';
import { Tokens } from 'types/dto/auth/tokens.dto';

import { Path } from 'constants/paths';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<Tokens, SignInDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.SIGN_IN}`,
        method: 'POST',
        body,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.SIGN_OUT}`,
        method: 'POST',
      }),
      onQueryStarted(_arg, queryApi) {
        queryApi.queryFulfilled.then(() => {
          queryApi.dispatch(authApi.util.resetApiState());
        });
      },
    }),
    sendCode: builder.mutation<void, SendCodeDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.SEND_CODE}`,
        method: 'POST',
        body,
      }),
    }),
    checkCode: builder.mutation<void, CheckCodeDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.CHECK_CODE}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation } = authApi;
