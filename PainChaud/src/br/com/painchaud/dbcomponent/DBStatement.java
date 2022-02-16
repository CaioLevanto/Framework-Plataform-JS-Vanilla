package br.	com.painchaud.dbcomponent;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.painchaud.db.DBUtil;

public class DBStatement extends DBUtil {
	
	public List<Object> execSelect(String sql, List<Object> whereParameters) {
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
	
	public Boolean execUpdate(String sql, List<Object> setValueItens, List<Object> whereParameters) {
		try(Connection conn = getConn()) {
			try(PreparedStatement stmt = conn.prepareStatement(sql)) {
				List<Object> allParameters = new ArrayList<Object>();
				allParameters.addAll(setValueItens);
				allParameters.addAll(whereParameters);
				
				populateParameterStatement(stmt, allParameters);
				return (stmt.executeUpdate() > 0 ? true : false);
			} catch (Exception expStmt) {
				expStmt.printStackTrace();
			}
		} catch (SQLException expConn) {
			expConn.printStackTrace();
		}
		return false;
	}

	public Boolean execDelete(String sql, List<Object> whereParameters) {
		try(Connection conn = getConn()) {
			try(PreparedStatement stmt = conn.prepareStatement(sql)) {
				populateParameterStatement(stmt, whereParameters);
				return stmt.execute();
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
			int column = 1;
			for (Object obj : params) {
				Class<? extends Object> classObj = obj.getClass();
				if (classObj.equals(String.class)) {
					stmt.setString(column, obj.toString());
				} else if (classObj.equals(Integer.class)) {
					stmt.setInt(column, Integer.valueOf(obj.toString()));
				} else if (classObj.equals(Boolean.class)) {
					stmt.setBoolean(column, Boolean.getBoolean(obj.toString()));
				} else if (classObj.equals(Long.class)) {
					stmt.setLong(column, Long.valueOf(obj.toString()));
				} else if (classObj.equals(Date.class)) {
					stmt.setDate(column, Date.valueOf(obj.toString()));
				} else {
					stmt.setObject(column, obj);
				}
				column++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
