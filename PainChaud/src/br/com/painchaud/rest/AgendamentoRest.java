package br.com.painchaud.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import br.com.painchaud.dao.AgendamentoDAO;

@Path("agendamento")
public class AgendamentoRest extends UtilRest {
	
	@POST
	@Path("/findById/{id}")
	@Consumes("application/*")
	public void findById(@PathParam("id") Integer id) {
		List<Object> dao = new AgendamentoDAO().findSchedulingById(id);
		
		for (Object obj : dao) {
			System.out.println(obj);
		}
	}
	
}
