export type CustomerServiceConfig = {
  apiBaseUrl: string;
  chatPath: string;
  requestDefaults: {
    stream: boolean;
    promptName?: string;
    knowledgeFiles?: string[];
    extraInstructions?: string;
    metadata?: Record<string, string>;
  };
};

export const customerServiceConfig: CustomerServiceConfig = {
  // Same-origin deployment can use an empty string here.
  apiBaseUrl: "https://ai-cs-backend.psygoai.com/",
  chatPath: "/api/v1/chat/completions",
  requestDefaults: {
    stream: true,
    metadata: {
      source: "official-site",
      lang: "zh-CN",
    },
  },
};

export function getCustomerServiceEndpoint() {
  if (!customerServiceConfig.apiBaseUrl) {
    return customerServiceConfig.chatPath;
  }

  return new URL(
    customerServiceConfig.chatPath,
    customerServiceConfig.apiBaseUrl,
  ).toString();
}
