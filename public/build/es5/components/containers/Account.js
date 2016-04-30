"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Dropzone = _interopRequire(require("react-dropzone"));

var Loader = _interopRequire(require("react-loader"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var ProjectCard = _interopRequire(require("../../components/ProjectCard"));

var api = _interopRequire(require("../../api/api"));

var Account = (function (Component) {
	function Account(props, context) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updateProject = this.updateProject.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.submitProject = this.submitProject.bind(this);
		this.state = {
			showModal: false,
			selectedProject: null,
			project: {
				title: "",
				description: "",
				image: "tHyPScSk", // blue logo
				link: "",
				tagString: ""
			}
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({
					showModal: true
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showModal: false
				});
			},
			writable: true,
			configurable: true
		},
		uploadImage: {
			value: function uploadImage() {},
			writable: true,
			configurable: true
		},
		updateProject: {
			value: function updateProject(event) {
				event.preventDefault();
				var proj = Object.assign({}, this.state.project);
				proj[event.target.id] = event.target.value;
				//		console.log('updateProject: '+JSON.stringify(proj))
				this.setState({
					project: proj
				});

			},
			writable: true,
			configurable: true
		},
		submitProject: {
			value: function submitProject(event) {
				event.preventDefault();
				var proj = Object.assign({}, this.state.project);

				var t = this.state.project.split(",");
				var tags = [];
				for (var i = 0; i < t.length; i++) {
					var tag = t[i];
					if (tag.length == 0) continue;

					tags.push(tag.trim());
				}

				proj.tags = tags;


				proj.profile = {
					id: this.props.profile.id,
					image: this.props.profile.image,
					name: this.props.profile.username
				};

				api.handlePost("/api/project", proj, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					console.log("PROJECT CREATED: " + JSON.stringify(response));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var projectList = null;
				if (this.props.projects != null) {
					projectList = this.props.projects.map(function (project, i) {
						return React.createElement(ProjectCard, { key: project.id, project: project });
					});
				}

				return React.createElement(
					"div",
					null,
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin clearfix" },
									React.createElement(
										"div",
										{ className: "tabs clearfix", id: "tab-1" },
										React.createElement(
											"ul",
											{ className: "tab-nav clearfix" },
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#tabs-2" },
													"Account"
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#tabs-4" },
													"Portfolio"
												)
											)
										),
										React.createElement(
											"div",
											{ className: "tab-container" },
											React.createElement(
												"div",
												{ className: "tab-content clearfix", id: "tabs-2" },
												"Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus."
											),
											React.createElement(
												"div",
												{ className: "tab-content clearfix", id: "tabs-4" },
												this.props.profile.id == null ? null : React.createElement(
													"a",
													{ style: { marginRight: 12, marginBottom: 24 }, onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
													"Add Project"
												),
												React.createElement(
													"div",
													{ className: "row" },
													projectList
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal, bsSize: "large" },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h3",
								null,
								"Project"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("input", { onChange: this.updateProject, id: "title", value: this.state.project.title, className: "form-control", type: "text", placeholder: "Title" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateProject, id: "link", value: this.state.project.link, className: "form-control", type: "text", placeholder: "http://" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateProject, id: "tagString", value: this.state.project.tagString, className: "form-control", type: "text", placeholder: "Python, iOS, JavaScript, etc." }),
									React.createElement("br", null),
									React.createElement(
										Dropzone,
										{ style: { width: 100 + "%", marginBottom: 24, background: "#fff", border: "1px dotted #ddd" }, onDrop: this.uploadImage },
										React.createElement(
											"div",
											{ style: { padding: 24 } },
											"Drop file here, or click to select image to upload."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("textarea", { onChange: this.updateProject, id: "description", value: this.state.project.description, className: "form-control", placeholder: "Text", style: { minHeight: 260 } }),
									React.createElement("br", null)
								)
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.submitProject, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
							)
						)
					),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Account;
})(Component);

var stateToProps = function (state) {
	var currentUser = state.profileReducer.currentUser;
	var projectsArray = state.projectReducer.projectsArray;

	if (projectsArray == null && currentUser.id != null) {
		api.handleGet("/api/project?profile.id=" + currentUser.id, {}, function (err, response) {
			if (err) {
				return;
			}

			console.log("FETCH PROJECTS: " + JSON.stringify(response));
			store.dispatch(actions.projectsRecieved(response.projects));
		});
	}

	return {
		profile: currentUser,
		projects: projectsArray
	};
};

module.exports = connect(stateToProps)(Account);