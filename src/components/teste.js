import { useMediaQuery, useTheme } from '@mui/material';

export default function SignUpPage() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // Define quando usar um layout diferente

  return (
    <>
      
    </>
  );
}