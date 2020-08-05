package com.blogapplication.exception;

public class PostNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1690250149566741684L;
   public PostNotFoundException(String msg)
   {
	   super(msg);
   }
}
