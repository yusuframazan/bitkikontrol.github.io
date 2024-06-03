document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loadPage(this.getAttribute('data-page'));
        });
    });

    loadPage('home');
});

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            if (page === 'plants') {
                fetchPlantsPageData();
            }
        })
        .catch(error => console.error('Sayfa yüklenirken hata oluştu:', error));
}

function fetchPlantsPageData() {
    fetch('plants.json')
        .then(response => response.json())
        .then(data => {
            const plantsList = document.getElementById('plants-list');
            plantsList.innerHTML = '';
            data.forEach(plant => {
                const listItem = document.createElement('li');
                listItem.textContent = `${plant.name}: ${plant.description}`;
                plantsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Bitki verileri alınamadı:', error));
}
