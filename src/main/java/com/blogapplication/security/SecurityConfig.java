package com.blogapplication.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.blogapplication.repository.UserRepository;
import com.blogapplication.securityJWT.JWTProvider;
import com.blogapplication.securityJWT.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsService userdetailservice;
	/*
	 * @Bean public com.blogapplication.securityJWT.JwtAuthenticationFilter
	 * JwtAuthenticationFilter() { return new
	 * com.blogapplication.securityJWT.JwtAuthenticationFilter(); }
	 */
	@Autowired
    private JWTProvider tokenProvider;
	
	
	
	
	
	  @Bean(BeanIds.AUTHENTICATION_MANAGER)
	  
	  @Override public AuthenticationManager authenticationManagerBean() throws
	  Exception {
	  
	  return super.authenticationManagerBean(); }
	 
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
				//super.configure(http);
				
				http.cors().and().authorizeRequests()
				.antMatchers("/api/auth/**")
				.permitAll()
				.anyRequest()
				.authenticated();
				http.csrf().disable();
	http.addFilter(new JwtAuthenticationFilter(authenticationManager(),tokenProvider));
	}
	
	@Autowired
	public void configure(AuthenticationManagerBuilder auth)
	{
		try {
			auth.userDetailsService(userdetailservice).passwordEncoder(getPasswordEncoder());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Bean
	public BCryptPasswordEncoder getPasswordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
