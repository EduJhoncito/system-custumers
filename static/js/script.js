document.addEventListener("DOMContentLoaded", init);
const URL_API = 'http://127.0.0.1:3001/api/'

var customers = []

function init(){
        search()
}

function agregar(){
    clean()
    abrirFormulario()
}

async function search(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();
    var html =''

        for(customer of customers){
            var row = `<tr>
            <td>${customer.nombre}</td>
            <td>${customer.apellido}</td>
            <td>${customer.telefono}</td>
            <td>${customer.tipo_evento}</td>
            <td>${customer.dia_evento}</td>
            <td>${customer.mes_evento}</td>
            <td>${customer.direccion_casa}</td>
            <td>${customer.direccion_evento}</td>
            <td>${customer.dia_cumpleaños}</td>
            <td>${customer.mes_cumpleaños}</td>
            <td>${customer.observaciones}</td>
            <td>${customer.correo_electronico}</td>
            <td>
                <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
            </td>
          </tr>`
          html = html + row;
        }

   document.querySelector('#customers > tbody').outerHTML=html
}

async function remove(id){
    respuesta = confirm('¿Está seguro de eliminarlo?')
    if(respuesta){
        var url= URL_API + 'customers/' + id
        await fetch(url, {
            "method": 'DELETE',
            "headers": {
                "Content-Type": 'application/json'
            }
        })
        window.location.reload();
    }
}

function clean(){
    document.getElementById('txtNombre').value=''
    document.getElementById('txtApellido').value=''
    document.getElementById('txtTelefono').value=''
    document.getElementById('txtTipo_evento').value=''
    document.getElementById('txtDia_evento').value=''
    document.getElementById('txtMes_evento').value=''
    document.getElementById('txtDireccion_casa').value=''
    document.getElementById('txtDireccion_evento').value=''
    document.getElementById('txtDia_cumpleaños').value=''
    document.getElementById('txtMes_cumpleaños').value=''
    document.getElementById('txtObservaciones').value=''
    document.getElementById('txtCorreo_electronico').value=''
}

async function save(){

    var data = {
    "nombre":document.getElementById('txtNombre').value,
    "apellido":document.getElementById('txtApellido').value,
    "telefono":document.getElementById('txtTelefono').value,
    "tipo_evento":document.getElementById('txtTipo_evento').value,
    "dia_evento":document.getElementById('txtDia_evento').value,
    "mes_evento":document.getElementById('txtMes_evento').value,
    "direccion_casa":document.getElementById('txtDireccion_casa').value,
    "direccion_evento":document.getElementById('txtDireccion_evento').value,
    "dia_cumpleaños":document.getElementById('txtDia_cumpleaños').value,
    "mes_cumpleaños":document.getElementById('txtMes_cumpleaños').value,
    "observaciones":document.getElementById('txtObservaciones').value,
    "correo_electronico":document.getElementById('txtCorreo_electronico').value
    }

    var id=document.getElementById('txtId').value
    if(id != ''){
        data.id=id
    }

    var url= URL_API + 'customers'
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(data),
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    window.location.reload();
}


function abrirFormulario(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale opened");
}

function cerrarModal(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale");
}

function edit(id){
    abrirFormulario()
    var customer = customers.find(x => x.id == id)
    document.getElementById('txtId').value=customer.id
    document.getElementById('txtNombre').value=customer.nombre
    document.getElementById('txtApellido').value=customer.apellido
    document.getElementById('txtTelefono').value=customer.telefono
    document.getElementById('txtTipo_evento').value=customer.tipo_evento
    document.getElementById('txtDia_evento').value=customer.dia_evento
    document.getElementById('txtMes_evento').value=customer.mes_evento
    document.getElementById('txtDireccion_casa').value=customer.direccion_casa
    document.getElementById('txtDireccion_evento').value=customer.direccion_evento
    document.getElementById('txtDia_cumpleaños').value=customer.dia_cumpleaños
    document.getElementById('txtMes_cumpleaños').value=customer.mes_cumpleaños
    document.getElementById('txtObservaciones').value=customer.observaciones
    document.getElementById('txtCorreo_electronico').value=customer.correo_electronico
}

function filtroNombre(){
    htmlModal = document.getElementById("modal_name");
    htmlModal.setAttribute("class", "modale_name opened");
}

function cerrarModalNombre(){
    htmlModal = document.getElementById("modal_name");
    htmlModal.setAttribute("class", "modale_name");
}

function filtroTipoEvento(){
    htmlModal = document.getElementById("modal_event_type");
    htmlModal.setAttribute("class", "modale_event_type opened");
}

function cerrarModalTipoEvento(){
    htmlModal = document.getElementById("modal_event_type");
    htmlModal.setAttribute("class", "modale_event_type");
}


function filtroMesEvento(){
    htmlModal = document.getElementById("modal_event_date");
    htmlModal.setAttribute("class", "modale_event_date opened");
}

function cerrarModalEventoFecha(){
    htmlModal = document.getElementById("modal_event_date");
    htmlModal.setAttribute("class", "modale_event_date");
}


function filtroMesCumpleanos(){
    htmlModal = document.getElementById("modal_event_birthday");
    htmlModal.setAttribute("class", "modale_event_birthday opened");
}

function cerrarModalCumpleanofecha(){
    htmlModal = document.getElementById("modal_event_birthday");
    htmlModal.setAttribute("class", "modale_event_birthday");
}

function filtroUbicacionEvento(){
    htmlModal = document.getElementById("modal_location_events");
    htmlModal.setAttribute("class", "modale_location_events opened");
}

function cerrarModalEventoUbicacion(){
    htmlModal = document.getElementById("modal_location_events");
    htmlModal.setAttribute("class", "modale_location_events");
}

