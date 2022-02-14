package br.com.painchaud.model;

import java.io.Serializable;

public class Comanda implements Serializable {

	private static final long serialVersionUID = 1L;
	private int id;
	
	public Comanda() {
		super();
	}
	
	public Comanda(int id) {
		super();
		
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
