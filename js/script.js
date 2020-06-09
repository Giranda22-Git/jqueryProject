'use strict'

$(document).ready(function(){
    let
        desktop = $('.desktop'),
        folder = desktop.find('.file'),
        bgFolder = folder.find('.combat'),
        modal = $('.modal'),
        frontModal = modal.find('.front-modal'),
        close = $('.close'),
        actionModalArea = $('.area'),
        modalFolders = new Arr,
        checks = new Arr,
        arrowLeft = $('.arrow-left'),
        modalInfo = $('.modal-info'),
        modalInfoClose = modalInfo.find('.modal-info-close'),
        textarea = modalInfo.find('textarea'),
        modalInfoRight = modalInfo.find('.right-modal-info'),
        modalInfoTitle = modalInfo.find('.modal-info-top-text'),
        pathArrowRight = $('.path-arrow-right5'),
        pathPages = $('.path-pages')
    ;
    pathArrowRight.hide();

    let check = 0;

    folder.on('click', function(){
        check++;
        bgFolder.addClass("click-bg");
    })

    desktop.on('click', function(){
        check++;
        if(check != 2)
            bgFolder.removeClass("click-bg");
        check = 0;
    })

    close.on('click', function(){
        modal.hide();
    })

    folder.dblclick(function(){
        modal.show();
    });

    modalInfoClose.on('click', function(){
        modalInfo.hide();
    });

    list.on("change", function(event){
        if(event.type == "insert"){
            let length = list.length - 1;
            actionModalArea.append(`
                <div class="containers">
                    <div class="combat" id="page${length}">
                        <div class="top-container"></div>
                        <div class="bottom-container">
                            page${length + 1}
                        </div>
                    </div>
                </div>
            `)
            
            modalFolders.push($(`#page${length}`));
            checks.push(0);
            modalFolders[length].on('click', function(){
                checks[length]++;
                modalFolders[length].addClass("click-bg");
            })

            frontModal.append(`<div class="areaPage${length} areaPage"></div>`)
            let characters = frontModal.find(`.areaPage${length}`);
            for(let a = 0; a < event.items[0].results.length; a++)
            {
                characters.append(`
                    <div class="containers">
                        <div class="combat" id="character${event.items[0].results[a].id}">
                            <div class="top-page-container"></div>
                            <div class="bottom-page-container">
                                ${event.items[0].results[a].name}.info
                            </div>
                        </div>
                    </div>
                `)

                let character = characters.find(`#character${event.items[0].results[a].id}`);
                character.dblclick(function(){
                    modalInfoTitle.text(`${event.items[0].results[a].name}.info - Блокнот`);

                    textarea.val( `
        id: ${event.items[0].results[a].id}
        name: ${event.items[0].results[a].name}
        status: ${event.items[0].results[a].status}
        species: ${event.items[0].results[a].species}
        type: ${event.items[0].results[a].type}
        gender: ${event.items[0].results[a].gender}
        origin: 
            name: ${event.items[0].results[a].origin.name}
            url: ${event.items[0].results[a].origin.url}
        location: 
            name: ${event.items[0].results[a].location.name}
            url: ${event.items[0].results[a].location.url}
        first episode:
            ${event.items[0].results[a].episode[0]}
        url: ${event.items[0].results[a].url}
                    ` );
                    modalInfoRight.css('background', `url(${event.items[0].results[a].image}) center no-repeat`)
                    modalInfoRight.css('background-size', 'cover');
                    modalInfo.css('left', '50%');

                    modalInfo.show();
                })
            }

            modalFolders[length].dblclick(function(){
                actionModalArea.hide();
                characters.css("display", "grid");
                pathArrowRight.show();
                pathPages.text(`page${length + 1}`);
            })

            arrowLeft.on('click', function(){
                characters.hide();
                actionModalArea.css("display", "grid");
                pathArrowRight.hide();
                pathPages.text(``);
            })
        }
    })
    
    frontModal.on('click', function(){
        for(let i = 0; i < checks.length; i++)
        {
            checks[i]++;
            if(checks[i] != 2)
                modalFolders[i].removeClass("click-bg");
            checks[i] = 0;
        }
    })
    

})