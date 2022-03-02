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
			int index = 1;
			for (Object object : params) {
				if (object == null) {
					stmt.setNull(index++, Types.NULL);
				} else if (object instanceof BigDecimal) {
					stmt.setBigDecimal(index++, (BigDecimal) object);
				} else if (object instanceof BigInteger) {
					stmt.setLong(index++, ((BigInteger) object).longValue() );
				} else if (object instanceof Short) {
					stmt.setShort(index++, (Short) object);
				} else if (object instanceof Integer) {
					stmt.setInt(index++, ((Integer) object).intValue());
				} else if (object instanceof Long) {
					stmt.setLong(index++, ((Long) object).longValue());
				} else if (object instanceof java.util.Date) {
					stmt.setDate(index++, new java.sql.Date(((java.util.Date) object).getTime()));
				} else if (object instanceof String || object instanceof Character) {
					stmt.setString(index++, object.toString());
				} else if (object instanceof Double) {
					stmt.setDouble(index++, ((Double) object).doubleValue());
				} else if (object instanceof Float) {
					stmt.setFloat(index++, ((Float) object).floatValue());
				} else if (object instanceof Boolean) {
					stmt.setBoolean(index++, ((Boolean) object).booleanValue());
				} else {
					stmt.setObject(index++, object);
				}
				index++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
