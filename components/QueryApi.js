import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  margin: 5.5rem 0 0 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  /* align-items: center ; */
  @media (max-width: 769px) {
    margin: 5.5rem auto 0;
    transform: translateX(0);
  }
`;

const QueryInput = styled.input`
  width: 70rem;
  font-size: 2rem;
  height: 5.4rem;
  border: 2px solid lightgray;
  border-radius: 1rem;
  font-weight: lighter;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  &:focus {
    outline: 2px solid lightblue;
  }
  @media (max-width: 600px) {
    width: 95%;
    align-self:center ;
  }
`;

const CardContainer = styled.div`
  width: 80%;
  max-height: 20rem;
  margin-top: 2rem;
  border: 2px solid lightgray;
  border-radius: 1rem;
  cursor: pointer;
  align-self: center;
`;

const CardHeading = styled.h3`
  font-size: 1.65rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const CardDescription = styled.p`
  margin-top: 1rem;
  margin-left: 1rem;
  color: lightgray;
`;

const StyledLabel = styled.label`
  align-self: center;
  font-size: 1.65rem;
  /* font-weight: bold; */
  display: inline-block;
  margin-bottom: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const StyledSelect = styled.select`
  width: 9rem;
  height: 3rem;
  border: 2px solid gray;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const tags = [
  "story",
  "comment",
  "poll",
  "pollopt",
  "show_hn",
  "ask_hn",
  "front_page",
];
const QueryApi = () => {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState({});
  const [tag, setTag] = useState("story");
  const [sortByTime, setSortByTime] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  //   const router = useRouter();
  const handleInput = (e) => {
    setInputText(e.target.value);
  };
  useEffect(() => {
    console.log("chanfe");
    setPosts({});
    (async () => {
      let res = await fetch(
        `http://hn.algolia.com/api/v1/${
          sortByTime ? "search_by_date" : "search"
        }?${inputText.length ? "query=" + inputText : ""}${
          tag.length
            ? `&tags=(${tag
                .split(",")
                .map((item, index) => item.trim().toLowerCase())
                .join(",")})`
            : ""
        }`
      );
      let data = await res.json();
      setPosts(data.hits);
      console.log(data.hits, "here");
      console.log(posts, "here2");
    })();
  }, [inputText, tag, sortByTime]);

  useEffect(() => {
    console.log("We doing this");
    if (Object.keys(posts).length > 0) {
      (async () => {
        let res = await fetch(
          `http://hn.algolia.com/api/v1/${
            sortByTime ? "search_by_date" : "search"
          }?${inputText.length ? "query=" + inputText : ""}${
            tag.length
              ? `&tags=(${tag
                  .split(",")
                  .map((item, index) => item.trim().toLowerCase())
                  .join(",")})`
              : ""
          }&page=${pageNumber}`
        );
        let data = await res.json();
        setPosts((posts) =>
          Object.keys(posts).length ? [...posts, ...data.hits] : posts
        );
      })();
    }
  }, [pageNumber]);

  return (
    <Container>
      <StyledLabel>Search</StyledLabel>
      <QueryInput
        value={inputText}
        placeholder="Search hacker news"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <p style={{ alignSelf: "center" }}>Available Tags: {tags.join(",")}</p>
      <QueryInput
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Search by tag"
      />
      <span style={{ marginTop: "1rem", fontSize: "1.1rem" }}>Sort By</span>
      <StyledSelect
        value={sortByTime ? "Time" : "Relevance"}
        onChange={(e) => {
          console.log(e.target.value);
          setSortByTime(e.target.value == "Time" ? true : false);
          console.log(sortByTime);
        }}
      >
        <option>Relevance</option>
        <option>Time</option>
      </StyledSelect>
      {posts.length
        ? posts
            ?.filter((item) => item.title)
            .map((item, index) => (
              <Link href={`/posts/${item.objectID}` || ""}>
                <CardContainer key={index}>
                  <CardHeading>{item.title}</CardHeading>
                  <CardDescription>
                    Author: {item?.author} Points: {item?.points}
                  </CardDescription>
                </CardContainer>
              </Link>
            ))
        : "Loading..."}
      <h2
        style={{
          textDecoration: "underline",
          alignSelf: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          setPageNumber((page) => page + 1);
          //   window.scrollBy(window.innerHeight);
        }}
      >
        Show more
      </h2>
    </Container>
  );
};

export default QueryApi;
