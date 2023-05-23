import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { Http } from 'constants/http';
import { Path } from 'constants/paths';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === Http.UNAUTHORIZED) {
    const refreshResult = await baseQuery({ url: `${Path.AUTH}/${Path.REFRESH}`, method: 'POST' }, api, extraOptions);

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery({ url: `${Path.AUTH}/${Path.SIGN_OUT}`, method: 'POST' }, api, extraOptions);
      return result;
    }
  }

  return result;
};
