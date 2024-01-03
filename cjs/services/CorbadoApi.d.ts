declare class CorbadoApi {
    projectID: string;
    apiSecret: string;
    apiURL: string;
    constructor(projectID: string, apiSecret: string, apiURL: string);
    request(endpoint: string, method?: string, params?: {}): Promise<any>;
}
export default CorbadoApi;
