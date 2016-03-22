import {Component,  OnInit}  from 'angular2/core';
import {Photo, PhotoService}   from './photo.service';
import {RouteParams, Router} from 'angular2/router';

@Component({
  templateUrl:'app/photos/photoDetailTemplate.html'
})
export class PhotoDetailComponent implements OnInit  {
  photo: Photo;
  show:string;

  constructor(
    private _router:Router,
    private _routeParams:RouteParams,
    private _service:PhotoService){}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.show='show';
    this._service.getPhoto(id).subscribe(photo => {this.photo = photo;console.log(photo);
      this.show='hide';
      //noinspection TypeScriptUnresolvedVariable
      this.photo.url_q="https://farm"+this.photo.farm+".staticflickr.com/"+this.photo.server+"/"+this.photo.id+"_"+this.photo.secret+".jpg"
    });
  }

  gotoPhotos() {
    let photoId = this.photo ? this.photo.id : null;
    this._router.navigate(['Photos',  {id: photoId, foo: 'foo'} ]);
  }
}