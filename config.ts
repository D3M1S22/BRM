import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { polygonAmoy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" as const }],
      [{ type: "passkey" as const }, { type: "external_wallets" }],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    apiKey: "evCcl0wur19klFFMXW7A12nrEcU5yRve", // TODO: insert your Alchemy API key - setup your app & embedded account config at https://dashboard.alchemy.com/accounts
    chain: polygonAmoy,
    ssr: true, // read more about server side rendering (ssr) practices: https://accountkit.alchemy.com/react/ssr
    storage: cookieStorage, // read more about persisting state with cookies: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state
  },
  uiConfig
);

export const queryClient = new QueryClient();
