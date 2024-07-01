const botaoAdd = document.getElementById('btn-add');
const botaoLimpar = document.getElementById('btn-limpar');

function carregarLista() {
    const lista = document.getElementById('item-lista');

    lista.innerHTML = "";

    const listaStorage = JSON.parse(localStorage.getItem('lista-storage')) || [];

    listaStorage.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item; 
        lista.appendChild(li);
    });
}

function addItem() {
    const addInteresse = document.getElementById('input-lista');
    const novoInteresse = addInteresse.value.trim();

    if (novoInteresse) {
        const listaStorage = JSON.parse(localStorage.getItem('lista-storage')) || [];

        listaStorage.push(novoInteresse);
        localStorage.setItem('lista-storage', JSON.stringify(listaStorage));

        addInteresse.value = "";

        carregarLista();
    } else {
        alert("Digite um interesse para adiconar na lista.");
    }
}

function limparLista() {
    localStorage.removeItem('lista-storage');
    carregarLista();
}

async function noticias() {
    const apiNoticia = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?de=09-27-2017');
    const noticia = await apiNoticia.json();
    
    const novaNoticia = noticia.items[0];
    
    const respostaApi = document.getElementById('titulo-noticia');
    respostaApi.innerHTML = novaNoticia.titulo;
    
    const linkNoticia = document.getElementById('noticiaLink');
    linkNoticia.href = novaNoticia.link;

    return noticia;
}
noticias();

botaoAdd.addEventListener('click', addItem);
botaoLimpar.addEventListener('click', limparLista);

setInterval(carregarLista, 1000);