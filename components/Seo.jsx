import Head from "next/head";

const defaultTitle = `${process.env.NEXT_PUBLIC_APP_NAME}`;
const defaultDescription = 'Administratie app';

const Seo = ({ title, description }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="application-name" content={process.env.NEXT_PUBLIC_APP_NAME} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_APP_NAME} />
            <title>{title ?? defaultTitle}</title>
            <meta name="description" content={description ?? defaultDescription} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content={process.env.NEXT_PUBLIC_APP_THEME} />
            <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
            <link rel="manifest" href="/manifest.json" />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/android-chrome-192x192.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="512x512"
                href="/android-chrome-512x512.png"
            />
        </Head>
    );
};

export default Seo;
