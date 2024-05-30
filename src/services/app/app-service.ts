import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.endsWith('pending'),
      state => {
        state.isLoading = true
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('fulfilled'),
      state => {
        state.isLoading = false
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('rejected'),
      state => {
        state.isLoading = false
      }
    )
  },
  initialState: {
    errorMessage: null as null | string,
    isAuthenticated: !!localStorage.getItem('token') as boolean,
    isLoading: false as boolean,
    successMessage: null as null | string,
  },
  name: 'app',
  reducers: {
    setAppIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<null | string>) => {
      state.errorMessage = action.payload
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setSuccessMessage: (state, action: PayloadAction<null | string>) => {
      state.successMessage = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice
