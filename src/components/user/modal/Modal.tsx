import { useRef } from 'react';

import { Modal } from 'shared/ui/modal/Modal';

import { User } from 'types/entities/User';

import { UserBasicForm, UserBasicFormDto } from '../form/basic/BasicForm';

type UserBasicModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  mode: 'create' | 'edit';
  user?: User;
  onSubmit: (data: UserBasicFormDto) => void;
  onClose: () => void;
};

export function UserBasicModal({ isLoading, isOpen, mode, user, onSubmit, onClose }: UserBasicModalProps) {
  const title = mode === 'create' ? 'Создание пользователя' : 'Обновление пользователя';
  const acceptText = mode === 'create' ? 'Создать' : 'Обновить';

  const defaultValues: UserBasicFormDto | undefined = user
    ? {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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
      <UserBasicForm submitBtnRef={submitBtnRef} defaultValues={defaultValues} onSubmit={onSubmit} />
    </Modal>
  );
}
