import { ConnectServices2En } from "./connect-services-2.en";

export const ConnectServices2Vi: Partial<
  Record<keyof typeof ConnectServices2En, string>
> = {
  "connectServices2.signInFallback.oauth": "Dùng đăng nhập {name} thay thế",
  "connectServices2.signInFallback.token": "Dùng token {name} thay thế",
  "connectServices2.provider.openaiDescription":
    "Mô hình OpenAI qua khoá API hoặc gói ChatGPT của bạn",
};
