# API Client for http://www.yescaptcha.com/


## Install
```
npm install yescaptcha-js
```

## Example


```typescript
import YescaptchaAPIClient, { TaskType } from "yescaptcha-js";

const client = new YescaptchaAPIClient({ clientKey: "clientKey" });

const { taskId } = await client.createTask({
  type: TaskType.HCaptchaTaskProxyless,
  websiteURL: "https://example.com",
  websiteKey: "siteKey",
});


const solution = await client.waitForTaskResult<TaskType.HCaptchaTaskProxyless>(taskId, 1000 * 60 * 5); // wait for 5 minutes

console.log(solution); 
```