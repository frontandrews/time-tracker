import React from "react";
const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    // { name: "START DATE", uid: "startDate" },
    // { name: "END DATE", uid: "duration" },
    // { name: "DURATION", uid: "duration" },
    { name: "ACTIONS", uid: "actions" },
    // { name: "PLAY", uid: "play" },
];

const tasks = Array(20)
.fill(0)
.map((_, i) => ({
  id: i + 1,
  name: `Task ${i + 1}`,
  project: {
    name: `Project ${i + 1}`,
  },
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "active",
  startedAt: null,
  finishedAt: null,
}));

export { columns, tasks };
