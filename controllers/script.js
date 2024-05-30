document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const editButtons = document.querySelectorAll('.edit-btn');
  const postItems = document.querySelectorAll('.post-item');
  const categoryButton = document.getElementById('categoryButton');
  const categoryDropdown = document.getElementById('categoryDropdown');
  const categoryLinks = categoryDropdown.querySelectorAll('a');

  postItems.forEach((postItem, index) => {
    const postTitle = postItem.querySelector('.post-title');

    // Recuperar el título guardado desde localStorage
    const savedTitle = localStorage.getItem(`postTitle${index}`);
    if (savedTitle) {
      postTitle.textContent = savedTitle;
    }

    // Guardar el título editado en localStorage al perder el foco
    postTitle.addEventListener('blur', () => {
      localStorage.setItem(`postTitle${index}`, postTitle.textContent);
    });

    deleteButtons[index].addEventListener('click', (event) => {
      event.stopPropagation();
      postItem.remove();
      localStorage.removeItem(`postTitle${index}`);
    });

    editButtons[index].addEventListener('click', (event) => {
      event.stopPropagation();
      const newTitle = prompt('Ingrese el nuevo título:', postTitle.textContent);
      if (newTitle) {
        postTitle.textContent = newTitle;
        localStorage.setItem(`postTitle${index}`, newTitle);
      }
    });

    postItem.addEventListener('click', () => {
      localStorage.setItem('postId', index);
      localStorage.setItem('postTitle', postTitle.textContent);
      window.location.href = 'vistaIndividual.html';
    });
  });

  categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const category = event.target.getAttribute('data-category');
      categoryButton.textContent = event.target.textContent;
      filterPosts(category);
    });
  });

  function filterPosts(category) {
    postItems.forEach(postItem => {
      const postCategory = postItem.getAttribute('data-category');
      if (category === 'all' || postCategory === category) {
        postItem.style.display = 'flex';
      } else {
        postItem.style.display = 'none';
      }
    });
  }

  // Initialize with all posts shown
  filterPosts('all');
});
