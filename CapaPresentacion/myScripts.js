$(document).ready(function () {
    $('.dropdown-regiones').append('<option value="1">Eastern</option>');
    $('.dropdown-regiones').append('<option value="2">Western</option>');
    $('.dropdown-regiones').append('<option value="3">Northern</option>');
    $('.dropdown-regiones').append('<option value="4">Southern</option>');

    //Cargar registros en tabla
    cargarTabla();
    deshabilitarBotones();


    
    //input id.
    $("#inputId").change(function () {
        //Limpiart tabla
        if ($("#inputId").val() == "") {
            limpiarInputs();
            deshabilitarBotones();            
        } else {
            getRegistroID($("#inputId").val());
        }

    })

    //boton insertar
    $("#boton-insertar").click(function () { 
        alert("Alertaa")
        insertarTerritorio();
        
        
    });
    

});


function insertarTerritorio(){
    
    $.ajax({
        type: "POST",
        url: 'Handlers/InsertarTerritorio.ashx',
        data:{ id: $("#inputId").val(), descripcion: $("#inputDescripcion").val(),regionId:$('.dropdown-regiones').children("option:selected").val()},
        dataType: "json",
        async: true,
        success: function () {           
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })
}

function getRegistroID() {
    $.ajax({
        type: "POST",
        url: 'Handlers/getRegistroID.ashx',
        data: { id: $("#inputId").val() },
        dataType: "json",
        async: true,
        success: function (registro) {

            if (registro.RegionId == -1) {  /*Si el id no existe */          
                $("#inputDescripcion").val("");
                /**Por si ingreso un id valido, borro y volvio a escribir otro  sin hacer post. */
                deshabilitarBotones();
                $("#boton-insertar").attr("disabled",false);
            } else {                
                $("#inputDescripcion").val(registro.Description);
                $('select>option:eq(' + registro.RegionId + ')').attr('selected', true);
                habilitarBotonesModifElim();
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

function limpiarInputs(){

        $("#inputDescripcion").val("");
        $('select>option:eq(0)').attr('selected', true);
        $("#inputDescripcion").attr("placeholder", "Descripcion").blur();
}

function deshabilitarBotones(){
   $("#boton-insertar").attr("disabled",true);
   $("#boton-modificar").attr("disabled",true);
   $("#boton-eliminar").attr("disabled",true);
}

function habilitarBotonesModifElim() { 
    $("#boton-modificar").attr("disabled",false);
    $("#boton-eliminar").attr("disabled",false);
 }