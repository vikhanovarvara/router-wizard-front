import { useGetCurrentUserQuery } from 'store/api/currentUserApi';

import { useAppNavigation } from 'components/navigation';

import Loader from 'shared/ui/loader/Loader';

type Props = {
  children: JSX.Element;
};

export function PrivateLayout({ children }: Props): JSX.Element {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const { goToAuth } = useAppNavigation();

  if (isLoading) return <Loader width='58px' />;

  if (isError) {
    goToAuth();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return children;
}
