import request from "@/api/index.ts";

interface OpenSystemResponse {
    status: 'success' | 'error';
    message: string;
}

export function openSystem(target: string): Promise<OpenSystemResponse> {
    return request.post('/open-system', {
        target: target,
    })
}

