package com.blogapplication.securityJWT;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTProvider {

	SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	/*
	 * private Key key;
	 * 
	 * @PostConstruct public void init() { key =
	 * Keys.secretKeyFor(SignatureAlgorithm.HS512); }
	 */
	
	public String generateToken(Authentication authentication)
	{
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());
	//	System.out.println("Iam from Authority"+authorities);
	//  User principal = (User)	authentication.getPrincipal();
	/*
	 * return Jwts .builder() .setSubject(principal.getUsername()) .signWith(key)
	 * .compact();
	 */
		 return Jwts.builder().setSubject(authentication.getName())
	                .claim("roles", authorities)
	                .setExpiration(new Date(System.currentTimeMillis() + 5000))
	                .signWith(SignatureAlgorithm.HS512, key ).compact();
		
	}
	
	public boolean ValidateToken(HttpServletRequest request) {
		/*
		 * Jwts.parser().setSigningKey(key).parseClaimsJws(jwt); return true;
		 */
		String token = resolveToken(request);
        if(token == null){
            return false;
        }
        Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
        if(claims.getExpiration().before(new Date())){
            return false;
        }
        return true;
	}

	/*
	 * public String getUserNameFromJWT(String jwt) {
	 * 
	 * Claims claims =
	 * Jwts.parser().setSigningKey("password").parseClaimsJws(token).getBody();
	 * return claims.getSubject(); }
	 */
	public Authentication getAuthentication(HttpServletRequest request){
        String token = resolveToken(request);
        if(token == null){
            return null;
        }
        Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
        String username = claims.getSubject();
        List<GrantedAuthority> authorities = Arrays.stream(claims.get("roles").toString().split(","))
                .map(role -> role.startsWith("ROLE_")? role:"ROLE_"+role)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return username!=null ? new UsernamePasswordAuthenticationToken(username, null, authorities):null;
    }

	
	private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
