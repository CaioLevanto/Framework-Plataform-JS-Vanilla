package br.com.painchaud.model;

import java.io.Serializable;
import java.math.BigDecimal;

import br.com.painchaud.enumtype.LocalEnum;
import br.com.painchaud.enumtype.tipoMedidaEnum;

public class Produto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int id;
	private String descricao;
	private LocalEnum local;
	private tipoMedidaEnum tipoMedida;
	private BigDecimal valor;

	public Produto() {
		super();
	}
	
	public Produto(int id, String descricao, Integer local, Integer tipoMedida, BigDecimal valor) {
		super();
		
		this.id = id;
		this.descricao = descricao;
		this.local = LocalEnum.values()[local];
		this.tipoMedida = tipoMedidaEnum.values()[tipoMedida];
		this.valor = valor;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public String getLocal() {
		return local.getDescricao();
	}
	
	public void setLocal(LocalEnum local) {
		this.local = local;
	}
	
	public String getTipoMedida() {
		return tipoMedida.getDescricao();
	}
	
	public void setTipoMedida(tipoMedidaEnum tipoMedida) {
		this.tipoMedida = tipoMedida;
	}
	
	public BigDecimal getValor() {
		return valor;
	}
	
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
}
