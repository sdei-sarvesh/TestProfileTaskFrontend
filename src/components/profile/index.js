import React from 'react';
import '../../styles/profile.css';
import { Button } from 'react-bootstrap';
import { UpdateModal } from '../common/update.modal.component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../utils/apiConfig';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showState: false,
            userData: ''
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.handleUpdateName = this.handleUpdateName.bind(this)
    }
    componentWillMount() {
        this.loadData()
    }
    loadData() {
        axios.get(api.GET_USER_PROFILE)
            .then(function (response) {
                console.log(response);
                this.setState({ userData: response.data.data })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
    }
    handleClose() {
        this.setState({ showState: false })
    }
    handleModalOpen() {
        this.setState({ showState: true, name: this.state.userData.name })
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleUpdateName() {
        
        if (this.state.name.trim()) {
            let data = {
                name: this.state.name.trim(),
                id: api.USER_ID,
                city: this.state.userData.city
            }
            axios.post(api.UPDATE_USER_NAME, data)
                .then(function (response) {
                    toast.success(response.data.message)
                    this.setState({ userData: response.data.data, showState: false })
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                }.bind(this));
        }
        else {
            toast.error('Please enter a valid name.')
        }
    }
    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>User Profile</h2>
                {this.state.userData ? <div className="card">
                    <img src="http://account.suntriplatform.com/uploads/images/img.jpg" alt="user" style={{ width: '100%' }} />
                    <p>
                        <label className="user_label">Name:</label>
                        <span className="title">{this.state.userData.name}</span>
                        <Button style={{float:'right'}} bsStyle="primary" bsSize="xsmall" onClick={this.handleModalOpen}>Edit</Button>
                    </p>
                    <p>
                        <label className="user_label">City:</label>
                        <span className="title">{this.state.userData.city}</span>
                    </p>
                    <div className="clearfix"></div>
                    <ToastContainer />
                </div> : null}
                {this.state.showState ? <UpdateModal
                    showState={this.state.showState}
                    handleClose={this.handleClose}
                    title={'Update name'}
                    userName={this.state.name}
                    handleNameChange={this.handleNameChange}
                    handleUpdateName={this.handleUpdateName}
                /> : false}
            </div>
        );
    }
}

export default Profile;