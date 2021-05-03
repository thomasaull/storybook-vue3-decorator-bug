import MyButton from "./Button.vue";
import { h } from "vue";

export default {
  title: "Example/Button",
  component: MyButton,

  decorators: [
    // MyButton does not show up in this case, it's gets rendered as:
    // <mybutton label="Button from default decorator"></mybutton>
    () => ({
      components: {
        MyButton,
      },

      template: `
        <MyButton label="Button from default decorator"/>
        <story/>
      `,
    }),
    // As a workaround, this seems to work:
    (storyFn) => {
      // Call the `storyFn` to receive a component that Vue can render
      const story = storyFn();
      // Vue 3 "Functional" component as decorator
      return () => {
        return [
          h(MyButton, { label: "Button from render function" }),
          h(story),
        ];
      };
    },
  ],

  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    onClick: {},
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
