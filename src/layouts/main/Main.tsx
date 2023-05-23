import { ReactNode, useState } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from 'store/api/currentUserApi';

import { PrivateLayout } from 'layouts/private/Private';

import { Header } from 'components/header/Header';
import { useAppNavigation } from 'components/navigation';
import { UserBasicFormDto } from 'components/user/form/basic/BasicForm';
import { UserBasicModal } from 'components/user/modal/Modal';

import { dispatchNotification } from 'shared/packages/EventBus';
import { Box } from 'shared/ui/box/Box';
import { getErrorMessage } from 'shared/utils/errorUtil';

import { NotificationType } from 'types/common/notification';

import sx from './Main.styles';

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: currentUser } = useGetCurrentUserQuery();

  const isAdmin = currentUser?.role === 'ADMIN';

  const [fetchUpdateUser, { isLoading: isUpdateLoading }] = useUpdateCurrentUserMutation();
  const [fetchSignOut] = useSignOutMutation();

  const { goToAuth, goToUsers, goToAppeals } = useAppNavigation();

  const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false);

  const openUpdateModal = () => setIsOpenedUpdateModal(true);
  const closeUpdateModal = () => setIsOpenedUpdateModal(false);

  const updateUser = async (data: UserBasicFormDto) => {
    if (!currentUser) return;

    try {
      await fetchUpdateUser(data).unwrap();

      dispatchNotification('Пользователь обновлён');

      closeUpdateModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const signOut = async () => {
    try {
      await fetchSignOut().unwrap();

      goToAuth();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  return (
    <>
      <PrivateLayout>
        <Box sx={sx.layout}>
          <Header
            withUsers={isAdmin}
            onClickUsers={goToUsers}
            onClickAppeals={goToAppeals}
            onClickSettings={openUpdateModal}
            onClickSignOut={signOut}
          />

          <Box sx={sx.content}>{children}</Box>
        </Box>
      </PrivateLayout>

      <UserBasicModal
        isLoading={isUpdateLoading}
        isOpen={isOpenedUpdateModal}
        mode='edit'
        user={currentUser}
        onClose={closeUpdateModal}
        onSubmit={updateUser}
      />
    </>
  );
}
