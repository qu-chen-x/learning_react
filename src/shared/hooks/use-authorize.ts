import * as React from "react";
import useResource from "./use-resource";

const bypassCode = process.env.REACT_APP_BYPASS_AUTH_CODE;

type Resources = Exclude<ReturnType<typeof useResource>, undefined>;
type Resource = Resources[number];

function searchResourceByCode(
  resources: Resources,
  resourceCode: string
): boolean {
  const root: Resource = { childResources: resources };
  const stack: Resources = [root];
  while (stack.length > 0) {
    const currentResource = stack.shift()!;
    if (currentResource.resourceCode === resourceCode) {
      return true;
    }
    const childrenResource = Array.isArray(currentResource.childResources)
      ? currentResource.childResources
      : [];
    for (const childResource of childrenResource) {
      stack.unshift(childResource);
    }
  }
  return false;
}

export default function useAuthorize() {
  const resources = useResource();
  return React.useCallback(
    (code: string) => {
      if (resources === undefined) {
        return false;
      }
      if (code === bypassCode) return true;
      return searchResourceByCode(resources, code);
    },
    [resources]
  );
}
