package br.com.painchaud.enumtype;

public enum LocalEnum {

	BALCAO("Balcão"),
	EMBALADO("Embalado");
	
	private String descricao;
	
	LocalEnum(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return this.descricao;
	}
	
}
