import request from "@/api/index.ts";

interface OpenUriResponse {
    status: 'success' | 'error';
    message: string;
}

export function openUri(uri: string): Promise<OpenUriResponse> {
    return request.post('/open-uri', {
        uri: uri,
    })
}


interface OpenPathResponse {
    status: 'success' | 'error';
    message: string;
}

export function openPath(path: string): Promise<OpenPathResponse> {
    return request.post('/open-path', {
        path: path,
    })
}


interface ChoosePathResponse {
    status: 'success' | 'error';
    path: string;
    message: string;
}

export function choosePath(): Promise<ChoosePathResponse> {
    return request.post('/choose-path')
}