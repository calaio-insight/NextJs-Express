'use client';
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./components/navbar.component";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { homeApi } from '@/services/home/home.api';

const store = configureStore({
    reducer: {
      [homeApi.reducerPath]: homeApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(homeApi.middleware)
  });

const MainComponent = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <Provider store={store}>        
          <NavbarComponent />
          <Container className={'mt-3'}>
            {children}
          </Container>
        </Provider>
    )
}

export default MainComponent;