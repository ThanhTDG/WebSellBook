import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			address: "",
			subject: "",
			message: "",
		};
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		// Handle validation here
	};

	render() {
		return (
			<div className="App">
				<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
				<h1>Elegant Contact Form.</h1>
				<form>
					<h1>Should you have any questions, please do not hesitate to contact me :</h1>
					<div className="contentform">
						<div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
						<div className="leftcontact">
							<div className="form-group">
								<p>
									Name <span>*</span>
								</p>
								<span className="icon-case">
									<i className="fa fa-user"></i>
								</span>
								<input type="text" name="name" value={this.state.name} onChange={this.handleInput} />
								<div className="validation"></div>
							</div>
							<div className="form-group">
								<p>
									E-mail <span>*</span>
								</p>
								<span className="icon-case">
									<i className="fa fa-envelope-o"></i>
								</span>
								<input type="email" name="email" value={this.state.email} onChange={this.handleInput} />
								<div className="validation"></div>
							</div>
							<div className="form-group">
								<p>
									Address <span>*</span>
								</p>
								<span className="icon-case">
									<i className="fa fa-location-arrow"></i>
								</span>
								<input
									type="text"
									name="address"
									value={this.state.address}
									onChange={this.handleInput}
								/>
								<div className="validation"></div>
							</div>
						</div>

						<div className="rightcontact">
							<div className="form-group">
								<p>
									Subject <span>*</span>
								</p>
								<span className="icon-case">
									<i className="fa fa-comment-o"></i>
								</span>
								<input
									type="text"
									name="subject"
									value={this.state.subject}
									onChange={this.handleInput}
								/>
								<div className="validation"></div>
							</div>
							<div className="form-group">
								<p>
									Message <span>*</span>
								</p>
								<span className="icon-case">
									<i className="fa fa-comments-o"></i>
								</span>
								<textarea name="message" onChange={this.handleInput}>
									{this.state.message}
								</textarea>
								<div className="validation"></div>
							</div>
						</div>
					</div>
					<button type="button" className="bouton-contact">
						Send
					</button>
				</form>
			</div>
		);
	}
}

export default App;
