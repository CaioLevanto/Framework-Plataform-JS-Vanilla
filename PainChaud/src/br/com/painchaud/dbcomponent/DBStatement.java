package br.com.painchaud.dbcomponent;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.sun.xml.internal.ws.util.StringUtils;

import br.com.painchaud.db.DBUtil;
import br.com.painchaud.utils.GenericUtils;

public class DBStatement extends DBUtil {
	
	public List<Object> execSelectDefault(String sql, List<Object> whereParameters) {
		try (Connection conn = getConn()) {
			try (PreparedStatement stmt = conn.prepareStatement(sql)) {
				populateParameterStatement(stmt, whereParameters);
				
				List<Object> listRowData = new ArrayList<Object>();
				try (ResultSet rs = stmt.executeQuery()) {
					while (rs.next()) {
						List<Object> rowData = new ArrayList<>();
					    for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
					        rowData.add(rs.getObject(i));
					    }
					    listRowData.add(rowData);
					}
				} catch (Exception expRs) {
					expRs.printStackTrace();
					return null;
				}
				
				return listRowData;
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (Exception expConn) {
			expConn.printStackTrace();
		}
		return null;
	}
	
	public List<Object> execSelectForEditById(Class<?> pathClass, Integer id) {
		Map<String, Object> whereParam = new HashMap<String, Object>();
		whereParam.put("id", id);
		
		return execSelect(pathClass, whereParam, false);
	}
	
	public List<Object> execSelect(Class<?> pathClass) {
		return execSelect(pathClass, null, false);
	}
	
	public List<Object> execSelect(Class<?> pathClass, Map<String, Object> whereParameters) {
		return execSelect(pathClass, whereParameters, false);
	}
	
	public List<Object> execSelect(Class<?> pathClass, Map<String, Object> whereParameters, Boolean search) {
		try (Connection conn = getConn()) {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT ");
			sql.append(this.getColumnsClass(pathClass, true));
			sql.append(" FROM ");
			sql.append(pathClass.getSimpleName().toLowerCase());
			
			if (whereParameters != null) {				
				if (whereParameters.size() > 0) {				
					sql.append(" WHERE ");
					sql.append(this.createWhereByMap(whereParameters, search));
				}
			}
			
			try (PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
				List<Object> listRowData = new ArrayList<Object>();
				try (ResultSet rs = stmt.executeQuery()) {
					
					while (rs.next()) {
						Field[] fields = pathClass.getDeclaredFields();
				    	Object newClass = pathClass.newInstance();
						
					    for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
					    	Field field = fields[i];
				    		field.setAccessible(true);
				    		populateClassByResultSet(rs, field, newClass, i);
					    }
					    
					    listRowData.add(newClass);
					}
				} catch (Exception expRs) {
					expRs.printStackTrace();
				}
				return listRowData;
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (Exception expConn) {
			expConn.printStackTrace();
		}
		return null;
	} 
	
	public Boolean execUpdate(Class<?> pathClass, Object setValueItens, Integer id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		
		return execUpdate(pathClass, setValueItens, params);
	}
	
	public Boolean execUpdate(Class<?> pathClass, Object setValueItens, Map<String, Object> whereParameters) {
		try(Connection conn = getConn()) {
			StringBuffer sql = new StringBuffer();
			sql.append(" UPDATE ");
			sql.append(pathClass.getSimpleName().toLowerCase());
			sql.append(" SET ");
			sql.append(this.createSetUpdate(setValueItens));
			sql.append(" WHERE ");
			sql.append(this.createWhereByMap(whereParameters, false));
			
			try(PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
				return (stmt.executeUpdate() > 0);
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (SQLException expConn) {
			expConn.printStackTrace();
		}
		return false;
	}
	
	private String createWhereByMap(Map<String, Object> whereParameters, Boolean search) {
		String sqlWhere = new String();
		
		for (Entry<String, Object> map : whereParameters.entrySet()) {
			if (search) {
				sqlWhere += " " + map.getKey() + " LIKE %" + map.getValue() + "%";
			} else {				
				sqlWhere += " " + map.getKey() + "=" + map.getValue();
			}
		}
		
		return sqlWhere;
	}
	
	public Boolean execUpdate(String sql, List<Object> setValueItens, List<Object> whereParameters) {
		try(Connection conn = getConn()) {
			try(PreparedStatement stmt = conn.prepareStatement(sql)) {
				List<Object> allParametersInOrder = new ArrayList<Object>();
				allParametersInOrder.addAll(setValueItens);
				allParametersInOrder.addAll(whereParameters);
				
				populateParameterStatement(stmt, allParametersInOrder);
				return (stmt.executeUpdate() > 0 ? true : false);
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (SQLException expConn) {
			expConn.printStackTrace();
		}
		return false;
	}
	
	private String createSetUpdate(Object classValues) {
		StringBuffer sqlValues = new StringBuffer();
		
		try {			
			Class<?> declaredClass = classValues.getClass();
			Field[] fields = declaredClass.getDeclaredFields();
			for (int i = 1; i <= (fields.length - 1); i++) {
				Field field = fields[i];
				
				Method method = declaredClass.getDeclaredMethod("get" + StringUtils.capitalize(field.getName()));
				sqlValues.append(" ");
				sqlValues.append(field.getName());						
				sqlValues.append(" = ");
				Object value = method.invoke(classValues);
				
				if ("String".equals(field.getType().getSimpleName())) {
					value = GenericUtils.formatInObject(value.toString());	
				}
				sqlValues.append(value);
				
				if (i != (fields.length - 1)) {
					sqlValues.append(", ");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
				
		return sqlValues.toString();
	}
	
	public Boolean execInsertObject(Class<?> pathClass, Object setValueItens) {
		return execInsert(pathClass, Arrays.asList(setValueItens));
	}
	
	public Boolean execInsert(Class<?> pathClass, List<Object> list) {
		try(Connection conn = getConn()) {
			StringBuffer sql = new StringBuffer();
			sql.append(" INSERT INTO ");
			sql.append(pathClass.getSimpleName().toLowerCase());
			sql.append(" ( ");
			sql.append(this.getColumnsClass(pathClass, false));
			sql.append(" ) ");
			sql.append("VALUES ");
			sql.append(this.createQtdItensInclude(list));
			
			try(PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
				populateParameterStatement(stmt, list);
				
				return (stmt.executeUpdate() > 0);
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (SQLException expConn) {
			expConn.printStackTrace();
		}
		return false;
	}
	
	private String getColumnsClass(Class<?> classColumn, Boolean includeId) {
		Field[] fields = classColumn.getDeclaredFields();
		String columns = new String();
		int include = 2;
		
		if (includeId) {
			include = 1;
		}
		
		for (int f = include; f < fields.length; f++) {
			if (f == (fields.length - 1)) {
				columns = columns + fields[f].getName();
			} else {
				columns = columns + fields[f].getName() + ", ";				
			}
		}
		
		return columns;
	}
	
	private String createQtdItensInclude(List<Object> item) {
		StringBuffer sqlValues = new StringBuffer();
		
		for (int c = 0; c < item.size(); c++) {
			Integer lengthFields = item.get(c).getClass().getDeclaredFields().length;
			StringBuffer include = new StringBuffer();
			include.append("(");
			
			for (int i = 2; i < lengthFields; i++) {
				include.append("?");
				if (i < (lengthFields - 1)) {
					include.append(",");
				}
			}
			include.append(")");
			
			if (item.size() > 1 && c < item.size()) {
				include.append(",");
			}
			sqlValues.append(include);
		}
			
		return sqlValues.toString();		
	}

	public Boolean execDelete(Class<?> pathClass, Integer id) {
		try(Connection conn = getConn()) {
			StringBuffer sql = new StringBuffer();
			sql.append("DELETE FROM ");
			sql.append(pathClass.getSimpleName().toLowerCase());
			sql.append(" WHERE id = ").append(id);
			
			try(PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
				return (stmt.executeUpdate() > 0);
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (SQLException expConn) {
			expConn.printStackTrace();
		}
		return false;
	}
	
	private void populateParameterStatement(PreparedStatement stmt, List<Object> params) {
		try {
			int index = 1;
			for (Object parameter : params) {
				if (parameter instanceof Object) {					
					Class<?> declaredClass = parameter.getClass();
					
					for (Field f : declaredClass.getDeclaredFields()) {
						if (f.getName() != "serialVersionUID" && f.getName() != "id") {						
							f.setAccessible(true);
							
							Method method = declaredClass.getDeclaredMethod("get" + StringUtils.capitalize(f.getName()));
							
							populateByType(stmt, method.invoke(parameter), index++);
						}
					}
				} else {
					populateByType(stmt, parameter, index++);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void populateByType(PreparedStatement stmt, Object obj, int index) throws SQLException {
		if (obj == null) {
			stmt.setNull(index, Types.NULL);
		} else if (obj instanceof BigDecimal) {
			stmt.setBigDecimal(index, (BigDecimal) obj);
		} else if (obj instanceof BigInteger) {
			stmt.setLong(index, ((BigInteger) obj).longValue() );
		} else if (obj instanceof Short) {
			stmt.setShort(index, (Short) obj);
		} else if (obj instanceof Integer) {
			stmt.setInt(index, ((Integer) obj).intValue());
		} else if (obj instanceof Long) {
			stmt.setLong(index, ((Long) obj).longValue());
		} else if (obj instanceof java.util.Date) {
			stmt.setDate(index, new java.sql.Date(((java.util.Date) obj).getTime()));
		} else if (obj instanceof String || obj instanceof Character) {
			stmt.setString(index, obj.toString());
		} else if (obj instanceof Double) {
			stmt.setDouble(index, ((Double) obj).doubleValue());
		} else if (obj instanceof Float) {
			stmt.setFloat(index, ((Float) obj).floatValue());
		} else if (obj instanceof Boolean) {
			stmt.setBoolean(index, ((Boolean) obj).booleanValue());
		}
	}
	
	private void populateClassByResultSet(ResultSet rs, Field f, Object obj, int index) throws IllegalArgumentException, IllegalAccessException, SQLException {
		Class<?> val = rs.getObject(index).getClass();
		
		if (val == null || val.equals(BigDecimal.class) 
			|| val.equals(java.util.Date.class) 
				|| val.equals(String.class)) {
			f.set(obj, rs.getObject(index));
		} else if (val.equals(Integer.class)) {
			f.setInt(obj, rs.getInt(index));
		} else if (val.equals(Long.class)) {
			f.setLong(obj, rs.getLong(index));
		} else if (val.equals(Double.class)) {
			f.setDouble(obj, rs.getDouble(index));
		} else if (val.equals(Float.class)) {
			f.setFloat(obj, rs.getFloat(index));
		} else if (val.equals(Boolean.class)) {
			f.setBoolean(obj, rs.getBoolean(index));
		}
	}
	
}
