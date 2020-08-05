import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostData} from '../../model/post-data';
import {PostService} from '../Service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adpost',
  templateUrl: './adpost.component.html',
  styleUrls: ['./adpost.component.css']
})
export class AdpostComponent implements OnInit {
  addPostForm: FormGroup;
  postData: PostData;
  constructor(private postService: PostService , private  router: Router) {
    this.addPostForm = new FormGroup({
      title : new FormControl(),
      body : new FormControl(),
    });

    this.postData = {
      id: '',
      title: '',
      content: '',
      createdon: '',
      updatedon: '',
      username: ''
    };
  }

  ngOnInit(): void {
  }
  addPost()
  {
    this.postData.title = this.addPostForm.get('title').value;
    this.postData.content = this.addPostForm.get('body').value;
    this.postService.addPost(this.postData).subscribe(data => {
     console.log(`${data} added to server sucessfully sucess`);
     this.router.navigateByUrl('/home');
       }, error => {
      console.log(`${error} error in processing data`);
    });
  }
}
