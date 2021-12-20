import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

function PostCardContent({ postData }) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((val, idx) => {
        if (val.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${val.slice(1)}`} key={idx}>
              <a>{val}</a>
            </Link>
          );
        }
        return val;
      })}
    </div>
  );
}

PostCardContent.Proptypes = {
  postDat: PropTypes.string.isRequired,
};

export default PostCardContent;
