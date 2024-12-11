'use client';
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./components/navbar.component";
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { homeApi } from '@/services/home/home.api';
import { userApi } from "@/services/user/user.api";

const rootReducer = combineReducers({
    [homeApi.reducerPath]: homeApi.reducer,
    [userApi.reducerPath]: userApi.reducer
})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat([
        homeApi.middleware,
        userApi.middleware
    ])
  });

const MainComponent = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <GoogleOAuthProvider clientId="1038302492508-tlu4o4n6aa21oq9386ktesf6hj0t8vna.apps.googleusercontent.com">
            <Provider store={store}>        
            <NavbarComponent />
            <Container className={'mt-3'}>
                {children}
            </Container>
            </Provider>
        </GoogleOAuthProvider>        
    )
}

export default MainComponent;