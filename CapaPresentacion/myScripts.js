﻿$(document).ready(function () {    
    //Cargando las regiones
    $('.dropdown-regiones').append('<option value="1">Eastern</option>');
    $('.dropdown-regiones').append('<option value="2">Western</option>');
    $('.dropdown-regiones').append('<option value="3">Northern</option>');
    $('.dropdown-regiones').append('<option value="4">Southern</option>');

    //Cargar registros en tabla
    cargarTabla();
    deshabilitarBotones();
    crearTablaAuxiliar();
    $("#tabla-auxiliar").hide();
    $("#boton-volver").hide();
    $(".progress").hide();
    $(".neoris-imagen").fadeIn(1500);
    
    
   
    
    //Si realizamos busqueda por  id.
    $("#inputId").change(function () {     
        $("#mensaje").fadeTo('medium', 0);
             
        if ($("#inputId").val() == "") {
            cambiarTablaAuxiliarAPrincipal(); //Por si estaba parado en la tabla auxiliar;
            limpiarDescYRegion();
            deshabilitarBotones();            
        } else {
            getRegistroID($("#inputId").val());
        }       
    })

    // click en boton insertar
    $("#boton-insertar").click(function () {  
        if ($('.dropdown-regiones').children("option:selected").val() == 0 || $("#inputDescripcion").val() == ""){
            cambiarMensajeYMostrar("Faltan ingresar datos");
            return;
        }
        insertarTerritorio();   
        cambiarTablaAuxiliarAPrincipal(); 
        
        
    });

    //click en boton eliminar
    $("#boton-eliminar").click(function () { 
        eliminarRegistro();   
        cambiarTablaAuxiliarAPrincipal();
        $("#boton-volver").hide();
        
    });

    //Click en modificar
    $("#boton-modificar").click(function(){
        if ($('.dropdown-regiones').children("option:selected").val() == 0 || $("#inputDescripcion").val() == ""){
            cambiarMensajeYMostrar("Faltan ingresar datos");
            return;
        }
        actualizarRegistro();
        deshabilitarBotones();  
        cambiarTablaAuxiliarAPrincipal();  
        $("#boton-volver").hide();      
    }) 
  

  


   //Buscar por description
     $("#inputDescripcion").change(function () {     
             
        $("#mensaje").fadeTo('medium', 0);
        if ($("#inputId").val() == ""  && $("#inputDescripcion").val() == "" ) { //Si borran los inputs vuelve a la tabla principal
            cambiarTablaAuxiliarAPrincipal();
            $("#boton-volver").hide();   
        }
        else if ($("#inputId").val() == "" ) {                       
            
            cargarTablaPorDescripcion();
            $("#tabla-auxiliar").show();
            $(".tabla-principal").hide();
            $("#boton-volver").toggle(); 
            cambiarMensajeYMostrar("Borra los campos o clickear en volver para ir a la tabla principal")

        }       
    })

   

    //Buscar por region
    $('.dropdown-regiones').change(function(){
        if ($("#inputId").val() == ""  && $("#inputDescripcion").val() == "" ) {
            cargarTablaPorRegion();
            $("#tabla-auxiliar").show();
            $(".tabla-principal").hide();
            $("#boton-volver").show(); 
            cambiarMensajeYMostrar("Clickea en volver para ir a la tabla principal")
        }
    })
    //Volver a la tabla principal
    $("#boton-volver").click(function(){
        cambiarTablaAuxiliarAPrincipal();
        $("#boton-volver").toggle();
        limpiarTodosInputs();
    })

      //Seleccionar elemento de la tabla
   $("table tbody").on('click','#boton-seleccionar', function(){     
        $(window).scrollTop(0);
        var row = $(this).closest("tr");   //Agarro fila
        var text = row.find("#id").text();       

        $("#inputId").val(row.find("td:eq(0)").text());      
        $("#inputDescripcion").val(row.find("td:eq(1)").text().trim());
        $('select').val(row.find("td:eq(2)").text());
        habilitarBotonesModifElim();
    });

    //Volver al inicio cuando llegaste al fin
    $(".boton-inicio").click(function(){    
        $(window).scrollTop(0);
        $(".neoris-imagen").hide();
        $(".neoris-imagen").fadeIn(1500);
    })

       

});

