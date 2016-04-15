"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../api/api"));

var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Nav = (function (_React$Component) {
	function Nav(props, context) {
		_classCallCheck(this, Nav);

		_get(Object.getPrototypeOf(Nav.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			showModal: false
		};
	}

	_inherits(Nav, _React$Component);

	_prototypeProperties(Nav, null, {
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/account/currentuser", {}, function (err, response) {
					if (err) {
						return;
					}

					store.dispatch(actions.currentUserRecieved(response.profile));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				console.log("OPEN MODAL");
				this.setState({ showModal: true });
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({ showModal: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"header",
					{ id: "header", className: "full-header static-sticky dark" },
					React.createElement(
						"div",
						{ id: "header-wrap" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ id: "primary-menu-trigger" },
								React.createElement("i", { className: "icon-reorder" })
							),
							React.createElement(
								"div",
								{ id: "logo" },
								React.createElement(
									"a",
									{ href: "/", className: "standard-logo", "data-dark-logo": "/images/logo-dark.png" },
									React.createElement("img", { src: "/images/logo-dark.png", alt: "Canvas Logo" })
								),
								React.createElement(
									"a",
									{ href: "/", className: "retina-logo", "data-dark-logo": "/images/logo-dark@2x.png" },
									React.createElement("img", { src: "/images/logo-dark@2x.png", alt: "Canvas Logo" })
								)
							),
							React.createElement(
								"nav",
								{ id: "primary-menu" },
								React.createElement(
									"ul",
									{ className: "one-page-menu" },
									React.createElement(
										"li",
										{ className: "current" },
										React.createElement(
											"a",
											{ href: "#", "data-href": "#header" },
											React.createElement(
												"div",
												null,
												"Home"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/videos", "data-href": "#" },
											React.createElement(
												"div",
												null,
												"Videos"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/courses" },
											React.createElement(
												"div",
												null,
												"Courses"
											)
										),
										React.createElement(
											"ul",
											null,
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "/courses?type=live" },
													React.createElement(
														"div",
														null,
														"Part Time"
													)
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "/courses?type=immersive" },
													React.createElement(
														"div",
														null,
														"Bootcamp"
													)
												)
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ onClick: this.openModal, href: "#" },
											"Login"
										)
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Log In"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", type: "password", id: "password", placeholder: "Password" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Log In"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Nav;
})(React.Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser
	};
};


module.exports = connect(stateToProps)(Nav);