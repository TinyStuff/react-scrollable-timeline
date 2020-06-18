import { groupBy } from "../utils";

test("Groups by event property", () => {
  const events = [
    {
      groupId: "a",
      title: "first",
    },
    {
      groupId: "a",
      title: "second",
    },
    {
      groupId: "b",
      title: "third",
    },
  ];
  const res = groupBy(events, (e) => e.groupId);

  expect(res).toEqual({
    a: [
      {
        groupId: "a",
        title: "first",
      },
      {
        groupId: "a",
        title: "second",
      },
    ],
    b: [
      {
        groupId: "b",
        title: "third",
      },
    ],
  });
});
