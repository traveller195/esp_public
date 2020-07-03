console.log('run JS file: framework7.js');

// Include core of framework7
import Framework7, { Dom7 } from 'framework7';

import routes from './routes.js';

// load ol for the map
//import '/code/src/js/openlayers_esp.js';

// Import additional components
//import Searchbar from 'framework7/components/searchbar/searchbar.js';
//import Calendar from 'framework7/components/calendar/calendar.js';
//import Popup from 'framework7/components/popup/popup.js';

console.log('var app = new Framework7()');

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'ESP App',
    // App id
    id: 'com.myapp.test',
    // aurora as Theme, zB fuer abgerundete Ecken etc.
    theme: 'aurora',
    // Enable swipe panel
    // default values for all panels:
    panel: {
      swipe: true,

    },
    // routes / navigation zwischen den Pages

    routes: routes,
    on: {
      pageInit: function () {
        //init();
      },
    },

  });

  console.log('var mainView = app.views.create( view-main');
  //init the main view:
  var mainView = app.views.create('.view-main', {
    url: '/'
  });



  //var panel_nav = app.panel.create({
  //  el: '.panel-left',
  //  side: 'left',
  //  visibleBreakpoint: 1024,
  //  collapsedBreakpoint: 768,
  //});

  // init


  //Zugriff auf DOM Elemente (HTML)
  var $$ = Dom7;

  // if local web storage is not existing, create

  // fill in default values


  //window.onload = init;

  // Import openlayers js file
  //import  { loadMap }  from '/code/src/js/openlayers_esp.js';

  function init (){
  // function to create web storage key-values, if not existing
  // key-values are for settings, if layer in ol-map is visible or not
    console.log('init function')

    console.log('check local storage')
  
    if (localStorage.getItem('lyr_osm') == null){
      // add key value
      localStorage.setItem('lyr_osm', 'y')
    };

    if (localStorage.getItem('lyr_ele') == null){
      // add key value
      localStorage.setItem('lyr_ele', 'y')
    };

    if (localStorage.getItem('lyr_rou') == null){
      // add key value
      localStorage.setItem('lyr_rou', 'y')
    };

    if (localStorage.getItem('lyr_ess') == null){
      // add key value
      localStorage.setItem('lyr_ess', 'y')
    };

    if (localStorage.getItem('lyr_poi') == null){
      // add key value
      localStorage.setItem('lyr_poi', 'y')
    };



    // now loat the map content --> openlayers
    //loadMap();

  };


//$$(document).on('.page:init', '.page[data-name="home"]', function(e,page){
//  .import('/code/src/js/openlayers_esp.js').then((u)=>{
//    u.default.function(loadPage);
//  });
//});


  // on click 
  // show/hide left panel nav by clicking button
  var state_menu = false;

  $$('.btn_menu').on('click', function(){
    if (state_menu == false){
      console.log('Button Menu clicked! value = ' + state_menu);
      state_menu = true;
      // /left_panel_nav/
      mainView.router.navigate('/left_panel_nav/');

    } else if (state_menu == true) {
      console.log('Button Menu clicked! value = ' + state_menu);
      state_menu = false;
      mainView.router.back(); // route back ... maybe url or options are interesting?

    };
    

  });


  // SETTINGS

  function getSettings(){
    // get values from local storage and set values of toggles

  };

  function setSettings(){
    // event: page ? close (settings)
    // set or write current state of toggles to local storage

  };

