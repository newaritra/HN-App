import React from "react";
import styled, { css } from "styled-components";

const CommentContainer = styled.div`
  margin-left: ${({ level }) => level + "rem"};
  border: 2px solid lightgray;
  padding: 0.5rem;
  max-width: 60vw;
  min-width: 40vw;
  border-radius: 1rem;
  position: relative;
  /* overflow: hidden; */
  & > *,
  a {
    font-size:1.2rem ;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  & a {
    color: lightcoral;
  }
  ${({ level, item }) =>
    item.parent_id !== item.story_id &&
    css`&:before {
    content: "";
    position: absolute;
    top: -6rem;
    height: 3rem;
    width: 0.28rem;
    left: 0.5rem;
    background-color: lightgray;`}
`;

const Container = styled.div`
  position: relative;
  margin-top: 4rem;
`;

const Author = styled.h1`
  font-weight: bold;
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-left: ${({ level }) => level + 0.25 + "rem"};
  font-size: 1.3rem;
  text-decoration: underline;
`;

const Comments = ({ item, level }) => {
    
  return (
    <Container level={level}>
      <Author level={level}>{item.author}</Author>: replied-to: {item.parent_id}{" "}
      <CommentContainer
        item={item}
        level={level}
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    </Container>
  );
};

export default Comments;
