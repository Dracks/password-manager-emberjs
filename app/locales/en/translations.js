/**
 * Created by dracks on 04/06/15.
 */

export default {
	application:{
		title: 'Passwords manager',
		navigation:{
			show:'Show Navigation',
			home:'Home',
			sites:'Sites',
			search:'Search',
			login:'Login',
			logout:'Logout'
		},
		actions: {
			edit: "Edit",
			save: "Save",
			delete: "Delete"
		},
		names: {
			parent: "Parent",
			name: "Name"
		}
	},
	list:{
		pagination: {
			next:'Next >',
			previous: '< Previous'
		}
	},
	login:{
		title:'Please sign in',
		username:'Username',
		password:'Password',
		button: 'Login'
	},
	group:{
		root: "All",
		confirm: {
			"delete": "Are you sure to delete {{group}} group?"
		},
		messages: {
			"save-ok":"The group has been saved",
			"deleted-ok":"The group was deleted correctly"
		},
		errors:{
			"with-children": "You cannot delete a group with childrens"
		}
	},
	site:{
		create:'New',
		group: 'Group',
		name: 'Name',
		description: 'Description',
		user: 'User',
		password: 'Password',
		url: 'Url',
		messages: {
			"save-ok":"The site has been saved"
		}
	}
};