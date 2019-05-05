$(document).ready(function () {

    $('.dropdown-regiones').append('<option value="1">Eastern</option>');
    $('.dropdown-regiones').append('<option value="2">Western</option>');
    $('.dropdown-regiones').append('<option value="3">Northern</option>');
    $('.dropdown-regiones').append('<option value="4">Southern</option>');

    //Cargar registros en tabla
    cargarTabla();
    deshabilitarBotones();


    
    //Cuando ingresamos un id.
    $("#inputId").change(function () {
        //Limpiart tabla
        if ($("#inputId").val() == "") {
            limpiarDescYRegion();
            deshabilitarBotones();            
        } else {
            getRegistroID($("#inputId").val());
        }
    })

    // click en boton insertar
    $("#boton-insertar").click(function () {         
        insertarTerritorio();        
        deshabilitarBotones();
        //aGREGAR SE AGREGO CORRECTAMENTE
    
    });

    //click en boton eliminar
    $("#boton-eliminar").click(function () { 
        eliminarRegistro();    

    });

    $("#boton-modificar").click(function(){
        actualizarRegistro();
    })
    
    

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
            agregarRegistroATabla(datas.TerritoryID,datas.TerritoryDescription,datas.RegionID,  ($('.dropdown-regiones').children("option:selected").text()) );            
            limpiarTodosInputs();         
 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })
}

//back end
function eliminarRegistro(){
    $.ajax({
        type: "POST",
        url: 'Handlers/EliminarRegistro.ashx',
        data: { id: $("#inputId").val() },
        dataType: "json",
        async: true,
        success: function (registro) {
            if(registro == "true"){                
                eliminarIdDeTabla($("#inputId").val());
                //MENSAJE SE ELIMINO CORRECTAMENTE
            }else{
                //MENSAJE NO SE PUDO ELIMINAR
            }
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
               
                $('select').val(registro.RegionId);
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
function actualizarRegistro(){
   
    $.ajax({
        type: "POST",
        url: 'Handlers/ModificarRegistro.ashx',
        data:{ id: $("#inputId").val(), descripcion: $("#inputDescripcion").val(),regionId:$('.dropdown-regiones').children("option:selected").val() },
        dataType: "json",
        
        async: true,
        success: function (datas) {   
            var tabla = $("#"+datas.TerritoryID+ "> td");
            tabla[1].innerText =  datas.TerritoryDescription;
            tabla[2].innerText = datas.RegionID;
            tabla[3].innerText = ($('.dropdown-regiones').children("option:selected").text());
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })
}



//funciones utilidades
function limpiarDescYRegion(){
        $("#inputDescripcion").val("");
        $('select').val(0);
        $("#inputDescripcion").attr("placeholder", "Descripcion").blur();
}

function limpiarTodosInputs(){
    limpiarDescYRegion();
    $("#inputId").val("");

}

function eliminarIdDeTabla(id){
    $("#"+id).remove();
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
    var registro = ("<tr id='"+id+"'><td>" + id + "</td><td>" + descripcion + "</td>   <td>" + region + "</td> <td>" + RegionDescription + "</td></tr>");
    $('table').append(registro);
 }
