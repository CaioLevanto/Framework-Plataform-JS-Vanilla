package br.com.painchaud.enumtype;

public enum FuncaoEnum {
	
	ADMINISTRADOR("Administrador"),
	CAIXA("Caixa"),
	BALCAO("Balc�o");
	
	private String descricao;
	
	FuncaoEnum(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return this.descricao;
	}
	
}
