import { Fragment, useEffect, useState } from "react";
import Button from "../Button";

export default function Comment({ db, id, title }) {
    const [commentContent, setCommentContent] = useState('');
    const [loadedComment, setLoadedComment] = useState(null);

    useEffect(() => {
        db.comments.where('tmdb_id')
            .equals(id)
            .and(comment => comment.title === title)
            .first()
            .then((fetchedComment) => {
                if (fetchedComment) {
                    setLoadedComment(fetchedComment);
                    setCommentContent(fetchedComment.content);
                } else {
                    setLoadedComment(null);
                    setCommentContent('');
                }
            });
    }, [db, id, title]);

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };

    // Save or update the comment in the database
    const saveComment = () => {
        if (loadedComment) {
            // Update the existing comment
            db.comments.update(loadedComment.id, { content: commentContent }).then((updated) => {
                if (updated) {
                    console.log('Comment updated successfully!');
                } else {
                    console.log('Failed to update comment.');
                }
            });
        } else {
            db.comments.add({
                tmdb_id: id,
                title: title,
                content: commentContent
            }).then(() => {
                console.log('Comment added successfully!');
            });
        }
        // success toast
    };

    return (
        <Fragment>
            <h3>Comment</h3>
            <div className={'flex-column'}>
                <textarea value={commentContent} onChange={handleCommentChange} onKeyUp={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                        saveComment();
                    }
                }}/>
                <Button onClick={saveComment} content={'Save'}/>
            </div>
        </Fragment>
    );
}
