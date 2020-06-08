'use strict'

$(document).ready(function(){
    let
        searchArea = $('.search'),
        modalSearch = $('.modal-search'),
        modalSearchClose = $('.modal-search-close'),
        buttonCharacter = $('.first-type'),
        buttonLocation = $('.second-type'),
        buttonEpisode = $('.third-type'),
        filtersArea = $('.filters-area'),
        resultArea = $('.result-area'),
        result = new Arr,
        modalInfo = $('.modal-info'),
        modalInfoClose = modalInfo.find('.modal-info-close'),
        textarea = modalInfo.find('textarea'),
        modalInfoRight = modalInfo.find('.right-modal-info'),
        modalInfoTitle = modalInfo.find('.modal-info-top-text'),
        modalInfoLocation = $('.modal-info-location'),
        modalInfoLocationClose = modalInfoLocation.find('.modal-info-location-close'),
        textareaLocation = modalInfoLocation.find('.left-modal-info-location-textarea'),
        modalInfoLocationRight = modalInfoLocation.find('.right-modal-info-location-textarea'),
        modalInfoLocationTitle = modalInfoLocation.find('.modal-info-top-text-location'),
        modalInfoEpisode = $('.modal-info-episode'),
        modalInfoEpisodeClose = modalInfoEpisode.find('.modal-info-episode-close'),
        textareaEpisode = modalInfoEpisode.find('.left-modal-info-episode-textarea'),
        modalInfoEpisodeRight = modalInfoEpisode.find('.right-modal-info-episode-textarea'),
        modalInfoEpisodeTitle = modalInfoEpisode.find('.modal-info-top-text-episode')
    ;

    modalInfoEpisodeClose.on('click', function(){
        modalInfoEpisode.hide();
    })

    modalInfoLocationClose.on('click', function(){
        modalInfoLocation.hide();
    })

    function getSearchData(link){
        jQuery.ajax({
            url: link,
            type: "GET",
    
            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                result.push(resultData);
            }
        });
    }

    modalInfoClose.on('click', function(){
        modalInfo.hide();
    })

    buttonCharacter.on('click', function(){
        if(buttonCharacter.hasClass("location")) return;
        buttonCharacter.addClass("location");
        buttonLocation.removeClass("location");
        buttonEpisode.removeClass("location");
        filtersArea.animate( { height: "70%" }, 500 );
        resultArea.animate( { height: "80%" }, 500 );
        searchArea.attr("placeholder", "    Name = rick, Species, Type");
        filtersArea.show();
    })

    buttonLocation.on('click', function(){
        if(buttonLocation.hasClass("location")) return;
        buttonLocation.addClass("location");
        buttonEpisode.removeClass("location");
        buttonCharacter.removeClass("location");
        filtersArea.animate( { height: "0" }, 500 );
        resultArea.animate( { height: "95%" }, 500 );
        searchArea.attr("placeholder", "    Name = rick, Type, Dimension");
        filtersArea.hide();
    })

    buttonEpisode.on('click', function(){
        if(buttonEpisode.hasClass("location")) return;
        buttonEpisode.addClass("location");
        buttonLocation.removeClass("location");
        buttonCharacter.removeClass("location");
        filtersArea.animate( { height: "0" }, 500 );
        resultArea.animate( { height: "95%" }, 500 );
        searchArea.attr("placeholder", "    Name = rick, Episode");
        filtersArea.hide();
    })

    searchArea.focus(function(){
        searchArea.attr("placeholder", "    Name = rick, Species, Type");
        modalSearch.show();
    })

    modalSearchClose.on('click', function(){
        searchArea.attr("placeholder", "Введите здесь свой текст для поиска");
        modalSearch.hide();
    })

    result.on('change', function(event){
        if(event.length != 0 && event.type == 'insert'){
            if(buttonCharacter.hasClass("location")){
                for(let s = 0; s < event.items[0].results.length; s++)
                {
                    resultArea.append(`
                        <div class="character-box item${event.items[0].results[s].id}">
                            <div class="image-character"></div>
                            <div class="stats-character">
                                <div class="name-char"> Name:    ${event.items[0].results[s].name}</div>
                                <div class="gender-char"> Gender:   ${event.items[0].results[s].gender}</div>
                                <div class="status-char"> Status:   ${event.items[0].results[s].status}</div>
                                <div class="species-char"> Species:    ${event.items[0].results[s].species}</div>
                            </div>
                        </div>
                    `)

                    let box = resultArea.find(`.item${event.items[0].results[s].id}`);
                    let boxImage = box.find('.image-character');
                    boxImage.css('background', `url(${event.items[0].results[s].image})`);
                    boxImage.css('background-size', 'cover');

                    box.on('click',function(){
                        modalInfoTitle.text(`${event.items[0].results[s].name}.info - Блокнот`);

                        textarea.val( `
            id: ${event.items[0].results[s].id}
            name: ${event.items[0].results[s].name}
            status: ${event.items[0].results[s].status}
            species: ${event.items[0].results[s].species}
            type: ${event.items[0].results[s].type}
            gender: ${event.items[0].results[s].gender}
            origin: 
                name: ${event.items[0].results[s].origin.name}
                url: ${event.items[0].results[s].origin.url}
            location: 
                name: ${event.items[0].results[s].location.name}
                url: ${event.items[0].results[s].location.url}
            first episode:
                ${event.items[0].results[s].episode[0]}
            url: ${event.items[0].results[s].url}
                        ` );
                        modalInfoRight.css('background', `url(${event.items[0].results[s].image}) center no-repeat`)
                        modalInfoRight.css('background-size', 'cover');
                        modalInfo.css('left', '70%')
    
                        modalInfo.show();
                    })
                }
            }
            else if(buttonLocation.hasClass("location")){
                for(let s = 0; s < event.items[0].results.length; s++)
                {
                    resultArea.append(`
                        <div class="location-box item${event.items[0].results[s].id}">
                            <div class="id-location"> id:    ${event.items[0].results[s].id}</div>
                            <div class="name-location"> Name:    ${event.items[0].results[s].name}</div>
                        </div>
                    `)

                    let box = resultArea.find(`.item${event.items[0].results[s].id}`);

                    box.on('click', function(){
                        modalInfoLocationTitle.text(`${event.items[0].results[s].name}.info - Блокнот`);

                        textareaLocation.val(`
        id: ${event.items[0].results[s].id}
        name: ${event.items[0].results[s].name}
        type: ${event.items[0].results[s].type}
        dimension ${event.items[0].results[s].dimension}
        url: ${event.items[0].results[s].url}
                        `)

                        let arrResidents = new Arr;
                        for(let j = 0; j < event.items[0].results[s].residents.length; j++)
                            arrResidents.push(event.items[0].results[s].residents[j]);
                        let arrResidentsCopy = arrResidents.join('\n')
                        modalInfoLocationRight.val(`
Residents: 
    ${arrResidentsCopy}
                        `)
                        modalInfoLocation.show();
                    })
                }
            }
            else if(buttonEpisode.hasClass("location")){
                for(let s = 0; s < event.items[0].results.length; s++)
                {
                    resultArea.append(`
                        <div class="episode-box item${event.items[0].results[s].id}">
                            <div class="id-episode"> id:    ${event.items[0].results[s].id}</div>
                            <div class="name-episode"> Name:    ${event.items[0].results[s].name}</div>
                        </div>
                    `)

                    let box = resultArea.find(`.item${event.items[0].results[s].id}`);

                    box.on('click', function(){
                        modalInfoEpisodeTitle.text(`${event.items[0].results[s].name}.info - Блокнот`);

                        textareaEpisode.val(`
        id: ${event.items[0].results[s].id}
        name: ${event.items[0].results[s].name}
        air_date: ${event.items[0].results[s].air_date}
        episode: ${event.items[0].results[s].episode}
        url: ${event.items[0].results[s].url}
                        `);

                        let arrCharacters = new Arr;
                        for(let j = 0; j < event.items[0].results[s].characters.length; j++)
                            arrCharacters.push(event.items[0].results[s].characters[j]);
                        let arrCharactersCopy = arrCharacters.join('\n')
                        modalInfoEpisodeRight.val(`
characters: 
    ${arrCharactersCopy}
                        `)
                        modalInfoEpisode.show();

                    })
                }
            }

            if(event.items[0].info.next !== null)
                getSearchData(event.items[0].info.next);
        }
    })

    searchArea.keypress(function(e) {
        if (e.which == 13) {
            let
                reqArr = searchArea.val().split(',').join('&').replace(/ /g, ""),
                query = ""
            ;
            resultArea.empty();
            result.remove();
            
            if(buttonCharacter.hasClass("location")){
                let 
                    status = $('input[name=status]:checked').val(),
                    gender = $('input[name=gender]:checked').val()
                ;
                query = `https://rickandmortyapi.com/api/character/?status=${status}&gender=${gender}&${reqArr}`
            }
            else if(buttonLocation.hasClass("location")){
                query = `https://rickandmortyapi.com/api/location/?${reqArr}`;
            }
            else if(buttonEpisode.hasClass("location"))
                query = `https://rickandmortyapi.com/api/episode/?${reqArr}`;

            getSearchData(query);
        }
        
   });
});

