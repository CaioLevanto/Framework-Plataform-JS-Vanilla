package br.com.painchaud.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import br.com.painchaud.utils.GenericUtils;

@Path("utils")
public class UtilsRest extends ResponseRest {

	@POST
	@Path("/enum")
	@Consumes("application/*")
	public Response getDescriptionEnum(String enumString) {
		try {
			JSONObject val = new JSONObject(enumString);
			
			return buildResponse(GenericUtils.getDescriptionEnum(val.getString("field"), val.getInt("index")));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
}
