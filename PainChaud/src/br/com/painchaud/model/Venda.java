package br.com.painchaud.model;

import java.io.Serializable;
import java.sql.Date;

import javax.validation.constraints.AssertTrue;

public class Venda implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int id;
	@AssertTrue
	private Date dataVenda;

	public Venda() {
		super();
	}
	
	public Venda(int id, Date dataVenda) {
		super();
		this.id = id;
		this.dataVenda = dataVenda;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDataVenda() {
		return dataVenda;
	}

	public void setDataVenda(Date dataVenda) {
		this.dataVenda = dataVenda;
	}
	
}