async function saveNombre(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

        for(customer of customers){
            if( customer.nombre == document.getElementById("txtFiltroNombre").value){
                filtrarNombre(customer.nombre)
            }
        }
}

async function filtrarNombre(nombre){
 var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

  var filtro = customers.find(x => x.nombre == nombre)

    customers = await response.json();
    var html =''

        for(customer of customers){
            if(customer.nombre == filtro.nombre){
                var row = `<tr>
                <td>${customer.nombre}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                <td>${customer.tipo_evento}</td>
                <td>${customer.dia_evento}</td>
                <td>${customer.mes_evento}</td>
                <td>${customer.direccion_casa}</td>
                <td>${customer.direccion_evento}</td>
                <td>${customer.dia_cumpleaños}</td>
                <td>${customer.mes_cumpleaños}</td>
                <td>${customer.observaciones}</td>
                <td>${customer.correo_electronico}</td>
                <td>
                    <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                    <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
                </td>
              </tr>`
              html = html + row;
            }

        }

   document.querySelector('#customers > tbody').outerHTML=html


}




async function saveTipoEvento(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

        for(customer of customers){
            if( customer.tipo_evento == document.getElementById("txtFiltroEventoTipo").value){
                filtrarTipoEvento(customer.tipo_evento)
            }
        }
}

async function filtrarTipoEvento(tipo_evento){
 var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

  var filtro = customers.find(x => x.tipo_evento == tipo_evento)

    customers = await response.json();
    var html =''

        for(customer of customers){
            if(customer.tipo_evento == filtro.tipo_evento){
                var row = `<tr>
                <td>${customer.nombre}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                <td>${customer.tipo_evento}</td>
                <td>${customer.dia_evento}</td>
                <td>${customer.mes_evento}</td>
                <td>${customer.direccion_casa}</td>
                <td>${customer.direccion_evento}</td>
                <td>${customer.dia_cumpleaños}</td>
                <td>${customer.mes_cumpleaños}</td>
                <td>${customer.observaciones}</td>
                <td>${customer.correo_electronico}</td>
                <td>
                    <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                    <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
                </td>
              </tr>`
              html = html + row;
            }

        }

   document.querySelector('#customers > tbody').outerHTML=html


}




async function saveEventoFecha(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

        for(customer of customers){
            if( customer.mes_evento == document.getElementById("txtFiltroEventoFecha").value){
                filtrarFechaEvento(customer.mes_evento)
            }
        }
}

async function filtrarFechaEvento(mes_evento){
 var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

  var filtro = customers.find(x => x.mes_evento == mes_evento)

    customers = await response.json();
    var html =''

        for(customer of customers){
            if(customer.mes_evento == filtro.mes_evento){
                var row = `<tr>
                <td>${customer.nombre}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                <td>${customer.tipo_evento}</td>
                <td>${customer.dia_evento}</td>
                <td>${customer.mes_evento}</td>
                <td>${customer.direccion_casa}</td>
                <td>${customer.direccion_evento}</td>
                <td>${customer.dia_cumpleaños}</td>
                <td>${customer.mes_cumpleaños}</td>
                <td>${customer.observaciones}</td>
                <td>${customer.correo_electronico}</td>
                <td>
                    <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                    <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
                </td>
              </tr>`
              html = html + row;
            }

        }

   document.querySelector('#customers > tbody').outerHTML=html


}




async function saveCumpleanoFecha(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

        for(customer of customers){
            if( customer.mes_cumpleaños == document.getElementById("txtFiltroCumpleanoFecha").value){
                filtrarFechaCumpleano(customer.mes_cumpleaños)
            }
        }
}

async function filtrarFechaCumpleano(mes_cumpleaños){
 var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

  var filtro = customers.find(x => x.mes_cumpleaños == mes_cumpleaños)

    customers = await response.json();
    var html =''

        for(customer of customers){
            if(customer.mes_cumpleaños == filtro.mes_cumpleaños){
                var row = `<tr>
                <td>${customer.nombre}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                <td>${customer.tipo_evento}</td>
                <td>${customer.dia_evento}</td>
                <td>${customer.mes_evento}</td>
                <td>${customer.direccion_casa}</td>
                <td>${customer.direccion_evento}</td>
                <td>${customer.dia_cumpleaños}</td>
                <td>${customer.mes_cumpleaños}</td>
                <td>${customer.observaciones}</td>
                <td>${customer.correo_electronico}</td>
                <td>
                    <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                    <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
                </td>
              </tr>`
              html = html + row;
            }

        }

   document.querySelector('#customers > tbody').outerHTML=html


}




async function saveEventoUbicacion(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

        for(customer of customers){
            if( customer.direccion_evento == document.getElementById("txtFiltroEventoUbicacion").value){
                filtrarDireccionEvento(customer.direccion_evento)
            }
        }
}

async function filtrarDireccionEvento(direccion_evento){
 var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

  var filtro = customers.find(x => x.direccion_evento == direccion_evento)

    customers = await response.json();
    var html =''

        for(customer of customers){
            if(customer.direccion_evento == filtro.direccion_evento){
                var row = `<tr>
                <td>${customer.nombre}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                <td>${customer.tipo_evento}</td>
                <td>${customer.dia_evento}</td>
                <td>${customer.mes_evento}</td>
                <td>${customer.direccion_casa}</td>
                <td>${customer.direccion_evento}</td>
                <td>${customer.dia_cumpleaños}</td>
                <td>${customer.mes_cumpleaños}</td>
                <td>${customer.observaciones}</td>
                <td>${customer.correo_electronico}</td>
                <td>
                    <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
                    <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
                </td>
              </tr>`
              html = html + row;
            }

        }

   document.querySelector('#customers > tbody').outerHTML=html


}