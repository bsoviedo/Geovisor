import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import '../App.css'
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import 'leaflet-html-legend';

import {capa2_1} from '../data/geo_data/lucha_ser1';
import {puntosCapa2_4, url_capa2} from '../data/geo_data/puntos_capa_2_4';
import {nodos_capa1, url_capa1} from '../data/geo_data/nodos_capa1';
import {violencia} from '../data/geo_data/violencia';
import {puntos_capa_3} from '../data/geo_data/puntos_capa_3';
import {genero_relaciones_poder} from '../data/geo_data/genero_relaciones_poder';
import {puntos_capa_4, url} from '../data/geo_data/puntos_capa_4';
import { metodologia } from '../data/geo_data/metodologia';




/*  delete L.Icon.Default.prototype._getIconUrl;
 
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
}); 

  */

export const Map= ()=> {

      let color= "rgba(0,128,0,0.5)"

    

     function myStyle(){
            return{
                color: "#F52E75",
                fillColor: '#F52E75'
            }

    } 


    function bindPopup(feature, layer){

    
                if(feature.properties.Material_C === url || feature.properties.Material_C === url_capa1 || feature.properties.Material_C === url_capa2){
                        
                            layer.bindPopup(` <iframe 
                                    src=${feature.properties.Material_C}>
                                    </iframe>`)
                } else if(feature.properties.Material_C !== undefined && feature.properties.Material_C.includes('github')){

                    if(feature.properties.Material_C !== undefined && feature.properties.Material_C.includes('.png')){

                        layer.bindPopup( `<img src=${feature.properties.Material_C} width="500" height="500"> </img>`,{
                            className: "popup_transparente"
                        })

                    }
                   

                } 
                
                else{
                    layer.bindPopup( feature.properties.Material_C)
                }


    }


    function setIcon(feature, latlng, IconUrl, layer){
        let icon=  L.icon({
                         iconUrl: IconUrl,
                         iconSize: [20, 30],
                        iconAnchor: [20, 25],
                        popupAnchor: [-3, -76],
                    })
                

                let marker= L.marker(latlng, {
                    icon: icon 
                }).addTo(layer)

                bindPopup(feature, marker)

                return marker
    }



  
    function LegendNative(){
        let map = useMap();

        
        let layer1= L.layerGroup()

        L.geoJSON(violencia.features, {
            style: ()=>{
                return{
                color: "#F52E75",
                fillColor: '#F52E75'
                }
            }
        }).addTo(layer1);
 
        L.geoJSON(nodos_capa1.features, {    
            pointToLayer: (feature, latlng)=>{
       
                if(feature.properties.Simbolo === "Estrella"){
                    

                    setIcon(feature, latlng, './markers/Estrella_Capa1.svg', layer1)

                }else{
                    setIcon(feature, latlng, './markers/Circulo_Capa1.svg', layer1)
                }

                

                

            }  
        })

     layer1.addTo(map);


        let layer2= L.layerGroup()
        L.geoJSON(capa2_1.features, {
            style: ()=>{
                return{
                color: "#C500FF",
                fillColor: '#C500FF'
                }
            }
        }).addTo(layer2);
 
        L.geoJSON(puntosCapa2_4.features, {    
            pointToLayer: (feature, latlng)=>{
                 if(feature.properties.Simbolo === "Pentagono"){
                    

                    setIcon(feature, latlng, './markers/Pentagono_Capa2.svg', layer2)

                }else{
                    setIcon(feature, latlng, './markers/Triangulo_Capa2.svg', layer2)
                }

            },
           
        }).addTo(layer2);

     

       
        let layer3= L.layerGroup()
        L.geoJSON(genero_relaciones_poder.features, {
          style: ()=>{
                return{
                color: "#73FFDF",
                fillColor: '#73FFDF'
                }
            }
        }).addTo(layer3);
 
        L.geoJSON(puntos_capa_3.features, {    
          pointToLayer: (feature, latlng)=>{
                 if(feature.properties.Simbolo === "Cuadrado"){
                    

                    setIcon(feature, latlng, './markers/Cuadrado_Capa3.svg', layer3)

                }else{
                    setIcon(feature, latlng, './markers/Octagono_Capa3.svg', layer3)
                }

            },
            style: myStyle
        }).addTo(layer3);
 
        

        let layer4= L.layerGroup()
        L.geoJSON(metodologia.features, {
          style: ()=>{
                return{
                color: "#55FF00",
                fillColor: '#55FF00'
                }
            }
        }).addTo(layer4);
 
        L.geoJSON(puntos_capa_4.features, {    
             pointToLayer: (feature, latlng)=>{
                setIcon(feature, latlng, './markers/Hexagono_Capa4.svg', layer4)
            }, 
            style: myStyle
        }).addTo(layer4);

        layer2.addTo(map);
        layer3.addTo(map);
        layer4.addTo(map);


        let overlaymap={
            '<div class="capa1"> &nbsp</div> Fugas emergentes  <hr>': layer1,
            '<div class="capa2"> &nbsp</div>Lucha por el ser  <hr>' : layer2,
           '<div class="capa3"> &nbsp</div>  Relaciones de poder en el audiovisual <hr>': layer3,
           '<div class="capa4"> &nbsp</div> Haceres transgresores <hr>': layer4,
           /* '<div class="span"> &nbsp</div> Countries4 <hr>': layer1,
            '<div class="span"> &nbsp</div> Countries5 <hr>': layer1,
            '<div class="span"> &nbsp</div> Countries6 <hr>': layer1,
            '<div class="circulo "></div> Countries7 ': layer1,
             */
        } 


     L.control.layers(null, overlaymap,{collapsed: false, position: "bottomleft"}).addTo(map)

        return null

 
    }

   
    
    
  return (
<div>

<div className='leftdiv'> 
    <h2> Contracartografiando el margen: metodologías audiovisuales feministas en Bogotá. </h2>

    <p> En nuestra cartografía queremos conectar desde las luchas su accionar colectivo, de esa forma, en la sistematización y análisis que realizamos, nos quedaron cuatro capas que hablan de luchas y contextos de emergencia, que en su conjunto le dan sentido al mapa que les presentamos. Con esto en mente, les compartimos la información que usamos en cada capa/lucha. 

Las capas finales reúnen y tejen la experiencia de cada colectiva poniéndola en diálogo. Es decir, lo desarrollado por cada unx de lxs compañerxs interacciona entre si evidenciando diálogos que transgreden contextos históricos y condiciones de emergencia diferentes. De esta manera, buscamos plantear mediante este ejercicio cartográfico cómo estas luchas han re-aparecido en varios momentos de la historia del audiovisual en Bogotá. 

Partiendo de estas capas buscamos mostrar cómo las diferentes luchas de lxs compañerxs creadorxs  interrumpen las reproducciones hegemónicas de las formas de existir mediante el ver y hacer audiovisual.  Las capas que finalmente definimos y serán explicadas más adelante son: Fugas emergentes en la cual indagamos sobre la violencia como un contexto de emergencia de inquietudes contra el sistema jerárquico del patriarcado y su relación con el audiovisual; relaciones de poder en el audiovisual desde la cual se explora el cómo en los campos de creación se reproducen modelos de violencia patriarcal; lucha por el ser, capa en la que se reúnen diferentes anécdotas en las cuales la lucha por ser re-encausa los modos de concebir a la realización audiovisual y por ùltimo, haceres transgresores, en donde convergen las diferentes Metodologias de las colectivas y realizadorxs como modos transgresores del hacer-ser y resistir en el audiovisual.
 </p>
</div>
   
        <MapContainer center={[4.65, -74.15]} zoom={11.5} scrollWheelZoom={false} style={{"display": "inlineBlock"}}>
             {/*  <GeoJSON
                    style={myStyle}
                    data={data.features}
             /> */}
            {/* <Legend /> */}
           <LegendNative />

            <TileLayer
                attribution='Carto'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
        </MapContainer>

   </div>     
      
      
      );
}

