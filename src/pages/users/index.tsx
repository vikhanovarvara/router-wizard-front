import { useState } from 'react';

import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListQuery,
  useUpdateUserMutation,
} from 'store/api/userApi';

import { MainLayout } from 'layouts/main/Main';

import { UserBasicFormDto } from 'components/user/form/basic/BasicForm';
import { UserBasicModal } from 'components/user/modal/Modal';
import { UserTable } from 'components/user/table/Table';

import { dispatchNotification } from 'shared/packages/EventBus';
import { Modal } from 'shared/ui/modal/Modal';
import { getErrorMessage } from 'shared/utils/errorUtil';

import { NotificationType } from 'types/common/notification';
import { UserCreateDto } from 'types/dto/user/create.dto';
import { User } from 'types/entities/User';

export default function UserList() {
  const { data: users = [] } = useGetUserListQuery({});

  const [fetchCreateUser, { isLoading: isCreateLoading }] = useCreateUserMutation();
  const [fetchDeleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const [fetchUpdateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  const [focusedUser, setFocusedUser] = useState<User | undefined>(undefined);

  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);

  const openCreateModal = () => setIsOpenedCreateModal(true);
  const closeCreateModal = () => setIsOpenedCreateModal(false);

  const openUpdateModal = (user: User) => {
    setFocusedUser(user);
    setIsOpenedUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setFocusedUser(undefined);
    setIsOpenedUpdateModal(false);
  };

  const openDeleteModal = (user: User) => {
    setFocusedUser(user);
    setIsOpenedDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setFocusedUser(undefined);
    setIsOpenedDeleteModal(false);
  };

  const createUser = async (data: UserBasicFormDto) => {
    try {
      await fetchCreateUser(data as UserCreateDto).unwrap();

      dispatchNotification('Пользователь создан');

      closeCreateModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const updateUser = async (data: UserBasicFormDto) => {
    if (!focusedUser) return;

    try {
      await fetchUpdateUser({ uuid: focusedUser.uuid, ...data }).unwrap();

      dispatchNotification('Пользователь обновлён');

      closeUpdateModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteUser = async () => {
    if (!focusedUser) return;

    try {
      await fetchDeleteUser(focusedUser.uuid).unwrap();

      dispatchNotification('Пользователь удалён');

      closeDeleteModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  return (
    <>
      <MainLayout>
        <UserTable users={users} onCreate={openCreateModal} onEdit={openUpdateModal} onDelete={openDeleteModal} />
      </MainLayout>

      <UserBasicModal
        isLoading={isCreateLoading}
        isOpen={isOpenedCreateModal}
        mode='create'
        onClose={closeCreateModal}
        onSubmit={createUser}
      />

      <UserBasicModal
        isLoading={isUpdateLoading}
        isOpen={isOpenedUpdateModal}
        mode='edit'
        user={focusedUser}
        onClose={closeUpdateModal}
        onSubmit={updateUser}
      />

      <Modal
        isLoading={isDeleteLoading}
        isOpen={isOpenedDeleteModal}
        title='Удаление пользователя'
        acceptText='Удалить'
        onClose={closeDeleteModal}
        onAccept={deleteUser}
      >
        Вы действительно хотите удалить пользователя <b>{focusedUser?.name}</b> ?
      </Modal>
    </>
  );
}
