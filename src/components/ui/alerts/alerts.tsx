import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAppError, selectAppSuccess } from '@/services/app/app.selectors'
import { appActions } from '@/services/app/app-service'
import { AppDispatch } from '@/services/store'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Box, Collapse, IconButton } from '@mui/material'

import s from './alerts.module.css'

export const Alerts = () => {
  const ALERT_TIMEOUT = 3000

  const [errTimerId, setErrTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [sccTimerId, setSccTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined)

  const dispatch = useDispatch<AppDispatch>()
  const errorMessage = useSelector(selectAppError)
  const successMessage = useSelector(selectAppSuccess)

  useEffect(() => {
    if (errorMessage) {
      clearTimeout(errTimerId)
      const newTimout = setTimeout(() => dispatch(appActions.setErrorMessage(null)), ALERT_TIMEOUT)

      setErrTimerId(newTimout)
    }

    return () => {
      clearTimeout(errTimerId)
    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage) {
      clearTimeout(sccTimerId)
      const newTimout = setTimeout(
        () => dispatch(appActions.setSuccessMessage(null)),
        ALERT_TIMEOUT
      )

      setSccTimerId(newTimout)
    }

    return () => {
      clearTimeout(sccTimerId)
    }
  }, [successMessage])

  return (
    <div className={s.alertsContainer}>
      {errTimerId && (
        <Box sx={{ width: '100%' }}>
          <Collapse in={!!errorMessage}>
            <Alert
              action={
                <IconButton
                  aria-label={'close'}
                  color={'inherit'}
                  onClick={() => {
                    dispatch(appActions.setErrorMessage(null))
                  }}
                  size={'small'}
                >
                  <CloseIcon fontSize={'inherit'} />
                </IconButton>
              }
              severity={'error'}
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
        </Box>
      )}
      {sccTimerId && (
        <Box sx={{ width: '100%' }}>
          <Collapse in={!!successMessage}>
            <Alert
              action={
                <IconButton
                  aria-label={'close'}
                  color={'inherit'}
                  onClick={() => {
                    dispatch(appActions.setSuccessMessage(null))
                  }}
                  size={'small'}
                >
                  <CloseIcon fontSize={'inherit'} />
                </IconButton>
              }
              severity={'success'}
              sx={{ mb: 2 }}
            >
              {successMessage}
            </Alert>
          </Collapse>
        </Box>
      )}
    </div>
  )
}
