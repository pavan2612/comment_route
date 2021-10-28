import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()
  const {quoteId} = params

  const {status,data:loadedComments,sendRequest} = useHttp(getAllComments)

  useEffect(() => {
      sendRequest(quoteId)
  },[sendRequest,quoteId])

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  },[sendRequest,quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments
  if(status==='pending'){
    comments = <div className='centered'><LoadingSpinner/></div>
  }
  if(status==='completed' && loadedComments && loadedComments.length>0){
    comments = <CommentsList comments={loadedComments}/>
  }
  if(status==='completed' && (!loadedComments || loadedComments.length===0)){
    comments = <p className='centered'>No Comments were made yet</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
