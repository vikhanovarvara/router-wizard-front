import { CircularProgress, Divider } from '@mui/material';
import { Box } from 'shared/ui/box/Box';
import { IconButton } from 'shared/ui/icon-button/IconButton';

import { HFTextField, HFTextFieldProps } from '../HFTextField';

import sx from './HFSendField.styles';

import SendIcon from '@mui/icons-material/Send';

export type HFSendFieldProps = Omit<HFTextFieldProps, 'endAdornment'> & {
  isSending: boolean;
  sendingIsDisabled: boolean;
  onSend: () => void;
};

export function HFSendField({ isSending, sendingIsDisabled, onSend, ...props }: HFSendFieldProps) {
  return (
    <HFTextField
      endAdornment={
        <>
          <Divider sx={sx.divider} orientation='vertical' />

          <Box sx={sx.adornment}>
            {isSending ? (
              <CircularProgress size={30} />
            ) : (
              <IconButton disabled={sendingIsDisabled} onClick={onSend}>
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </>
      }
      {...props}
    />
  );
}
