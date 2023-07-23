let data = null;

const escapeString = (string) => {
    const symbols = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
    }

    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag;
    })
}

const renderNews = (categoryId) => {
    fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
        .then(response => response.json())
        .then((responseData) => {
            data = responseData;

            const mainNews = data.items.slice(1, 4);
            const mainNewsContainer = document.querySelector('.articles__big-column');

            mainNews.forEach((item) => {
                const categoryData = data.categories.find((categoryItem) => categoryItem.id === item.category_id);
                const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
            
                const article = document.createElement('article');
                article.classList.add('main-article');
                article.innerHTML = `
                    <div class="main-article__image-container">
                        <img class="main-article__image" src="${encodeURI(item.image)}" alt="newsfeed_img_1">
                    </div>
                    <div class="main-article__content">
                        <span class="article-category main-article__category">${escapeString(categoryData.name)}</span>
                        <h2 class="main-article__title">${escapeString(item.title)}</h2>
                        <p class="main-article__text">${escapeString(item.description)}</p>
                        <span class="article-source main-article__source">${escapeString(sourceData.name)}</span>
                    </div>
                `;
                mainNewsContainer.appendChild(article);
            });

            const smallNews = data.items.slice(3, 12);
            const smallNewsContainer = document.querySelector('.articles__small-column');
            
            smallNews.forEach((item) => {
                const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
                const dateData = new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
            
                const article = document.createElement('article');
                article.classList.add('small-article');
                article.innerHTML = `
                    <h2 class="small-article__title">${escapeString(item.title)}</h2>
                    <p class="small-article__caption">
                        <span class="article-date small-article__date">${dateData}</span>
                        <span class="article-source small-article__source">${escapeString(sourceData.name)}</span>
                    </p>
                `;
            
                smallNewsContainer.appendChild(article);
            });
        })
}