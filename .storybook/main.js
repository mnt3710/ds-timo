export const stories = ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"];
export const addons = [
  "@storybook/addon-links",
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
];
export const framework = {
  name: "@storybook/react-vite",
  options: {},
};
export const docs = {
  autodocs: "tag",
};
