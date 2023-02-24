// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";
import AppProviders from "providers";

const AllTheProviders = ({ children }) => {
  return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";

export { customRender as render };
