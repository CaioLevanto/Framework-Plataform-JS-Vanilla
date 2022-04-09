package br.com.painchaud.model;

import java.io.Serializable;

import javax.validation.Valid;
import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.AssertTrue;

import br.com.painchaud.enumtype.FuncaoEnum;

public class Usuario implements Serializable {
	
	@AssertFalse
	private static final long serialVersionUID = 1L;
	
	@AssertTrue
	private int id;
	
	private String nome;
	
	private String email;
	
	@Valid
	private int funcao;
	
	private String senha;

	public Usuario() {
		super();
	}
	
	public Usuario(String nome, String email, Integer funcao, String senha) {
		super();
		
		this.nome = nome;
		this.email = email;
		this.funcao = funcao;
		this.senha = senha;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Integer getFuncao() {
		return funcao;
	}
	
	public FuncaoEnum getFuncaoEnum() {
		return FuncaoEnum.values()[funcao];
	}

	public void setFuncao(int funcao) {
		this.funcao = funcao;
	}
	
}
