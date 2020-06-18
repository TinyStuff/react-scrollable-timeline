import { objectMap } from "../utils";

test("Can map object keys to array", () => {
  const events = {
    a: ["foo", "bar"],
    b: ["baz"],
  };

  const res = objectMap(events, (e) => e);

  expect(res).toEqual([
    {
      "0": "foo",
      "1": "bar",
      key: "a",
    },
    {
      "0": "baz",
      key: "b",
    },
  ]);
});
