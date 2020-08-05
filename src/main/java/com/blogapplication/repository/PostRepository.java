package com.blogapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogapplication.model.Post;
import com.blogapplication.model.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

			

	

}
