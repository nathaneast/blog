import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Alert } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";

const PostCardList = () => {
  const { posts, postCount, loading, categoryFindResult } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST, payload: 0 });
  }, [dispatch]);

  // infinity scroll
  ///////////////////////////////////
  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - 6;

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (loading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let remainPostCount = postCountRef.current - skipNumberRef.current;
        if (remainPostCount >= 0) {
          dispatch({
            type: POST_LOADING_REQUEST,
            payload: skipNumberRef.current + 6,
          });
          skipNumberRef.current += 6;
        } else {
          endMsg.current = true;
        }
      }
      console.log(entries);
    });

    if (observer.current) observer.current.disconnect();

    if (node) {
      console.log(node);
      observer.current.observe(node);
    }
  });
  ///////////////////////////////////

  return (
    <>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            더 이상의 포스트는 없습니다
          </Alert>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostCardList;
