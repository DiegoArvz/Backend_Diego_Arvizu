var cities = [];
var types = [];
var type_selected = "";
var city_selected = "";
var min_range =200;
var max_range = 80000;
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

/*funcion que escuche el evento de mostrarTodos**/

function mostrarTodos(){
  $("#mostrarTodos").click(function(){
    console.log("clicked");
    var formData = new FormData();

    $.ajax({
      url:'./action.php',
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      type: 'get',
      success: function(data){
        createElements(data, true);
      },
      error: function(arg, arg2, arg3){
        alert("error 1"+ arg+ " error2: "+arg2+ " error3: "+arg3);
      }

  });
});
}


  $("#formulario").submit(function(event){
    event.preventDefault();
    var formData = new FormData();
    formData.append('ciudad', city_selected);
    formData.append('tipo', type_selected);
    formData.append('precio', min_range);
    formData.append('maximo', max_range);

    $.ajax({
      url:'./buscador.php',
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      type: 'post',
      success: function(data){
        console.log(data);
        createElements(data,false);
      },
      error: function(arg, arg2, arg3){
        alert("error 1"+ arg+ " error2: "+arg2+ " error3: "+arg3);
      }

    });

  });

  function createElements(json_obj, isJson){
      if(isJson){
        var json = JSON.parse(json_obj);
      }
      else{
        var json = json_obj;
      }

    for (var i = 0; i < json_obj.length; i++) {
      var element = "<div class='row'>"+
          "<div class='col l4 m4 s4'>"+
            "<img class='responsive-img' src='img/home.jpg' >"+
          "</div>"+
          "<div class='col l8 m8 s8'>"+
          "  <p>"+
              "Id:"+json[i].Id+" </br>"+
              "Direccion: "+json[i].Direccion+" </br>"+
              "Ciudad: "+json[i].Ciudad+" </br>"+
              "Telefono: "+json[i].Telefono+" </br>"+
              "Codigo Postal: "+json[i].Codigo_Postal+" </br>"+
              "Tipo: "+json[i].Tipo+" </br>"+
              "Precio: "+json[i].Precio+" </br>"+
            "</p>"+
          "</div>"+
      "</div>";
      $(".colContenido").append(element);
    }
  }

  function findCitiesAndTypes(){
    var formData = new FormData();

      $.ajax({
        url:'./action.php',
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'get',
        success: function(data){
          var json = JSON.parse(data);

          var temp_city = "";
          var counter_city = 1;
          var counter_type = 1;
          for (var i = 0; i < json.length; i++) {
            var temp_city = json[i]["Ciudad"];
            var temp_type = json[i]["Tipo"];
            if(!(cities.includes(temp_city))){
              cities.push(temp_city);
              temp_city = "  <option value="+counter_city+">"+temp_city+"</option>";
              $("#selectCiudad").append(temp_city);
              counter_city++;
            }

            if(!(types.includes(temp_type))){
              types.push(temp_type);
              temp_type = "  <option value="+counter_type+">"+temp_type+"</option>";
              $("#selectTipo").append(temp_type);
              counter_type++;
            }

          }
        },
        error: function(arg, arg2, arg3){
          alert("error 1"+ arg+ " error2: "+arg2+ " error3: "+arg3);
        }
    });
  }


  function selectedItems(){
    $("#selectCiudad").change(function(){
      city_selected = $( "#selectCiudad option:selected" ).text();
    });

    $("#selectTipo").change(function(){
      type_selected = $( "#selectTipo option:selected" ).text();
    });

    var slider = $("#rangoPrecio").data("ionRangeSlider");
    $("#rangoPrecio").change(function(){
      var slider = $("#rangoPrecio").data("ionRangeSlider");
        min_range = slider.result.from;
        max_range = slider.result.to;
    });
  }



findCitiesAndTypes();
mostrarTodos();
inicializarSlider();
playVideoOnScroll();
//option selection
selectedItems();
