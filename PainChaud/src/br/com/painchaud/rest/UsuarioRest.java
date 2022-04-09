package br.com.painchaud.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import br.com.painchaud.dao.UsuarioDAOImpl;
import br.com.painchaud.model.Usuario;
import br.com.painchaud.utils.GenericUtils;

@Path("usuario")
public class UsuarioRest extends ResponseRest {
	
	private static Class<Usuario> userPath = Usuario.class;
	
	@POST
	@Path("/insert")
	@Consumes("application/*")
	public Response saveUser(String object) {
		try {
			return buildResponse(new UsuarioDAOImpl().insert(userPath, fromJson(object, userPath)));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/update")
	@Consumes("application/*")
	public Response updateUser(String object) {
		try {
			Object entity = fromJson(object, userPath);
			
			return buildResponse(new UsuarioDAOImpl().update(userPath, entity, 
					Integer.valueOf(entity.getClass().getDeclaredMethod("getId").invoke(entity).toString())));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/delete/{id}")
	@Consumes("application/*")
	public Response deleteUser(@PathParam("id") int id) {
		try {
			return buildResponse(new UsuarioDAOImpl().delete(userPath, id));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/edit/{id}")
	@Produces("application/json")
	public Response edit(@PathParam("id") int id) {
		try {
			return buildResponse(new UsuarioDAOImpl().edit(userPath, id));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/hasItem/{id}")
	@Produces("application/*")
	public Response hasItem(@PathParam("id") int id) {
		try {
			return buildResponse(new UsuarioDAOImpl().hasItem(userPath, id));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/findAll")
	@Produces("application/json")
	public Response findAll() {
		try {
			return buildResponse(new UsuarioDAOImpl().findAll(userPath));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET 
	@Path("/getHeader")
	@Consumes("application/*")
	@Produces("application/json")
	public Response getHeader(String hasId) {
		try {
			return buildResponse(GenericUtils.getHeaderByClass(userPath, hasId));
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/actionCrud")
	public Response actionCrud() {
		try {
			return buildResponse(new UsuarioDAOImpl().getActions());
		} catch (Exception e) {
			return buildErrorResponse(e.getMessage());
		}
	}
	
}
