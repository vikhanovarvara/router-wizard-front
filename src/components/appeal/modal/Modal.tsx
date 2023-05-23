import { useRef } from 'react';

import { Modal } from 'shared/ui/modal/Modal';

import { Appeal } from 'types/entities/Appeal';

import { AppealBasicForm, AppealBasicFormDto } from '../form/basic/BasicForm';

type AppealBasicModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  mode: 'create' | 'edit';
  appeal?: Appeal;
  onSubmit: (data: AppealBasicFormDto) => void;
  onClose: () => void;
};

export function AppealBasicModal({ isLoading, isOpen, mode, appeal, onSubmit, onClose }: AppealBasicModalProps) {
  const title = mode === 'create' ? 'Создание заявки' : 'Обновление заявки';
  const acceptText = mode === 'create' ? 'Создать' : 'Обновить';

  const defaultValues: AppealBasicFormDto | undefined = appeal
    ? {
        name: appeal.name,
        email: appeal.email,
        phone: appeal.phone,
        router: appeal.router,
        status: appeal.status,
        address: appeal.address,
        description: appeal.description,
      }
    : undefined;

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitForm = () => submitBtnRef?.current?.click();

  return (
    <Modal
      isLoading={isLoading}
      isOpen={isOpen}
      title={title}
      acceptText={acceptText}
      onClose={onClose}
      onAccept={submitForm}
    >
      <AppealBasicForm submitBtnRef={submitBtnRef} defaultValues={defaultValues} onSubmit={onSubmit} />
    </Modal>
  );
}
