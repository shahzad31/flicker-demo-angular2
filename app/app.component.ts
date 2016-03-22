import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PhotoListComponent}     from './photos/photo-list.component.ts';
import {PhotoDetailComponent}   from './photos/photo-detail.component.ts';

import {PhotoService}           from './photos/photo.service';

@Component({
  selector: 'my-app',
  templateUrl:'app/template.html',
  providers:  [PhotoService],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/',   name: 'Photos',     component: PhotoListComponent},
  {path: '/photo/:id', name: 'PhotoDetail', component: PhotoDetailComponent}
])
export class AppComponent {}