import SignUpContainer from "../../containers/SignUpContainer";
import RoyalConainer from "../../containers/RoyalContainer";
export const ROUTER = [
  {
    path: "/",
    exact: true,
    main: ({ match, history }) => (
      <RoyalConainer match={match} history={history} />
    ),
  },
  {
    path: "/sign-up/redirect",
    exact: false,
    main: ({ match, history }) => (
      <SignUpContainer match={match} history={history} />
    ),
  },
];
