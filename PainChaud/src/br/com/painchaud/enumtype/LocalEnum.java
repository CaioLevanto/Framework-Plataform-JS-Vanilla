package br.com.painchaud.enumtype;

public enum LocalEnum {

	BALCAO("Balc�o"),
	EMBALADO("Embalado");
	
	private String descricao;
	
	LocalEnum(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return this.descricao;
	}
	
}
