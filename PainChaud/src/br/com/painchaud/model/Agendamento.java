package br.com.painchaud.model;

import java.io.Serializable;
import java.sql.Date;

public class Agendamento implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int id;
	private int telefone;
	private String cliente;
	private Date dataRetirada;
	private Boolean status;
	
	public Agendamento() {
		super();
	}
	
	public Agendamento(int id, int telefone, String cliente, Date dataRetirada, Boolean status) {
		super();
		
		this.id = id;
		this.telefone = telefone;
		this.cliente = cliente;
		this.dataRetirada = dataRetirada;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTelefone() {
		return telefone;
	}

	public void setTelefone(int telefone) {
		this.telefone = telefone;
	}

	public String getCliente() {
		return cliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public Date getDataRetirada() {
		return dataRetirada;
	}

	public void setDataRetirada(Date dataRetirada) {
		this.dataRetirada = dataRetirada;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
}
