document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML = ''; // Vider le HTML existant

            data.forEach(work => {
                const figure = document.createElement('figure');
                figure.innerHTML = `
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                `;
                gallery.appendChild(figure);
            });

            // Ajout des filtres
            const filtersContainer = document.getElementById('category-filters');
            filtersContainer.classList.add('filters');
            const categories = new Set(data.map(work => work.category.name));
            filtersContainer.innerHTML = '<button data-category="all" class="filters-design filter-active filter-all">Tous</button>';
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.dataset.category = category;
                button.classList.add('filters-design');
                filtersContainer.appendChild(button);
            });

            // Ajout de l'événement de filtre
            filtersContainer.addEventListener('click', event => {
                if (event.target.tagName === 'BUTTON') {
                    const category = event.target.dataset.category;

                    // Retirer la classe active de tous les boutons
                    document.querySelectorAll('#category-filters button').forEach(button => button.classList.remove('filter-active'));

                    // Ajouter la classe active au bouton cliqué
                    event.target.classList.add('filter-active');

                    displayWorks(category);
                }
            });

            // Fonction pour afficher les travaux en fonction du filtre
            function displayWorks(category) {
                gallery.innerHTML = '';
                const filteredWorks = category === 'all' ? data : data.filter(work => work.category.name === category);
                filteredWorks.forEach(work => {
                    const figure = document.createElement('figure');
                    figure.innerHTML = `
                        <img src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    `;
                    gallery.appendChild(figure);
                });
            }

            displayWorks('all'); // Affiche tous les travaux initialement
        })
        .catch(error => console.error('Error:', error));
});
