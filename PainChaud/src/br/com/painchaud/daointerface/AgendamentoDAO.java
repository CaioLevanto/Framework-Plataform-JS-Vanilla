package br.com.painchaud.daointerface;

import java.util.List;

public interface AgendamentoDAO {

	public List<Object> findSchedulingById(Integer id);
	
}
