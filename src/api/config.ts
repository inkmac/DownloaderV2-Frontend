import request from "@/api/index.ts";

interface GeneralConfig {
    videoSavedPath: string;
    cookieSavedPath: string;
}

interface GetGeneralConfigResponse {
    status: 'success' | 'error';
    config: GeneralConfig;
    message: string;
}

type UpdateGeneralConfigResponse = GetGeneralConfigResponse

export function getGeneralConfig(): Promise<GetGeneralConfigResponse> {
    return request.get('/config/general');
}

interface UpdateGeneralConfigParams {
    videoSavedPath?: string;
    cookieSavedPath?: string;
}

export function updateGeneralConfig(params: UpdateGeneralConfigParams): Promise<UpdateGeneralConfigResponse> {
    return request.put('/config/general', params);
}