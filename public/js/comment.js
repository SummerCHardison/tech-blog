const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-body').value
    const userID = document.querySelector('#userID').textContent;
    const postID = document.querySelector('#postID').textContent;

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": userID,
                "post_id": postID,
                "comment_body": comment
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', commentHandler);