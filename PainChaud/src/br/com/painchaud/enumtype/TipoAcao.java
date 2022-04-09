package br.com.painchaud.enumtype;

public enum TipoAcao {
	
	EDITAR("Editar"),
	DELETAR("Deletar"),
	VISUALIZAR("Visualizar");
	
	private String descricao;
	
	TipoAcao(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescription() { 
		return this.descricao;
	}
}
