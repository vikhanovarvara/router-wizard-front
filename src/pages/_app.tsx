import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from 'store';

import { NavigationProvider } from 'components/navigation';
import Notifications from 'components/notifications/Notifications';

import { defaultTheme } from 'themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <NavigationProvider>
          <ToastContainer />

          <Notifications />

          <CssBaseline />

          <Head>
            <title>Router Wizard</title>

            <meta name='description' content='Сервис для учёта установок роутера' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />

            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Component {...pageProps} />
        </NavigationProvider>
      </ThemeProvider>
    </Provider>
  );
}
