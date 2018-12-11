import * as React from "react";
import { Tab } from "semantic-ui-react";
import FixedJobForm from "./FixedJobForm";
import TemporaryJobForm from "./TemporaryJobForm";
import OneTimeJobForm from "./OneTimeJobForm";

const scheduleTabs = [
  {
    menuItem: "Unbefristet",
    render: () => (
      <Tab.Pane>
        <FixedJobForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Temporär",
    render: () => (
      <Tab.Pane>
        <TemporaryJobForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Einmalig",
    render: () => (
      <Tab.Pane>
        <OneTimeJobForm />
      </Tab.Pane>
    )
  }
];

const ScheduleTabs: React.FC = () => <Tab panes={scheduleTabs} />;

export default ScheduleTabs;
