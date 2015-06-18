/**
 * Created by dracks on 04/06/15.
 */

export default {
	application:{
		title: 'Passwords manager',
		navigation:{
			show:'Show Navigation',
			home:'Inicio',
			sites:'Sitios',
			search:'Buscar',
			login:'Acceder',
			logout:'Salir'
		},
		actions: {
			edit: "Editar",
			save: "Guardar",
			delete: "Borrar"
		},
		names: {
			parent: "Padre",
			name: "Nombre"
		}
	},
	list:{
		pagination: {
			next:'Siguiente >',
			previous: '< Anterior'
		}
	},
	edit:{
		save:"Guardar"
	},
	login:{
		title:'Por favor, identificate',
		username:'Usuario',
		password:'Contraseña',
		button: 'Acceder'
	},
	group: {
		root: "All",
		messages: {
			"save-ok":"El grupo se ha guardado"
		}
	},
	site:{
		create:'Nuevo',
		group: 'Grupo',
		name: 'Nombre',
		description: 'Descripción',
		user: 'Usuario',
		password: 'Contraseña',
		url: 'Dirección',
		messages: {
			"save-ok":"El sitio se ha guardado"
		}
	}
};