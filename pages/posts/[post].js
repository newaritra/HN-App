import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import Comments from "../../components/Comments";
import Spinner from "../../components/Spinner";

const PointDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    justify-content: space-evenly;
  }
`;
const CommentHeading = styled.h3`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: -2.5rem;
  @media (max-width: 600px) {
    margin-left: 2.2rem;
  }
`;

const Container = styled.div`
  width: 70rem;
  margin-left: 50%;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-top: 5rem;
  text-align: center;
`;

const Post = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [check, setCheck] = useState("");
  const [suthors, setAuthors] = useState([]);

  const displayComments = (item, level = 1) => {
    if (item?.children?.length > 0) {
      console.log(item);

      return (
        <div>
          {item.parent_id && item.text?.length && (
            <Comments item={item} level={level} />
          )}
          {item?.children?.map((el) => {
            return displayComments(el, level + 1);
          })}
        </div>
      );
    } else {
      return (
        item?.parent_id &&
        item?.text?.length && <Comments item={item} level={level} />
      );
    }
    // }
  };
  useEffect(() => {}, [details]);
  useEffect(() => {
    console.log(router.query);
    router.isReady &&
      (async () => {
        const res = await fetch(
          `https://hn.algolia.com/api/v1/items/${router.query.post}`
        );
        const data = await res.json();
        setDetails(data);
        console.log("fetched", details?.children);
      })();
  }, [router.isReady]);
  return details !== null ? (
    // <Container>
    <Container>
      <Heading>{details.title}</Heading>
      <PointDiv>
        <p>Author: {details.author}</p>
        {details.url && (
          <Link target="_blank" href={details.url}>
            Visit Page
          </Link>
        )}
        <p>Points: {details.points}</p>
      </PointDiv>
      <CommentHeading>Comments:</CommentHeading>
      {displayComments(details)}
    </Container>
  ) : (
    // </Container>
    // <h1 style={{ textAlign: "center", verticalAlign: "middle" }}>
    //   Loading...
    // </h1>
    <Spinner />
  );
};

export default Post;
