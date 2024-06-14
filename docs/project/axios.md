### axios

```
import axios from 'axios';
import { message, Spin } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import { downloadFile } from '@/utils';

const CODE_OK = 200;
const ERROR_CODE = {
    AUTH_FAIL: 401
};
let requestCount = 0;

const showLoading = () => {
    if (requestCount === 0) {
        const loadingDiv = document.createElement('div');
        loadingDiv.setAttribute('id', 'loading');
        document.body.appendChild(loadingDiv);

        const root = ReactDOM.createRoot(loadingDiv);
        root.render(<Spin tip="加载中..." />);
    }
    requestCount++;
};

const hideLoading = () => {
    requestCount--;
    if (requestCount === 0) {
        const loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            ReactDOM.root.unmount(loadingDiv);
            document.body.removeChild(loadingDiv);
        }
    }
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 100000
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        if (config.loading) {
            showLoading();
        }
        return config;
    },
    err => {
        Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        const { loading } = response.config;
        if (loading) hideLoading();
        const { code, data, message } = response.data;

        if (response.data instanceof Blob) {
            return downloadFile(response);
        } else {
            if (code === CODE_OK) return Promise.resolve(data);
            else if (code === ERROR_CODE.AUTH_FAIL) {
                console.log('登录失败');
            } else {
                message.error(message);
                return Promise.reject(response.data);
            }
        }
    },
    error => {
        const { loading = true } = error.config;
        if (loading) hideLoading();
        if (error.response) {
            if (error.response.status === ERROR_CODE.AUTH_FAIL) {
                console.log('登录失败');
            }
        }
        message.error(error?.response?.data?.message || '服务端异常');
        return Promise.reject(error);
    }
);

export default instance;
```
