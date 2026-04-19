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

