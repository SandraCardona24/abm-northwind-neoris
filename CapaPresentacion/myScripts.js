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
        insertarTerritorio();        
        deshabilitarBotones();
        //aGREGAR SE AGREGO CORRECTAMENTE
    
    });
    

});

//AJAX
function insertarTerritorio(){
    
    $.ajax({
        type: "POST",
        url: 'Handlers/InsertarTerritorio.ashx',
        data:{ id: $("#inputId").val(), descripcion: $("#inputDescripcion").val(),regionId:$('.dropdown-regiones').children("option:selected").val() },
        dataType: "json",
        
        async: true,
        success: function (datas) {     
           
            var id = ($("#inputId").val())
            var descripcion  =($("#inputDescripcion").val())
            var regionId = ($('.dropdown-regiones').children("option:selected").val())
            var RegionDescription = ($('.dropdown-regiones').children("option:selected").text())

            agregarRegistroATabla(id,descripcion,regionId,RegionDescription);
            $("#inputId").val(" ");
            limpiarInputs();
           
            

            
            //cargarTabla();
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
                
                agregarRegistroATabla(registros[i].Id,registros[i].Description, registros[i].RegionId, registros[i].RegionDescription);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }


    });
}


//funciones
function limpiarInputs(){
        $("#inputDescripcion").val("");
        $('select').val(0);
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

 function agregarRegistroATabla(id,descripcion,region,RegionDescription){
    var registro = ("<tr><td>" + id + "</td><td>" + descripcion + "</td>   <td>" + region + "</td> <td>" + RegionDescription + "</td></tr>");
    $('table').append(registro);
 }
