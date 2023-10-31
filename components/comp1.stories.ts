import type { Meta, StoryObj } from "@storybook/react";
import Comp1 from "./comp1";

const meta: Meta<typeof Comp1> = {
  title: "Components/Comp1",
  component: Comp1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    bgColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// const myargs = {
//   name: "Rajesh",
//   greet: "Welcome",
// };

export const Initial: Story = {
  args: {
    name: "Rajesh",
    greet: "Welcome",
  },
};

export const Peter: Story = {
  args: {
    name: "Peter Parker",
    greet: "Hi, I'm Peter Parker",
    bgColor: "indigo",
  },
};
