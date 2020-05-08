$(document).ready(function() {
    var APIkey = 'AIzaSyDKtnNSWonEdeut6hXJCLB06AM93Qr7Evg';
    var query = 'kpop';
    var URL = 'https://www.googleapis.com/youtube/v3/search';

    var options = { 
        part: 'snippet',
        key: APIkey,
        maxResults: 10,
        order: 'viewCount',
        q: query,
        safeSearch: 'none',
        type: 'video'
    }
    
    loadContents(); 

    function loadContents() {
        $.getJSON(URL, options, function(data) {
            var data = data;
            let id = data.items[0].id.videoId;
            featureVideo(id);
            results(data);
        })
    }

    function featureVideo(id) {
        $('#feature-video').html(` <h1>Featured Kpop Music Video</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `);
    }

    function results(data) {
        $('main').append(`<h1>Videos by popularity</h1>`)
        $.each(data.items, function(i, item) {
            let id = item.id.videoId;
            let title = item.snippet.title.substring(0,40);
            let desc = item.snippet.description.substring(0,50) + " ...";
            let date = item.snippet.publishedAt.substring(0,10);
            $('main').append(`
                <article class="item" data-key="${id}">
                    <iframe class="thumb" src="https://www.youtube.com/embed/${id}" 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${date}</p>
                        <p>${desc}</p>
                    </div>
                </article>
            `);
        });

        $('main').on('click', 'article', function() {
            let id = $(this).attr('data-key');
            featureVideo(id);
        })
    }
    
});