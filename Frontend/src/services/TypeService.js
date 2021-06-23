export const types = [
  { _id: "1", name: "Cognizable" },
  { _id: "2", name: "Non Cognizable" },
  { _id: "3", name: "Missing Report" },
  { _id: "4", name: "Theft Report" },
];

export function getTypes() {
  return types.filter((e) => e);
}
