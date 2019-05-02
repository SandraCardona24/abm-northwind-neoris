$(document).ready(function () {
    $('.dropdown-regiones').append('<option value="1">Eastern</option>');
    $('.dropdown-regiones').append('<option value="2">Western</option>');
    $('.dropdown-regiones').append('<option value="3">Northern</option>');
    $('.dropdown-regiones').append('<option value="4">Southern</option>');


    //Cargar registros en tabla
    $.ajax({
        type: "POST",
        url: 'GetTodosTerritories.ashx',
        data: null,
        contentType: "applicaton/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (registros) {
            for (var i = 0; i < registros.length; i++) {
                var registro =("<tr><td>" + registros[i].Id + "</td><td>" + registros[i].Description + "</td>   <td>" + registros[i].RegionId + "</td> <td>" + registros[i].RegionDescription + "</td></tr>");
                $('table').append(registro);
            }
        },
         error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
 
   
    });

});
