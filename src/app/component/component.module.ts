import { NgModule,Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { CardsComponent } from './card/card.component';
import { ArtcicleComponent } from './artcicle/artcicle.component';
import { AboutComponent } from './about/about.component';
import { ViewyoutubeComponent } from './viewyoutube/viewyoutube.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { CenterUiComponent } from './center-ui/center-ui.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
  declarations: [
    NgbdAccordionBasicComponent,
    NgbdtimepickerBasicComponent,
    CardsComponent,
    ArtcicleComponent,
    AboutComponent,
    ViewyoutubeComponent,
    CenterUiComponent,
  ]
})
export class ComponentsModule {}
