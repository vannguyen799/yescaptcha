import APIClient from "./api-client.js";
import { sleep } from "./utils.js";
class BaseAPIResponse {
}
export var TaskType;
(function (TaskType) {
    TaskType["ImageToTextTask"] = "ImageToTextTask";
    TaskType["ImageToTextTaskMuggle"] = "ImageToTextTaskMuggle";
    TaskType["ImageToTextTaskM1"] = "ImageToTextTaskM1";
    TaskType["NoCaptchaTaskProxyless"] = "NoCaptchaTaskProxyless";
    TaskType["RecaptchaV2TaskProxyless"] = "RecaptchaV2TaskProxyless";
    TaskType["RecaptchaV2EnterpriseTaskProxyless"] = "RecaptchaV2EnterpriseTaskProxyless";
    TaskType["ReCaptchaV2Classification"] = "ReCaptchaV2Classification";
    TaskType["RecaptchaV3TaskProxyless"] = "RecaptchaV3TaskProxyless";
    TaskType["RecaptchaV3TaskProxylessM1"] = "RecaptchaV3TaskProxylessM1";
    TaskType["RecaptchaV3TaskProxylessK1"] = "RecaptchaV3TaskProxylessK1";
    TaskType["RecaptchaV3EnterpriseTaskProxylessK1"] = "RecaptchaV3EnterpriseTaskProxylessK1";
    TaskType["HCaptchaTaskProxyless"] = "HCaptchaTaskProxyless";
    TaskType["HCaptchaClassification"] = "HCaptchaClassification";
    TaskType["FunCaptchaClassification"] = "FunCaptchaClassification";
    TaskType["TurnstileTaskProxyless"] = "TurnstileTaskProxyless";
    TaskType["TurnstileTaskProxylessM1"] = "TurnstileTaskProxylessM1";
    TaskType["CloudFlareTaskS2"] = "CloudFlareTaskS2";
})(TaskType || (TaskType = {}));
const ImageToTextTaskList = [TaskType.ImageToTextTask, TaskType.ImageToTextTaskM1, TaskType.ImageToTextTaskMuggle];
class YescaptchaAPIClient extends APIClient {
    constructor({ clientKey, node }, opts = {}) {
        super({
            ...opts,
            base: node || YescaptchaAPIClient.DEFAULT_NODE,
        });
        this.clientKey = clientKey;
    }
    getBalance() {
        return this.post(`getBalance`, { clientKey: this.clientKey }).then((res) => res.json());
    }
    createTask(opts) {
        return this.post(`createTask`, { clientKey: this.clientKey, task: opts }).then((res) => res.json());
    }
    async waitForTaskResult(taskId, timeout = 5 * 60 * 1000) {
        const start = Date.now();
        const end = start + timeout;
        while (Date.now() < end) {
            const res = await this.getTaskResult(taskId);
            if (res.status === "ready") {
                return res.solution;
            }
            if (res.status === "processing") {
                await sleep(2000);
                continue;
            }
            throw new Error(`Task error: ${JSON.stringify(res)}`);
        }
        throw new Error("Task result not ready within the timeout period");
    }
    getTaskResult(taskId) {
        return this.post(`getTaskResult`, { clientKey: this.clientKey, taskId }).then((res) => res.json());
    }
}
YescaptchaAPIClient.DEFAULT_NODE = "https://api.yescaptcha.com";
export default YescaptchaAPIClient;
