import { useState } from 'react';

import {
  useCreateAppealMutation,
  useDeleteAppealMutation,
  useGetAppealListQuery,
  useUpdateAppealMutation,
} from 'store/api/appealApi';

import { MainLayout } from 'layouts/main/Main';

import { AppealBasicFormDto } from 'components/appeal/form/basic/BasicForm';
import { AppealBasicModal } from 'components/appeal/modal/Modal';
import { AppealTable } from 'components/appeal/table/Table';

import { dispatchNotification } from 'shared/packages/EventBus';
import { Modal } from 'shared/ui/modal/Modal';
import { getErrorMessage } from 'shared/utils/errorUtil';

import { NotificationType } from 'types/common/notification';
import { AppealCreateDto } from 'types/dto/appeal/create.dto';
import { Appeal } from 'types/entities/Appeal';

export default function AppealList() {
  const { data: appeals = [] } = useGetAppealListQuery({});

  const [fetchCreateAppeal, { isLoading: isCreateLoading }] = useCreateAppealMutation();
  const [fetchDeleteAppeal, { isLoading: isDeleteLoading }] = useDeleteAppealMutation();
  const [fetchUpdateAppeal, { isLoading: isUpdateLoading }] = useUpdateAppealMutation();

  const [focusedAppeal, setFocusedAppeal] = useState<Appeal | undefined>(undefined);

  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);

  const openCreateModal = () => setIsOpenedCreateModal(true);
  const closeCreateModal = () => setIsOpenedCreateModal(false);

  const openUpdateModal = (appeal: Appeal) => {
    setFocusedAppeal(appeal);
    setIsOpenedUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setFocusedAppeal(undefined);
    setIsOpenedUpdateModal(false);
  };

  const openDeleteModal = (appeal: Appeal) => {
    setFocusedAppeal(appeal);
    setIsOpenedDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setFocusedAppeal(undefined);
    setIsOpenedDeleteModal(false);
  };

  const createAppeal = async (data: AppealBasicFormDto) => {
    try {
      await fetchCreateAppeal(data as AppealCreateDto).unwrap();

      dispatchNotification('Заявка создана');

      closeCreateModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const updateAppeal = async (data: AppealBasicFormDto) => {
    if (!focusedAppeal) return;

    try {
      await fetchUpdateAppeal({ uuid: focusedAppeal.uuid, ...data }).unwrap();

      dispatchNotification('Заявка обновлена');

      closeUpdateModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteAppeal = async () => {
    if (!focusedAppeal) return;

    try {
      await fetchDeleteAppeal(focusedAppeal.uuid).unwrap();

      dispatchNotification('Заявка удалена');

      closeDeleteModal();
    } catch (e) {
      const message = getErrorMessage(e);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  return (
    <>
      <MainLayout>
        <AppealTable appeals={appeals} onCreate={openCreateModal} onEdit={openUpdateModal} onDelete={openDeleteModal} />
      </MainLayout>

      <AppealBasicModal
        isLoading={isCreateLoading}
        isOpen={isOpenedCreateModal}
        mode='create'
        onClose={closeCreateModal}
        onSubmit={createAppeal}
      />

      <AppealBasicModal
        isLoading={isUpdateLoading}
        isOpen={isOpenedUpdateModal}
        mode='edit'
        appeal={focusedAppeal}
        onClose={closeUpdateModal}
        onSubmit={updateAppeal}
      />

      <Modal
        isLoading={isDeleteLoading}
        isOpen={isOpenedDeleteModal}
        title='Удаление заявки'
        acceptText='Удалить'
        onClose={closeDeleteModal}
        onAccept={deleteAppeal}
      >
        Вы действительно хотите удалить заявку пользователя <b>{focusedAppeal?.name}</b> ?
      </Modal>
    </>
  );
}
