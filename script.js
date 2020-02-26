//  APi Key ebb680cd


$('.keywords').on('input', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=ebb680cd&s=' + $('.keywords').val(),
        success: result => {
            const movie = result.Search;
            let card = '';
            movie.forEach(m => {
                card += movieCard(m);
            });

            $('.movie-container').html(card);

            // Ketika Detail di CLikc
            $('.tombolDetailAjax').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=ebb680cd&i=' + $(this).data('id'),
                    success: m => {
                        const detail = modalDetail(m);
                        $('.modal-body').html(detail);
                    },
                    error: e => {
                        console.log(e.responseText)
                    }

                })
            });
        },
        error: e => {
            console.log(e.responseText)
        }
    })
})


function movieCard(m) {
    return `<div class="col-md-4 my-4"> 
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" height="500px">
                <div class="card-body">
                  <h5 class="card-title"> ${m.Title} </h5>
                  <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                  <a href="#" class="btn btn-primary tombolDetailAjax" data-id="${m.imdbID}" data-toggle="modal" data-target="#movieDetail">Go somewhere</a>
                </div>
              </div>
            </div>`
}

function modalDetail(m) {
    return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"> <h4>${m.Title}</h4> (${m.Year}) </li>
              <li class="list-group-item"> <strong>Rated :</strong> ${m.Rated} </li>
              <li class="list-group-item"> <strong>Released : </strong> ${m.Released} </li>
              <li class="list-group-item"> <strong>Writer : </strong> ${m.Writer} </li>
              <li class="list-group-item"> <strong>Desc :</strong> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`
}