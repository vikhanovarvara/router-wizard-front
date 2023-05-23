import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryWithReauth } from 'shared/http/baseQuery';

const tagTypes = ['Auth', 'CurrentUser', 'User', 'Appeal'] as const;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes,
  endpoints: () => ({}),
});

type ProvidedItem = { id: number | string } | { uuid: string };

export function providesList<R extends ProvidedItem[], T extends (typeof tagTypes)[number]>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(item => ({
          type: tagType,
          id: 'id' in item ? item.id : item.uuid,
        })),
      ]
    : [{ type: tagType, id: 'LIST' }];
}
