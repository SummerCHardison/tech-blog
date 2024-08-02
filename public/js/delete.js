const deleteHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#id').textContent;

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    };

document
    .querySelector('#delete')
    .addEventListener('click', deleteHandler);