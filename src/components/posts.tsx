import React from 'react';
import Link from 'next/link';

export const PostListItem: React.FC = () => {
  return (
    <li className="px-4 block my-2">
      <Link href="#">
        <a>
          <span className="text-sm mr-2 font-mono">{'TODO'}</span>
          <span>TODO</span>
        </a>
      </Link>
    </li>
  );
};
