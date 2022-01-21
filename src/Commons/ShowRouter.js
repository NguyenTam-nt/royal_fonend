import { ROUTER } from "../contains/Router";
import { Route } from "react-router-dom";

const ShowRouter = () => {
  let xhtml = null;
  xhtml = ROUTER.map((rou, index) => {
    return (
      <Route
        path={rou.path}
        component={rou.main}
        exact={rou.exact}
        key={index}
      />
    );
  });

  return xhtml;
};
export default ShowRouter;
