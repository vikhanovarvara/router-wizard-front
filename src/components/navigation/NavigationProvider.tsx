/* eslint-disable react-hooks/exhaustive-deps */
import { NextRouter, useRouter } from 'next/router';
import React, { ReactNode, useCallback, useMemo } from 'react';

import { Path } from 'constants/paths';

import { AppNavigationCtx, Navigation } from './NavigationContext';

type NavigationProviderProps = { children: ReactNode };

function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter() as NextRouter | null;

  const changeChapter = useCallback(
    (newPath: string, checkPaths = true) => {
      const needUpdate = !checkPaths || newPath !== router?.pathname;
      if (needUpdate) {
        router?.replace(newPath);
      }
    },
    [router?.pathname],
  );

  const goBack = useCallback(() => router?.back(), []);
  const goToMain = useCallback(() => router?.push(Path.MAIN), []);
  const goToAuth = useCallback(() => router?.push(`/${Path.AUTH}`), []);
  const goToUsers = useCallback(() => router?.push(`/${Path.USERS}`), []);
  const goToAppeals = useCallback(() => router?.push(`/${Path.APPEALS}`), []);

  const navigation = useMemo<Navigation>(
    () => ({
      changeChapter,
      goBack,
      goToMain,
      goToAuth,
      goToUsers,
      goToAppeals,
      pathname: router?.pathname || '',
      query: router?.query || {},
      isReady: !!router?.isReady,
    }),
    [router?.pathname, router?.query, router?.isReady],
  );

  return <AppNavigationCtx.Provider value={navigation}>{children}</AppNavigationCtx.Provider>;
}

export default NavigationProvider;
