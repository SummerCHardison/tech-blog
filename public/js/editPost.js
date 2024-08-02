const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#update-title').value;
    const body = document.querySelector('#update-body').value;
    const id = document.querySelector('#id').textContent;

    if (title && body) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "post_title": title,
                "post_body": body
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

document.querySelector('#edit-form').addEventListener('submit', editFormHandler);