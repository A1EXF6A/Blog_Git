function execCommand(command, value = null) {
    if (command === 'hiliteColor') {
        document.execCommand('styleWithCSS', false, true); // Habilita el estilo CSS
        document.execCommand('backColor', false, value); // Aplica el color de fondo
    } else {
        document.execCommand(command, false, value);
    }
}


function insertImage(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%'; // Ajusta esto según el tamaño deseado
        img.style.height = 'auto';   // Mantén la proporción de la imagen
        document.getElementById('editor').appendChild(img);
    }
    reader.readAsDataURL(file);
}


function insertVideo(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.controls = true;
        video.style.maxWidth = '100%'; // Ajusta esto según el tamaño deseado
        video.style.height = 'auto';   // Mantén la proporción del video
        document.getElementById('editor').appendChild(video);
    }
    reader.readAsDataURL(file);
}

function changeFontSize(action) {
    const editor = document.getElementById('editor');
    let fontSize = window.getComputedStyle(editor).fontSize;
    fontSize = parseInt(fontSize);
    if (action === 'increase') {
        fontSize += 2;
    } else if (action === 'decrease') {
        fontSize -= 2;
    }
    editor.style.fontSize = fontSize + 'px';
}

function insertEmoji(emoji) {
    if (emoji) {
        execCommand('insertText', emoji);
        document.getElementById('emojiDropdown').selectedIndex = 0; // Reset the dropdown
    }
}
const editor = document.getElementById('editor');
const defaultText = editor.dataset.placeholder;

editor.addEventListener('input', () => {
    if (editor.textContent.trim() === '') {
      editor.innerHTML = `<p class="default-text">${defaultText}</p>`;
    } else {
      editor.querySelector('.default-text').remove();
    }
  });
  
editor.addEventListener('focus', () => {
    if (editor.textContent.trim() === '') {
      editor.innerHTML = `<p class="default-text">${defaultText}</p>`;
    } else {
      editor.querySelector('.default-text').remove();
    }
  })



