document.addEventListener('DOMContentLoaded', () => {
    const postTitleElement = document.getElementById('post-title');
    const postId = localStorage.getItem('postId');
    const postTitle = localStorage.getItem('postTitle');
  
    // Establecer el título del post en la página de detalles
    if (postTitle) {
      postTitleElement.textContent = postTitle;
    }
  
    // Manejo de comentarios
    const commentInput = document.getElementById('comment-input');
    const sendBtn = document.getElementById('send-btn');
    const commentsList = document.getElementById('comments-list');
  
    // Recuperar y mostrar comentarios guardados desde localStorage
    const savedComments = JSON.parse(localStorage.getItem(`comments${postId}`)) || [];
    savedComments.forEach((comment, index) => {
      const userName = comment.user || `usuario${index + 1}`; // Nombre de usuario por defecto
      const commentElement = document.createElement('p');
      commentElement.innerHTML = `<strong>${userName}:</strong> ${comment.text}`;
      commentsList.appendChild(commentElement);
    });
  
    // Enviar nuevo comentario
    sendBtn.addEventListener('click', () => {
      const newComment = commentInput.value.trim();
      if (newComment) {
        // Guardar el comentario en localStorage
        const userName = `usuario${savedComments.length + 1}`; // Nombre de usuario por defecto
        const commentData = { user: userName, text: newComment };
        savedComments.push(commentData);
        localStorage.setItem(`comments${postId}`, JSON.stringify(savedComments));
  
        // Mostrar el comentario en la lista
        const commentElement = document.createElement('p');
        commentElement.innerHTML = `<strong>${userName}:</strong> ${newComment}`;
        commentsList.appendChild(commentElement);
  
        // Limpiar el campo de entrada
        commentInput.value = '';
      }
    });
  });
