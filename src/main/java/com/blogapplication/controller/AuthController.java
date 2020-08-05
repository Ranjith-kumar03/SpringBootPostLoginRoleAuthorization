package com.blogapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapplication.dto.LoginRequest;
import com.blogapplication.dto.RegisterRequest;
import com.blogapplication.service.AuthService;
import com.blogapplication.service.AuthenticationResponse;
///why
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth/")
public class AuthController {
	
	@Autowired
	private AuthService _authservice;
	
	@PostMapping("/signup")
	public ResponseEntity<HttpStatus> signup(@RequestBody RegisterRequest registerrequest)
	{
		registerrequest.setRole("ADMIN");
	System.out.println(registerrequest);
		_authservice.signup(registerrequest);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	@PostMapping("/login")
	public AuthenticationResponse Login(@RequestBody LoginRequest loginrequest)
	{
		System.out.println(_authservice.login(loginrequest));
		return _authservice.login(loginrequest);
		 
	}

}
