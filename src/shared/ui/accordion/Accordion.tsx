import {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  Accordion as MUIAccordion,
  AccordionDetails as MUIAccordionDetails,
  AccordionSummary as MUIAccordionSummary,
} from '@mui/material';

import { color } from 'themes';

import ExpandIcon from '@mui/icons-material/ExpandMore';

const accordionSx = {
  marginBottom: '10px',
  padding: '20px',
  border: '1px solid',
  borderRadius: '6px',
  borderColor: 'secondary.main',
  boxShadow: 'none',
  background: color.white,
  '&:before': {
    content: 'none',
  },
  '&.Mui-expanded': {
    margin: '0 0 10px 0',
    borderColor: 'accent.main',
  },
};

const summarySx = {
  margin: 0,
  padding: 0,
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
};

const detailsSx = {
  marginTop: '20px',
  padding: 0,
};

export function Accordion({ sx, ...props }: AccordionProps) {
  return <MUIAccordion {...props} sx={{ ...accordionSx, ...sx }} />;
}

export function AccordionSummary({ sx, ...props }: AccordionSummaryProps) {
  return (
    <MUIAccordionSummary {...props} expandIcon={<ExpandIcon htmlColor={color.muted} />} sx={{ ...summarySx, ...sx }} />
  );
}

export function AccordionDetails({ sx, ...props }: AccordionDetailsProps) {
  return <MUIAccordionDetails {...props} sx={{ ...detailsSx, ...sx }} />;
}
