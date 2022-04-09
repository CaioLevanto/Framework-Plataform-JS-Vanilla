package br.com.painchaud.dao;

import java.util.ArrayList;
import java.util.List;

import br.com.painchaud.daointerface.UsuarioDAO;
import br.com.painchaud.dbcomponent.DBStatement;
import br.com.painchaud.enumtype.TipoAcao;

public class UsuarioDAOImpl implements UsuarioDAO {

	public Boolean insert(Class<?> classPath, Object entity) {
		return new DBStatement().execInsertObject(classPath, entity);
	}
	
	public Boolean update(Class<?> classPath, Object entity, Integer id) {
		return new DBStatement().execUpdate(classPath, entity, id);
	}
	
	public Boolean delete(Class<?> classPath, Integer id) {
		return new DBStatement().execDelete(classPath, id);
	}
	
	public Boolean hasItem(Class<?> classPath, Integer id) {
		return (new DBStatement().execSelectForEditById(classPath, id).size() > 0);
	}
	
	public Object edit(Class<?> classPath, Integer id) {
		return new DBStatement().execSelectForEditById(classPath, id);
	}

	public List<Object> findAll(Class<?> classPath) {
		return new DBStatement().execSelect(classPath);
	}
	
	//Atua na tela.
	public ArrayList<String> getActions() {
		ArrayList<String> listAction = new ArrayList<String>();
		listAction.add(TipoAcao.DELETAR.getDescription());
		listAction.add(TipoAcao.EDITAR.getDescription());
		
		return listAction;
	}
	
}
