import { useGetDeviceQuery } from "@/api/device/deviceApi";
import { render, screen } from "@testing-library/react";
import Device from "./Device";

// mock RTK Query
// заглушка реального RTK query на фейковый
jest.mock("@/api/device/deviceApi", () => ({
  useGetDeviceQuery: jest.fn(),
}));

describe("Device component", () => {
  test("показывает loader", () => {
    (useGetDeviceQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Device />);
    expect(
      screen.getByRole("status", { name: /loading/i })
    ).toBeInTheDocument();
  });
  test("не показывает loader, когда данные загружены", () => {
    (useGetDeviceQuery as jest.Mock).mockReturnValue({
      data: {
        client: { browser: "Chrome", os: "Windows", platform: "x64" },
        device: { type: "desktop", isTouch: false },
        source: "client-hints",
      },
      isLoading: false,
      isError: false,
    });

    render(<Device />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
  test("показывает ошибку", () => {
    (useGetDeviceQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Device />);
    expect(screen.getByText("Failed to load device")).toBeInTheDocument();
  });
  test("рендерит данные устройства", () => {
    (useGetDeviceQuery as jest.Mock).mockReturnValue({
      data: {
        client: { browser: "Chrome", os: "Windows", platform: "x64" },
        device: { type: "desktop", isTouch: false },
        source: "client-hints",
      },
      isLoading: false,
      isError: false,
    });

    render(<Device />);
    expect(screen.getByText("browser: Chrome")).toBeInTheDocument();
    expect(screen.getByText("os: Windows")).toBeInTheDocument();
    expect(screen.getByText("platform: x64")).toBeInTheDocument();
    expect(screen.getByText("type: desktop")).toBeInTheDocument();
    expect(screen.getByText("isTouch: false")).toBeInTheDocument();
    expect(screen.getByText("Source! client-hints")).toBeInTheDocument();
  });
});
