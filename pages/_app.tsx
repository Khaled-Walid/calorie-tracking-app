import * as React from 'react';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Cookies from 'cookies';
const sessionTokenCookie = {
  name: 'next-auth.session-token',

  // prevent token modifications
  force: true,

  // not logged in
  // value: '',

  // user token
  value: 'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJzdWIiOiJja3Z0Y3k0ZTMwMDE0anF1czBnazRrb2U0IiwiaWF0IjoxNjM2NTM5NzM3LCJleHAiOjE2MzkxMzE3Mzd9.Sr5YRfxVK_Ls54Z2hW2Rg-dxMWlS2duzeFTrM4ZYVwc7FNsbrIm14mGuRIa0j7kYhYgCxPTs8yhvh-gm7LNMtQ',

  // admin token
  // value: 'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiSmFuZSBEb2UiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwic3ViIjoiY2t2dGN5NGU4MDAyOWpxdXM5bTJ4eTYxdCIsImlhdCI6MTYzNjUzOTgxMywiZXhwIjoxNjM5MTMxODEzfQ.1gR2_RIraFtGyJ6tkWPW4C2IXX4x7TKLFdpv3AUp8K_cYFX8efbL8Qb0fcialxIcglJoihGk4j-7KUfM_yldsQ',
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Calorie Counter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (sessionTokenCookie.force) {
    const { ctx } = appContext;
    const { req, res } = ctx;

    if (req && res) {
      const cookies = new Cookies(req, res);
      const session = cookies.get(sessionTokenCookie.name);
      if (session !== sessionTokenCookie.value) {
        cookies.set(sessionTokenCookie.name, sessionTokenCookie.value, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
        });
      }
    }
  }

  return appProps;
}

export default MyApp;
