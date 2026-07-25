import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationDemo = () => {
  const [page, setPage] = React.useState(6);
  return (
    <Pagination page={page} totalPages={20} onPageChange={setPage} />
  );
};

export const Default: Story = {
  args: {
    page: 6,
    totalPages: 20,
    onPageChange: () => undefined,
  },
  render: () => <PaginationDemo />,
};

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 4,
    onPageChange: () => undefined,
  },
};
