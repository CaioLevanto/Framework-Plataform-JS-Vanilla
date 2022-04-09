package br.com.painchaud.utils;

import java.lang.reflect.Field;
import java.util.LinkedHashMap;

import javax.validation.Valid;
import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.AssertTrue;

import com.sun.xml.internal.ws.util.StringUtils;

import br.com.painchaud.enumtype.FuncaoEnum;
import br.com.painchaud.enumtype.LocalEnum;
import br.com.painchaud.enumtype.tipoMedidaEnum;

public class GenericUtils {
	
	public static String getHeaderByClass(Class<?> classPath) {
		return getHeaderByClass(classPath, "");
	}

	public static String getHeaderByClass(Class<?> classPath, String hasId) {
		LinkedHashMap<String, String> header = new LinkedHashMap<String, String>();
		
		for (Field f : classPath.getDeclaredFields()) {
			if (f.getName() == "id") {				
				if (verifyEmptyString(hasId)) {
					if (!Boolean.parseBoolean(hasId)) {
						continue;
					}
				}
			}
			
			f.setAccessible(true);
			String nameAttr = StringUtils.capitalize(f.getName());
			
			if (f.getAnnotation(AssertFalse.class) == null && f.getAnnotation(AssertTrue.class) == null && f.getAnnotation(Valid.class) == null) {		
				header.put(formatInObject(nameAttr), formatInObject(f.getType().getSimpleName()));
			} else if (f.getAnnotation(Valid.class) != null) {
				StringBuffer listEnum = new StringBuffer();
				
				listEnum.append("Selecione");
				
				switch (nameAttr) {
					case "Funcao":
						for ( FuncaoEnum vals : FuncaoEnum.values() ) {
							if (!vals.equals(FuncaoEnum.ADMINISTRADOR)) {
								listEnum.append(",");
								listEnum.append(vals.getDescricao());
							}
						}
						
						break;
					
					case "Local":
						for ( LocalEnum vals : LocalEnum.values() ) {
							listEnum.append(",");
							listEnum.append(vals.getDescricao());
						}
						
						break;
						
					case "TipoMedida":
						for ( tipoMedidaEnum vals : tipoMedidaEnum.values() ) {
							listEnum.append(",");
							listEnum.append(vals.getDescricao());
						}
						
						break;
				}
				
				header.put(formatInObject(nameAttr), formatInObject(listEnum.toString()));
			}
		}
		
		String act = "Action";
		header.put(formatInObject(act), formatInObject(act));
				
		return header.toString();
	}
	
	public static String formatInObject(String obj) {
		return '"' + obj + '"';
	}
	
	public static Boolean verifyEmptyString(String obj) {
		return (obj != null && !"".equals(obj) && !obj.isEmpty());
	}
	
	public static String getDescriptionEnum(String field, int index) {
		switch ( field ) {
			case "Funcao":
				return FuncaoEnum.values()[index].getDescricao();
				
			case "Local":
				return LocalEnum.values()[index].getDescricao();
			
			case "TipoMedida":
				return tipoMedidaEnum.values()[index].getDescricao();
		}
		
		return null;
	}
	
}
