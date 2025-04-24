import formBuilderReducer from '@/features/form-builder/form-builder-slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        formBuilder: formBuilderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { Action, ThunkAction } from '@reduxjs/toolkit';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
