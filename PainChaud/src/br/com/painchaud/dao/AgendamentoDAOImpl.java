package br.com.painchaud.dao;

import java.util.Arrays;
import java.util.List;

import br.com.painchaud.daointerface.AgendamentoDAO;
import br.com.painchaud.dbcomponent.DBStatement;

public class AgendamentoDAOImpl implements AgendamentoDAO {

	@Override
	public List<Object> findSchedulingById(Integer id) {
		return new DBStatement().execSelect("SELECT * FROM agendamento WHERE id = :id", Arrays.asList(new Object[] {id}));
	}
	
}
