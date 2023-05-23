import React, { ReactNode } from 'react';

import { IconButton } from '../icon-button/IconButton';
import { Modal as MUIModal } from '@mui/material';

import { Box } from '../box/Box';
import { Button } from '../button/Button';
import { Typography } from '../typography/Typography';

import modalSx from './Modal.styles';

import CrossIcon from '@mui/icons-material/Clear';

export type ModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  title: string | JSX.Element;
  description?: string;
  children?: ReactNode;
  acceptText?: string | JSX.Element;
  refuseText?: string;
  formId?: string;
  acceptIsDisabled?: boolean;
  closeIsDisabled?: boolean;
  onAccept?: () => void;
  onClose?: () => void;
};

export function Modal({
  isLoading,
  isOpen,
  title,
  description,
  children,
  acceptText = 'Принять',
  refuseText = 'Отменить',
  formId,
  acceptIsDisabled,
  closeIsDisabled,
  onAccept,
  onClose,
}: ModalProps) {
  const titleIsString = typeof title === 'string';

  const showControlBlock = !!onAccept || !!formId;

  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <div>
        <Box sx={modalSx.modal}>
          <Box sx={modalSx.head}>
            {titleIsString ? (
              <Typography sx={modalSx.title} variant='h6'>
                {title}
              </Typography>
            ) : (
              title
            )}

            {!!onClose && (
              <IconButton onClick={onClose} disabled={closeIsDisabled} sx={modalSx.closeBtn}>
                <CrossIcon color='primary' />
              </IconButton>
            )}
          </Box>

          <Box sx={modalSx.body}>
            {!!description && <Typography variant='body1'>{description}</Typography>}

            {children}
          </Box>

          {showControlBlock && (
            <Box sx={modalSx.controlBtnGroup}>
              <Button sx={modalSx.controlBtn} variant='outlined' onClick={onClose}>
                {refuseText}
              </Button>

              <Button
                isLoading={isLoading}
                sx={modalSx.controlBtn}
                onClick={onAccept}
                type={formId ? 'submit' : 'button'}
                form={formId}
                disabled={acceptIsDisabled}
              >
                {acceptText}
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </MUIModal>
  );
}
