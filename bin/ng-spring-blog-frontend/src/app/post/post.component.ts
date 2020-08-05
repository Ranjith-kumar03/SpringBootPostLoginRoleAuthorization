import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PostService} from '../Service/post.service';
import {PostData} from '../../model/post-data';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: number;
  post: Observable<PostData>;
  constructor(private route: ActivatedRoute , private postServcie: PostService) { }

  ngOnInit(): void {
   this.route.paramMap.subscribe((param: ParamMap) => {


     this.id = parseInt(param.get('id'));

     this.post = this.postServcie.getOnePost(this.id);

    });
  }

}
