import { Box } from '@mui/material';
import { languageIconMap } from './helpers';

export const LanguageChip = ({lang}) => {
return (
      <Box sx={{gap: "6px", display: "flex", direction: "ltr"}}>
        {languageIconMap?.[lang.toLowerCase()]}
        {lang}
      </Box>
  )
}