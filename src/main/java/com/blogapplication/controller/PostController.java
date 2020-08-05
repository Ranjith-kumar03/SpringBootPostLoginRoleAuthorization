package com.blogapplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapplication.dto.PostDTO;
import com.blogapplication.service.PostService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/posts/")
public class PostController {
	@Autowired
	private PostService postService; 

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addpost")
	public ResponseEntity<HttpStatus> createPost(@RequestBody PostDTO postDTO)
	{
		postService.createPost(postDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<PostDTO>> showAllPosts()
	{
		
		return new ResponseEntity<>(postService.showAllPosts(), HttpStatus.OK);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<PostDTO> getSinglePost(@PathVariable Long id)
	{
		
		return new ResponseEntity<>(postService.readSinglePost(id),HttpStatus.OK);
	}
}
