import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts']
}

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
})

const persContactReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persContactReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    }
  })
})

export const persistor = persistStore(store)