document.querySelectorAll('.delete-button')
    .forEach(item => {
        item.addEventListener('click', function() {
            let id = this.id;


            fetch('/quotes', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _id: id
                    })

                })
                .then(function(response) {
                    if (response.ok) {
                        console.log('Delete was recorded')
                        location.reload()
                        return
                    }
                    throw new Error('Request failed.')
                })
                .catch(function(error) {
                    console.log(error)
                })

        })
    });