import React from "react";
import { Link } from "gatsby";
import { TypedRouters } from "../config/routes";

const SectionLink: React.FC<{text: string, path: string}> = props => {
  return <Link to={props.path}>{props.text}</Link>

}


export const Header: React.FC = () => {
  return <div className="p-2 flex items-center bg-gray-900 space-x-2">
    <SectionLink text="index" path={TypedRouters.index} />
    <SectionLink text="posts" path={TypedRouters.posts.index} />
    <SectionLink text="works" path={TypedRouters.posts.index} />
    <SectionLink text="about" path={TypedRouters.posts.index} />
  </div>

}
