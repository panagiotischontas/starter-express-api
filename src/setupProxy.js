import { createProxyMiddleware } from 'http-proxy-middleware';
import app from './app';

export const proxyMiddleware = () => {
    app.use('/',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    );
}