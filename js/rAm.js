'use strict'

let 
    apiLink = 'https://rickandmortyapi.com/api/character/',
    list = new Arr;
;

getData(apiLink);

function getData(link)
{
    jQuery.ajax({
        url: link,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
            list.push(resultData);
            if(resultData.info.next !== null)
                getData(resultData.info.next);
        }
    });
}
