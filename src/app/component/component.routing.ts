import { Routes } from '@angular/router';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { CardsComponent } from './card/card.component';
import { ArtcicleComponent } from './artcicle/artcicle.component';
import { AboutComponent } from './about/about.component';
import { ViewyoutubeComponent } from './viewyoutube/viewyoutube.component';
import { CenterUiComponent } from './center-ui/center-ui.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Pornatis update ui',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'update ui' }
          ]
        }
      },
      {
        path: 'accordion',
        component: NgbdAccordionBasicComponent,
        data: {
          title: 'Recommended for you',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'Recommended for you' }
          ]
        }
      },
      {
        path: 'timepicker',
        component: NgbdtimepickerBasicComponent,
        data: {
          title: 'Visa Application',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'Visa Application' }
          ]
        }
      },
      {
        path: 'artcicle',
        component: ArtcicleComponent,
        data: {
          title: 'Review',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
          //  { title: 'ngComponent' },
            { title: 'Review' }
          ]
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'About' }
          ]
        }
      },
      {
        path: 'viewyoutube',
        component: ViewyoutubeComponent,
        data: {
          title: 'Youtube',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'Youtube' }
          ]
        }
      },
      {
        path: 'centerui',
        component: CenterUiComponent,
        data: {
          title: 'Center-ui',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
           // { title: 'ngComponent' },
            { title: 'Center-ui' }
          ]
        }
      }
    ]
  }
];
