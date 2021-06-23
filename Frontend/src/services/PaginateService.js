import _ from "lodash";

export function paginate(allPermissions, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(allPermissions).slice(startIndex).take(pageSize).value();
}
