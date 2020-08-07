package com.blogapplication.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.blogapplication.dto.LoginRequest;
import com.blogapplication.dto.RegisterRequest;
import com.blogapplication.model.User;
import com.blogapplication.repository.UserRepository;
import com.blogapplication.security.SecurityConfig;
import com.blogapplication.securityJWT.JWTProvider;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository _userRepository;
	
	@Autowired
	private AuthenticationManager authetnticationmanager;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	 @Autowired
	 private JWTProvider jwt;
	
	public void signup( RegisterRequest registerrequest)
	{
		System.out.println(registerrequest);
		User user = new User();
		
		
		user.setUsername(registerrequest.getUsername());
		user.setPassword(PasswordEncoder(registerrequest.getPassword()));
		user.setEmail(registerrequest.getEmail());
		user.setRole(registerrequest.getRole());
		System.out.println(user);
		
		_userRepository.save(user);
	}
	
	
	
	public String PasswordEncoder(String password)
	{
		return encoder.encode(password);
	}
	
	
	public AuthenticationResponse login(@RequestBody  LoginRequest loginRequest)
	{
		
		
		System.out.println(loginRequest);
	   
	   
	   
		Authentication authentication=   authetnticationmanager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword() ));
		System.out.println("Iam also getting hit"+authentication);
	    //  SecurityContextHolder.getContext().setAuthentication(authentication);
	    //System.out.println("iam the principal qwhile login" +SecurityContextHolder.getContext().getAuthentication().getPrincipal());
	    String token = jwt.generateToken(authentication);
	    String roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());
	    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
	    System.out.println("please find the roles" + roles);
	   return new AuthenticationResponse(token, authentication.getName(), roles );//
	}
	
	
	  public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() { 
		  System.out.println("iam the principal" +SecurityContextHolder.getContext().getAuthentication().getPrincipal());
	  org.springframework.security.core.userdetails.User	 pricipal=	(org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		  SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	  //System.out.println("iam the principal" +SecurityContextHolder.getContext().getAuthentication().getPrincipal());
	  
	  return     Optional.of(pricipal); }
	 
}

