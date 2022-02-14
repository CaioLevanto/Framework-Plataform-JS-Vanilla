package br.com.painchaud.daointerface;

import java.util.List;

public interface AgendamentoDAOImpl {

	public List<Object> findSchedulingById(Integer id);
	
}
