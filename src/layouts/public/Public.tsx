import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/authSelector';

import { useAppNavigation } from 'components/navigation';
import Loader from 'shared/ui/loader/Loader';

import { useAppSelector } from 'hooks/store';

type Props = {
  children: JSX.Element;
};

export function PublicLayout({ children }: Props): JSX.Element {
  const { data: currentUser,isLoading, isError } = useGetCurrentUserQuery();
  const { goToAppeals } = useAppNavigation();

  const isAuth = useAppSelector(selectIsAuth);

  if (isLoading) return <Loader width='58px' />; 

  if (currentUser && isAuth && !isError) {
    goToAppeals();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return children;
}

