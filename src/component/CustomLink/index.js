import { useMatch, Link, useResolvedPath } from "react-router-dom";

function CustomLink({ children, active, classLink, to }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={match ? active : ""}>
      <Link to={to} className={classLink}>
        {children}
      </Link>
    </li>
  );
}

export default CustomLink;
