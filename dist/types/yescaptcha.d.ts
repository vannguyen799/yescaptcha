import APIClient, { APIClientOptions } from "./api-client.js";
type YesCaptchaOptions = {
    clientKey: string;
    node?: string;
};
declare class BaseAPIResponse {
    errorId?: string;
    errorCode?: number;
    errorDescription?: string;
}
export declare enum TaskType {
    ImageToTextTask = "ImageToTextTask",
    ImageToTextTaskMuggle = "ImageToTextTaskMuggle",
    ImageToTextTaskM1 = "ImageToTextTaskM1",
    NoCaptchaTaskProxyless = "NoCaptchaTaskProxyless",
    RecaptchaV2TaskProxyless = "RecaptchaV2TaskProxyless",
    RecaptchaV2EnterpriseTaskProxyless = "RecaptchaV2EnterpriseTaskProxyless",
    ReCaptchaV2Classification = "ReCaptchaV2Classification",
    RecaptchaV3TaskProxyless = "RecaptchaV3TaskProxyless",
    RecaptchaV3TaskProxylessM1 = "RecaptchaV3TaskProxylessM1",
    RecaptchaV3TaskProxylessK1 = "RecaptchaV3TaskProxylessK1",
    RecaptchaV3EnterpriseTaskProxylessK1 = "RecaptchaV3EnterpriseTaskProxylessK1",
    HCaptchaTaskProxyless = "HCaptchaTaskProxyless",
    HCaptchaClassification = "HCaptchaClassification",
    FunCaptchaClassification = "FunCaptchaClassification",
    TurnstileTaskProxyless = "TurnstileTaskProxyless",
    TurnstileTaskProxylessM1 = "TurnstileTaskProxylessM1",
    CloudFlareTaskS2 = "CloudFlareTaskS2"
}
/** @description  English and numeric characters in images with varying lengths */
type ImageToTextTaskType = TaskType.ImageToTextTask | TaskType.ImageToTextTaskM1 | TaskType.ImageToTextTaskMuggle;
/** @description  reCaptcha V2 protocol interface */
type NoCaptchaTaskProxylessType = TaskType.NoCaptchaTaskProxyless | TaskType.RecaptchaV2TaskProxyless | TaskType.RecaptchaV2EnterpriseTaskProxyless;
type RecaptchaV3TaskProxylessType = TaskType.RecaptchaV3TaskProxyless | TaskType.RecaptchaV3TaskProxylessM1 | TaskType.RecaptchaV3TaskProxylessK1 | TaskType.RecaptchaV3EnterpriseTaskProxylessK1;
type RecaptchaV2EnterpriseTaskProxylessType = TaskType.RecaptchaV2EnterpriseTaskProxyless;
type CreateTaskResponse = BaseAPIResponse & {
    taskId: string;
};
type TaskResultResponse<T> = BaseAPIResponse & {
    taskId: string;
    status: "ready" | "error" | "processing";
    solution: T;
};
export default class YesCaptcha extends APIClient {
    static DEFAULT_NODE: string;
    private clientKey;
    constructor({ clientKey, node }: YesCaptchaOptions, opts?: APIClientOptions);
    getBalance(): Promise<{
        balance: number;
    }>;
    /**
     * @param opts.body File body encoded in base64. Make sure to send it without line breaks.（do not data:image/*********;base64,content
     * */
    createTask(opts: {
        type: ImageToTextTaskType;
        body: string;
    }): Promise<CreateTaskResponse>;
    /**
     * @param opts.websiteURL The address of the ReCaptcha web page.Fixed value
     * @param opts.websiteKey The ReCaptcha key of the web page. Fixed value
     * @param opts.isInvisible [Optional] If you encounter a reCaptchaV2 of isInvisible type, you need to add this parameter.
     */
    createTask(opts: {
        type: NoCaptchaTaskProxylessType;
        websiteURL: string;
        websiteKey: string;
        isInvisible?: boolean;
    }): Promise<CreateTaskResponse>;
    /**
     * @param opts.websiteURL The address of the ReCaptcha web page.Fixed value
     * @param opts.websiteKey The ReCaptcha key of the web page. Fixed value
     * @param opts.pageAction [Optional] This value must be correct, otherwise the recognition result is invalid.
     */
    createTask(opts: {
        type: RecaptchaV3TaskProxylessType;
        websiteURL: string;
        websiteKey: string;
        pageAction?: string;
    }): Promise<CreateTaskResponse>;
    /**
     * @param opts.websiteURL The address of the ReCaptcha web page.Fixed value
     * @param opts.websiteKey The ReCaptcha key of the web page. Fixed value
     * @param opts.enterprisePayload [Optional]
     * The additional parameter "s" can be found in the code below:
     * grecaptcha.enterprise.render( render_div_id, {
     * 		'sitekey': sitekey,
     * 		'theme': 'dark',
     * 		'callback': function(n){},
     * 		's': "2JvUXHNTnZl1Jb6WEvbDyBMzrMTR7oQ78QRhBcG07rk9bpaAaE0LRq1ZeP5NYa0N...ugQA"
     */
    createTask(opts: {
        type: RecaptchaV2EnterpriseTaskProxylessType;
        websiteURL: string;
        websiteKey: string;
        enterprisePayload?: {
            s: string;
        };
    }): Promise<CreateTaskResponse>;
    /**
     * @param opts.websiteURL The address of the Hcaptcha web page.Fixed value
     * @param opts.websiteKey The Hcaptcha key of the web page. Fixed value
     * @param opts.userAgent [Optional]  Not required. The same as the userAgent used to request the website. If the value returned by the interface is different from the value you submitted, please use the value returned by the interface
     * @param opts.isInvisible [Optional] Not required. If you encounter an implicit version, please pass a true value.
     * @param opts.rqdata [Optional] Not necessary, websites such as discord may need to obtain the rqdata field.
     */
    createTask(opts: {
        type: TaskType.HCaptchaTaskProxyless;
        websiteURL: string;
        websiteKey: string;
        userAgent?: string;
        isInvisible?: boolean;
        rqdata?: string;
    }): Promise<CreateTaskResponse>;
    /**
     * @param opts.websiteURL Web Address: Generally a fixed value.
     * @param opts.websiteKey Site Key: Generally a fixed value.
     */
    createTask(opts: {
        type: TaskType.TurnstileTaskProxyless | TaskType.TurnstileTaskProxylessM1;
        websiteURL: string;
        websiteKey: string;
    }): Promise<CreateTaskResponse>;
    waitForTaskResult<T = undefined>(taskId: string, timeout?: number): Promise<{
        gRecaptchaResponse: string;
    } | {
        text: string;
    } | {
        gRecaptchaResponse: string;
        userAgent?: string;
        respKey?: string;
    }>;
    waitForTaskResult<T extends ImageToTextTaskType>(taskId: string, timeout?: number): Promise<{
        text: string;
    }>;
    waitForTaskResult<T extends TaskType.HCaptchaTaskProxyless>(taskId: string, timeout?: number): Promise<{
        gRecaptchaResponse: string;
        userAgent?: string;
        respKey?: string;
    }>;
    waitForTaskResult<T extends NoCaptchaTaskProxylessType | RecaptchaV3TaskProxylessType>(taskId: string, timeout?: number): Promise<{
        gRecaptchaResponse: string;
    }>;
    getTaskResult<T extends TaskType>(taskId: string): Promise<T extends ImageToTextTaskType ? TaskResultResponse<{
        text: string;
    }> : T extends NoCaptchaTaskProxylessType | RecaptchaV3TaskProxylessType | RecaptchaV2EnterpriseTaskProxylessType ? TaskResultResponse<{
        gRecaptchaResponse: string;
    }> : T extends TaskType.HCaptchaTaskProxyless ? TaskResultResponse<{
        gRecaptchaResponse: string;
        userAgent?: string;
        respKey?: string;
    }> : never>;
}
export {};
