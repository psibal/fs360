import React from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import api from '../api/api'
import ReactBootstrap, { Modal } from 'react-bootstrap'


class Nav extends React.Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			showModal: false
		}
	}

	componentDidMount(){
		api.handleGet('/account/currentuser', {}, function(err, response){
			if (err){
				return
			}

			store.dispatch(actions.currentUserRecieved(response.profile));
		});
	}

	openModal(event){
		event.preventDefault()
		console.log('OPEN MODAL')
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}

	render(){
		return (
			<header id="header" className="full-header static-sticky dark">
				<div id="header-wrap">
					<div className="container clearfix">
						<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

						<div id="logo">
							<a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png">
								<img src="/images/logo-dark.png" alt="Canvas Logo" />
							</a>
							<a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png">
								<img src="/images/logo-dark@2x.png" alt="Canvas Logo" />
							</a>
						</div>

						<nav id="primary-menu">
							<ul className="one-page-menu">
								<li className="current"><a href="#" data-href="#header"><div>Home</div></a></li>
								<li><a href="/videos" data-href="#"><div>Videos</div></a></li>
								<li><a href="/courses"><div>Courses</div></a>
									<ul>
										<li><a href="/courses?type=live"><div>Part Time</div></a></li>
										<li><a href="/courses?type=immersive"><div>Bootcamp</div></a></li>
									</ul>
								</li>
								<li><a onClick={this.openModal} href="#">Login</a></li>

							</ul>
						</nav>
					</div>
				</div>

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Log In</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input className="form-control" type="text" id="email" placeholder="Email" /><br />
			        	<input className="form-control" type="password" id="password" placeholder="Password" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Log In</a>
			        </Modal.Footer>
		        </Modal>


			</header>
		)
	}

}

const stateToProps = function(state) {

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Nav)

