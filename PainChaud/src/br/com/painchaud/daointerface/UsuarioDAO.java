package br.com.painchaud.daointerface;

import java.util.ArrayList;
import java.util.List;

public interface UsuarioDAO {

	public Boolean insert(Class<?> userPath, Object entity);
	
	public Boolean update(Class<?> pathClass, Object setValueItens, Integer id);
	
	public Boolean delete(Class<?> classPath, Integer id);
	
	public Boolean hasItem(Class<?> classPath, Integer id);
	
	public Object edit(Class<?> classPath, Integer id);
	
	public List<Object> findAll(Class<?> userPath);
	
	public ArrayList<String> getActions();
	
}
