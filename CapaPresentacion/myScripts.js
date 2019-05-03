$(document).ready(function () {
    $('.dropdown-regiones').append('<option value="1">Eastern</option>');
    $('.dropdown-regiones').append('<option value="2">Western</option>');
    $('.dropdown-regiones').append('<option value="3">Northern</option>');
    $('.dropdown-regiones').append('<option value="4">Southern</option>');

    //Cargar registros en tabla
    cargarTabla();

    $("#inputId").change(function () {
        if ($("#inputId").val() == "") {
            $("#inputDescripcion").val("");
            $('select>option:eq(0)').attr('selected', true);
        } else {
            getRegistroID($("#inputId").val());
        }

    })


});

function getRegistroID() {
    $.ajax({
        type: "POST",
        url: 'Handlers/getRegistroID.ashx',
        data: { id: $("#inputId").val() },
        dataType: "json",
        async: true,
        success: function (registro) {
            if (registro.RegionId == -1) {
                $("#inputDescripcion").attr("placeholder", "Este id no existe, puedes crearlo si lo deseas").blur();
            } else {
                
                $("#inputDescripcion").val(registro.Description);
                $('select>option:eq(' + registro.RegionId + ')').attr('selected', true);
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })

}
function cargarTabla() {
    $.ajax({
        type: "POST",
        url: 'Handlers/GetTodosTerritories.ashx',
        data: null,
        contentType: "applicaton/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (registros) {
            for (var i = 0; i < registros.length; i++) {
                var registro = ("<tr><td>" + registros[i].Id + "</td><td>" + registros[i].Description + "</td>   <td>" + registros[i].RegionId + "</td> <td>" + registros[i].RegionDescription + "</td></tr>");
                $('table').append(registro);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }


    });
}