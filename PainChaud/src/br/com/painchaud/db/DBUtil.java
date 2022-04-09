package br.com.painchaud.db;

import java.sql.Connection;

public class DBUtil {

	private Connection conn;
	
	public Connection getConn() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").getDeclaredConstructor().newInstance();
			conn = java.sql.DriverManager.getConnection("jdbc:mysql://localhost/painchauddb?"
							+ "user=root&password=Debora@2020&useTimezone=true&serverTimezone=UTC");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
}
