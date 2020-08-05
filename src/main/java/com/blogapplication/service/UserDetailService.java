package com.blogapplication.service;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blogapplication.model.User;
import com.blogapplication.repository.UserRepository;

@Service
public class UserDetailService implements UserDetailsService{

	@Autowired
	private UserRepository _userRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = _userRepository.findByusername(username).orElseThrow(()->
		new UsernameNotFoundException("No user found with the name ->"+username));
		
		Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
		
		/*
		 * return new org.springframework.security.core.userdetails.
		 * User(user.getUsername(), user.getPassword(), true, true, true, true,
		 * getAuthorities("ROLE_USER"));
		 */
		
		
	}


	/*
	 * private Collection<? extends GrantedAuthority> getAuthorities(String
	 * role_user) {
	 * 
	 * return Collections.singletonList(new SimpleGrantedAuthority(role_user)); }
	 */

}
