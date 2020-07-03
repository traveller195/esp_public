console.log('run JS file: openlayers_esp.js');

import * as ol from 'ol';




import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {ZoomToExtent} from 'ol/control';
import {transform} from 'ol/proj';
import {Circle, Fill, Stroke, Style} from 'ol/style';


function loadMap(){
  console.log('Quellen fuer Karte laden');
  var source_stat_bezirke = new VectorSource({
      url: 'json/stat_bezirke_4326.geojson',
      format: new GeoJSON()
      });

  var source_aoi = new VectorSource({
      url: 'json/aoi_4326.geojson',
      format: new GeoJSON()
      });    

  var source_punkte_864 = new VectorSource({
      url: 'json/Punkte_864_A.geojson',
      format: new GeoJSON()
      });    

  // center to centroid of AOI
  var view = new View({
      center: transform([13.710164431108614, 51.026934250748468], 'EPSG:4326', 'EPSG:3857'),
      zoom: 14
    });


  console.log('openlayers Karte anzeigen');

  var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      //  new VectorLayer({
      //    source: new VectorSource({
      //      url: 'json/stat_bezirke_4326.geojson',
      //      format: new GeoJSON()
      //    })
      //  })
      ],
      target: 'map',
      view: view

    });



  // geojson mit grenzen von statistischen bezirken laden



  var layer2 = new VectorLayer({
    source: source_stat_bezirke
    });


    var fill = new Fill({
      color: 'rgba(0,255,0,0.4)'
    });
    var stroke = new Stroke({
      color: '#3399CC',
      width: 1.25
    });
    var styles = [
      new Style({
        image: new Circle({
          fill: fill,
          stroke: stroke,
          radius: 5
        }),
        fill: fill,
        stroke: stroke
      })
    ];


  var layer_punkte = new VectorLayer({
    source: source_punkte_864,
    style: styles
    });

  map.addLayer(layer2);
  map.addLayer(layer_punkte);


  // test funktion

  map.on("click", function(evt){
      //var extent = [[32.958984, -5.353521], [43.50585, 5.615985]];
      //map.getView().fit(extent, map.getSize());
      alert('Achtung Achtung... hier spricht OpenLayers!');
  });


};


// call function to load map content
loadMap();









//var feature = source_aoi.getFeatures()[0];
//var polygon = feature.getGeometry();
//view.fit(polygon, {padding: [170, 50, 30, 150]});
//map.getView().fit(source_aoi.getExtent(), map.getSize());

// karten extent beim onload auf extent von AOI legen

//var layerExtent = layer2.getSource().getExtent();

//if (layerExtent) {
//    map.getView().fit(layerExtent);
//};

//map.zoomToExtent(layer2.getSource().getExtent());
//map.ZoomToExtent([
//    [32.958984, -5.353521],
//    [43.50585, 5.615985]
//    ]);

//map.fitBounds([
//    [32.958984, -5.353521],
//    [43.50585, 5.615985]
//    ]);


/*
map.on(function() {
    extent = [[32.958984, -5.353521], [43.50585, 5.615985]];
    map.getView().fit(extent, map.getSize());
});
*/




/*

var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        // This illustrates a custom tiles source but for using
        // official OpenStreetMap server new ol.source.OSM()
        // instead of new ol.source.XYZ(...) is enough
        source: new ol.source.XYZ({
          attributions: [
          ol.source.OSM.ATTRIBUTION,
            'Tiles courtesy of ' +
            '<a href="http://openstreetmap.org">' +
            'OpenStreetMap' +
            '</a>'
          ],
          url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      })
    ],
    controls: ol.control.defaults({
      // Set to display OSM attributions on the bottom right control
      attributionOptions:  {
        collapsed: false
      }
    }).extend([
      new ol.control.ScaleLine() // Add scale line to the defaults controls
    ]),
    target: 'map',
    view: new ol.View({
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 2
    })
  });

  // Add vector layer with a feature and a style using an icon
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([0, 0])
          ),
          name: 'The center of the world'
        })
      ]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'http://openlayers.org/en/latest/examples/data/icon.png'
      })
    })
  });

  map.addLayer(vectorLayer);

  // Overlay to manage popup on the top of the map
  var popup = document.getElementById('popup');
  var overLay = new ol.Overlay({
    element: popup,
    position: ol.proj.fromLonLat([0, 0])
  });

  map.addOverlay(overLay);

  // Manage click on the map to display/hide popup
  map.on('click', function(e) {
    var info = [];
    map.forEachFeatureAtPixel(e.pixel, function (feature) {
      info.push(feature.get('name'));
    });
    if (info.length > 0) {
      popup.innerHTML = info.join(',');
      popup.style.display = 'inline';
    } else {
      popup.innerHTML = '&nbsp;';
      popup.style.display = 'none';
    }
  });



*/