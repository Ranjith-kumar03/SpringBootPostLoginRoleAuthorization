package com.blogapplication.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.sun.istack.NotNull;

@Entity 
@Table(name="posts")
public class Post implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank
	@Column
	private String title;
	@Lob
	@Column
	@NotEmpty
	private String content;
	@Column
	private Instant createdon;
	@Column
	private Instant updatedon;
	@Column
	@NotBlank
	private String username;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Instant getCreatedon() {
		return createdon;
	}
	public void setCreatedon(Instant createdon) {
		this.createdon = createdon;
	}
	public Instant getUpdatedon() {
		return updatedon;
	}
	public void setUpdatedon(Instant updatedon) {
		this.updatedon = updatedon;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
	
	
	
	public Post(long id, @NotBlank String title, @NotEmpty String content, Instant createdon, Instant updatedon,
			@NotBlank String username) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.createdon = createdon;
		this.updatedon = updatedon;
		this.username = username;
	}
	
	public Post() {
		
	}
	
	@Override
	public String toString() {
		return "Post [id=" + id + ", title=" + title + ", content=" + content + ", createdon=" + createdon
				+ ", updatedon=" + updatedon + ", username=" + username + "]";
	}
	

}
