import { baseApi } from "../baseApi";

export type DeviceType = "mobile" | "desktop";
export type DeviceSource = "client-hints" | "user-agent" | "default";

export interface DeviceResponse {
  device: {
    type: DeviceType;
    isTouch: boolean;
  };
  client: {
    browser: string;
    os: string;
    platform: string | null;
  };
  source: DeviceSource;
}

export const deviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDevice: builder.query<DeviceResponse, void>({
      query: () => "/device",
    }),
  }),
});

export const { useGetDeviceQuery } = deviceApi;
