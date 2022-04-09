package br.com.painchaud.rest;

import java.lang.reflect.Type;
import java.util.ArrayList;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class ResponseRest {
	
	public ArrayList<?> fromJsonArray(String jsonString, Type type) {
	    return new Gson().fromJson(jsonString, type);
	}
	
	public Object fromJson(String jsonString, Class<?> pathClass) {
		return new Gson().fromJson(jsonString, pathClass);
	}
	
	public Response buildResponse(Object result) {
		try {
			if (result instanceof Boolean) {
				return Response.ok(result).build();
			} else {
				Gson gson = new GsonBuilder().disableHtmlEscaping().create();
				String value = gson.toJson(result).replaceAll("=", ":");
				
				return Response.ok(value).build();				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	public Response buildErrorResponse(String str) {
		ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
		rb = rb.entity(str);
		rb = rb.type("text/plain");
		return rb.build();
	}
}
