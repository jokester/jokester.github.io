import React from "react";
import { Link } from "gatsby";
import { TypedRouters } from "../config/routes";

const SectionLink: React.FC<{text: string, path: string}> = props => {
  return <Link to={props.path}>{props.text}</Link>

}


export const Header: React.FC = () => {
  return <div className="h-12 flex items-center">
    <SectionLink text="posts" path={TypedRouters.posts.index} />
    <SectionLink text="posts" path={TypedRouters.posts.index} />
  </div>

}
