const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').textContent;

    if (title && body) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                "post_title": title,
                "post_body": body,
                "user_id": id
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);