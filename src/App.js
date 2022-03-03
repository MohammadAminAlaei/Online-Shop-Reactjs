import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './assets/CustomTheme.mui';


// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    return <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    </CacheProvider>;
}

function App(props) {
    return (
        <RTL>
            {props.children}
        </RTL>

    );
}

export {App};
