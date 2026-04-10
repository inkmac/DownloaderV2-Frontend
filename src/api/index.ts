import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const request = axios.create({
    baseURL: 'http://127.0.0.1:56000',
    timeout: 0,
});

// 响应拦截器：统一处理报错
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const msg = error.response?.data?.detail || "网络请求失败";
        ElMessage.error(msg); // 自动弹出错误提示
        return Promise.reject(error);
    }
);

export default request;