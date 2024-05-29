import { useSelector } from 'react-redux'

import { selectAppIsLoading } from '@/services/app/app.selectors'
import { Box, LinearProgress } from '@mui/material'

export const Loader = () => {
  const isLoading = useSelector(selectAppIsLoading)

  return isLoading ? (
    <Box sx={{ position: 'absolute', width: '100%' }}>
      <LinearProgress color={'secondary'} />
    </Box>
  ) : null
}