//---------FUNCIONES AJAX--------
function insertarTerritorio(){
    
    $.ajax({
        type: "POST",
        url: 'Handlers/InsertarTerritorio.ashx',
        data:{ id: $("#inputId").val(), descripcion: $("#inputDescripcion").val(),regionId:$('.dropdown-regiones').children("option:selected").val() },
        dataType: "json",        
        async: true,
        success: function (datas) {   
            cargarBarra();
            setTimeout(function(){ 
                agregarRegistroATabla(datas.TerritoryID,datas.TerritoryDescription,datas.RegionID, ($('.dropdown-regiones').children("option:selected").text()), $(".tabla-principal") );            
                limpiarTodosInputs();    
                deshabilitarBotones();                
                cambiarMensajeYMostrar("Se inserto correctamente");   
            }, 1000);  
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })
}
function eliminarRegistro(){
    $.ajax({
        type: "POST",
        url: 'Handlers/EliminarRegistro.ashx',
        data: { id: $("#inputId").val() },
        dataType: "json",
        async: true,
        success: function (registro) {
            cargarBarra();
            setTimeout(function(){   
                if(registro == "true"){                
                    eliminarIdDeTabla($("#inputId").val());
                    cambiarMensajeYMostrar("Se elimino correctamente");
                }else{
                    cambiarMensajeYMostrar("No se puede eliminar el registro, tiene un employee asociado");
                }
                limpiarTodosInputs();
                deshabilitarBotones();
            }, 1000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    })
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
            cargarBarra();
            setTimeout(function(){            
                cambiarMensajeYMostrar("Se actualizo correctamente");
                limpiarTodosInputs();
                deshabilitarBotones();
            }, 1000);
            
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
                agregarRegistroATabla(registros[i].Id,registros[i].Description, registros[i].RegionId, registros[i].RegionDescription,$(".tabla-principal"));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }


    });
}
function cargarTablaPorDescripcion() {
    $.ajax({
        type: "POST",
        url: 'Handlers/GetTerritoriesDescripcion.ashx',
        data: {descripcion:  $("#inputDescripcion").val()}, 
               
        dataType: "json",
        async: true,
        success: function (registros) {        
            for (var i = 0; i < registros.length; i++) {               
                agregarRegistroATabla(registros[i].Id,registros[i].Description, registros[i].RegionId, registros[i].RegionDescription,$("#tabla-auxiliar>table"));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }


    });
}
function cargarTablaPorRegion(){
   
    $.ajax({
        type: "POST",
        url: 'Handlers/GetTerritoriesRegion.ashx',
        data: { region: $('.dropdown-regiones').children("option:selected").val()},                
        dataType: "json",
        async: true,
        success: function (registros) {        
            for (var i = 0; i < registros.length; i++) {               
                agregarRegistroATabla(registros[i].Id,registros[i].Description, registros[i].RegionId, registros[i].RegionDescription,$("#tabla-auxiliar>table"));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error.Message);
        }
    });
}





//---------FUNCIONES UTILIDADES----------
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

 function agregarRegistroATabla(id,descripcion,region,RegionDescription,tabla){
     var smallButton = ' <button type="button" id="boton-seleccionar" class="btn btn-secondary btn-sm">Seleccionar</button>'
    var registro = ("<tr id='"+id+"'><td>" + id + "</td><td>" + descripcion + "</td>   <td>" + region + "</td> <td>" + RegionDescription + "</td> <td>"+ smallButton+" </td></tr>");
    tabla.append(registro);
 }

 function cambiarMensajeYMostrar(mensaje){
    $("#mensaje").text(mensaje);
    $("#mensaje").fadeTo('medium',1 );
    setTimeout(function() {
        $("#mensaje").fadeTo('medium',0 );
    }, 2000);    
}
 

function crearTablaAuxiliar(){
    $("#tabla-auxiliar").append("<table class='table'><thead class='thead-dark'><tr>"+             
    "<th scope='col'>Id</th>"+
    "<th scope='col'>Descripcion</th>"+
    "<th scope='col'>Region ID</th>"+
    "<th scope='col'>Region Description</th>"+
    "<th scope='col'>Seleccionar</th></tr></thead><tbody> </tbody></table>");
}
    
function cambiarTablaAuxiliarAPrincipal(){
    $('#tabla-auxiliar tbody').empty();
    $("#tabla-auxiliar").hide();    
    $(".tabla-principal").show(); 
}

function cargarBarra(){
    $(".progress").show();
    $(".progress-bar").css("width", "100%");
    setTimeout(function(){
        $(".progress").hide();
        $(".progress-bar").css("width", "0%");
    }, 1000);
   
}