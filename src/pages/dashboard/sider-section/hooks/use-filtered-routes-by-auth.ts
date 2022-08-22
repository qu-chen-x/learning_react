import { useAuthorize } from "../../../../shared/hooks";
import myRoutes, { CustomRouteObject } from "routes";

export default function useFilteredRoutesByAuth() {
  // const authorize = useAuthorize();
  // const dashboardSubRoutes = myRoutes[0]?.children;
  // if (dashboardSubRoutes === undefined) {
  //   return [];
  // }
  // return dashboardSubRoutes.reduce((filteredRoutes, routeFirstLevel) => {
  //   const isAuthorized = authorize(routeFirstLevel.authCode);
  //   if (isAuthorized) {
  //     const routeLevelTwoFiltered = {
  //       ...routeFirstLevel,
  //       children: routeFirstLevel.children?.filter((routeSecondLevel) =>
  //         authorize(routeSecondLevel.authCode)
  //       ),
  //     };
  //     filteredRoutes.push(routeLevelTwoFiltered);
  //   }

  //   return filteredRoutes;
  // }, [] as CustomRouteObject[]);
  const dashboardSubRoutes = myRoutes[0]?.children;
  if (dashboardSubRoutes === undefined) {
    return [];
  }
  return dashboardSubRoutes.filter((v) => v.authCode !== "");
}
