package com.blogapplication.service;

public class AuthenticationResponse { 
	private String authenticationToken;
	private String username;
	private  String role;
	
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getAuthenticationToken() {
		return authenticationToken;
	}
	public void setAuthenticationToken(String authenticationToken) {
		this.authenticationToken = authenticationToken;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public AuthenticationResponse(String authenticationToken, String username , String role) {
		super();
		this.authenticationToken = authenticationToken;
		this.username = username;
		this.role = role;
	}
	
	public AuthenticationResponse() {
		
	}
}
