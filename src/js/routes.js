import AboutPage from '../pages/about.f7.html';
import left_panel_nav from '../pages/left_panel_nav.f7.html';
import Ways from '../pages/ways.f7.html';
import Settings from '../pages/settings.f7.html';
import NotFoundPage from '../pages/404.f7.html';
import HomePage from '../pages/home.f7.html';



var routes = [
    // Index page
    {
      path: '/',
      //url: './index.html',
      component: HomePage,
      name: 'home',
      keepAlive: true, //never destroy
      //master: true,
      on: {
        //pageInit: init(), // init + loadMap functions
        //pageAfterIn: init(),
        
      }
    },
    {
      name: 'about',
      path: '/about/',
      //url: './pages/about.html',
      component: AboutPage,
    },


    {
      name: 'left_panel_nav',
      path: '/left_panel_nav/',
      //panel: {
      //  url: './pages/left_panel_nav.html',
      //},
      component: left_panel_nav,
    },

    {
      name: 'ways',
      path: '/ways/',
      //url: './pages/ways.html',
      component: Ways,
    },

    
    {
      name: 'settings',
      path: '/settings/',
      //url: './pages/settings.html',
      component: Settings,
      options: {
        animate: true,
        transition: 'f7-parallax',
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          // do something when page initialized
        },
      }
    },

    // Default route, match to all pages (e.g. 404 page) MUST BE THE LAST
    {
      path: '(.*)',
      //url: './pages/404.html',
      component: NotFoundPage,
    },
  ];
export default routes;