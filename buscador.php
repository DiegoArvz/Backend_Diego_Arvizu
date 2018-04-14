<?php
  $Ciudad = $_POST["ciudad"];
  $Tipo = $_POST["tipo"];
  $Precio = $_POST["precio"];
  //puedo tener esta variable fracias al formdata.append
  $Max = $_POST["maximo"];

  $json_result = "";

  $contenido = file_get_contents('./data-1.json');
  $contenido = json_decode($contenido);

  $result = array();




  for ($i=0; $i < count($contenido); $i++) {

    $intprice =   ereg_replace("[^0-9]", "", $contenido[$i]->Precio);
    $intprice = intval($intprice);
    if(
        ($Ciudad != "Elige una ciudad" && $Ciudad != "") &&
        ($Tipo != "Elige un tipo" && $Tipo != "" )
      )
      {
        if(!(in_array($contenido[$i],$result)))
         {
          if(($contenido[$i]->Ciudad) == $Ciudad &&
             ($contenido[$i]->Tipo) == $Tipo &&
             ($intprice >= $Precio && $intprice <= $Max) )
             {
               array_push( $result,  $contenido[$i]);
             }
          }
      }
      elseif( ($Ciudad != "Elige una ciudad"  && $Ciudad != "") )
          {
            if(!(in_array($contenido[$i],$result)))
             {
              if(($contenido[$i]->Ciudad) == $Ciudad &&
                  ($intprice >= $Precio && $intprice <= $Max) )
               {
                 array_push( $result,  $contenido[$i]);
               }
             }
          }
      elseif ($Tipo != "Elige un tipo" && $Tipo != "")
          {
            if(!(in_array($contenido[$i],$result))){
              if(
                  ($contenido[$i]->Tipo) === $Tipo &&
                  ($intprice >= $Precio && $intprice <= $Max) ){

                array_push( $result,  $contenido[$i]);
              }
            }
          }
        else
          {
            if(!(in_array($contenido[$i],$result))){
              if( $intprice >= $Precio && $intprice <= $Max ){
                array_push( $result,  $contenido[$i]);
              }
            }
          }
    }


  echo json_encode($result);





 ?>
