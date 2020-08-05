package com.blogapplication.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.blogapplication.dto.PostDTO;
import com.blogapplication.exception.PostNotFoundException;
import com.blogapplication.model.Post;
import com.blogapplication.repository.PostRepository;

@Service
public class PostService {
	@Autowired
	private AuthService _authservice;
	@Autowired
	private PostRepository _postRepository;
	public void createPost(PostDTO postDto)
	{
		Post post = new Post();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		User username = _authservice.getCurrentUser().orElseThrow(()-> new IllegalArgumentException("No User Logged In"));
		post.setUsername(username.getUsername());
		post.setCreatedon(Instant.now());
		_postRepository.save(post);
	}
	public List<PostDTO> showAllPosts() {
		List<Post> posts = _postRepository.findAll();
		
		return posts.stream().map(this::mapFromPostToDTO).collect(Collectors.toList());
				//(Post)->new  mapFromPostToDTO(Post)
	}
	
	private PostDTO mapFromPostToDTO(Post post)
	{
		PostDTO postDTO = new PostDTO();
		postDTO.setId(post.getId());
		postDTO.setTitle(post.getTitle());
		postDTO.setContent(post.getContent());
		postDTO.setUsername(post.getUsername());
		return postDTO;
	}
	
	public PostDTO readSinglePost(Long id) {
		Post post = _postRepository.findById(id).orElseThrow(()-> new PostNotFoundException("for Id "+id));
		return mapFromPostToDTO(post);
	}

}
