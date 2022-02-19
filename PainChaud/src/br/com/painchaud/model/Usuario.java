package br.com.painchaud.model;

import java.io.Serializable;

import javax.validation.constraints.AssertFalse;

import br.com.painchaud.enumtype.FuncaoEnum;

public class Usuario implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@AssertFalse
	private int id;
	private String nome;
	private String email;
	private FuncaoEnum funcao;
	@AssertFalse
	private String senha;

	public Usuario() {
		super();
	}
	
	public Usuario(int id, String nome, String email, String senha, FuncaoEnum funcao) {
		super();
		
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.funcao = funcao;
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

	public String getFuncao() {
		return funcao.getDescricao();
	}

	public void setFuncao(FuncaoEnum funcao) {
		this.funcao = funcao;
	}
	
}
