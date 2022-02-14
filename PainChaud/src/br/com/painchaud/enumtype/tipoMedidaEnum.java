package br.com.painchaud.enumtype;

public enum tipoMedidaEnum {

	UNIDADE("Unidade"),
	PESO("Peso");
	
	private String descricao;
	
	tipoMedidaEnum(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return this.descricao;
	}
	
}
