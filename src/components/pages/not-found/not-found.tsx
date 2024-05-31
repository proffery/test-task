import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/consts/routes'
import { Page } from '@/components/ui/page/page'
import { Typography } from '@mui/material'

export const NotFound = () => {
  return (
    <Page>
      <Typography fontSize={'36px'} textAlign={'center'} variant={'h1'}>
        404! Page not found!
      </Typography>
      <div style={{ alignSelf: 'center' }}>
        <Link to={ROUTES.base}>Go home</Link>
      </div>
    </Page>
  )
}
