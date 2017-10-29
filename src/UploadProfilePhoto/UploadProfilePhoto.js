import React, {Component} from 'react';

import {storage, auth} from '../firebase'

class UploadProfilePhoto extends Component {

    state = {
        file: null,
        downloadURL: undefined,
        progress: undefined
    }

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    handleFileUpload = () => {
        this.setState({
            downloadURL: undefined,
            progress: 1
        })

        let uploadTask = storage.ref(`profile-photo-${Date.now()}`).put(this.state.file);

        uploadTask.on('state_changed', (snapshot) => {
                var progress =
                    (snapshot.bytesTransferred /
                        snapshot.totalBytes) * 100;
                this.setState({
                    progress
                })
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                console.log(error)
            }, () => {
                this.setState({
                        downloadURL: uploadTask.snapshot.downloadURL
                    },
                    () => {
                        auth.currentUser.updateProfile({
                            photoURL: uploadTask.snapshot.downloadURL
                        }).then(() => {
                            console.log('photo updated')
                        })
                    }
                )

    }
)
    ;
}

render()
{
    return <div className="App">
        <input type="file" onChange={this.handleFileChange}/>
        <button onClick={this.handleFileUpload}>Upload</button>
        {this.state.progress ? <progress value={this.state.progress} max="100"></progress> : null}
    </div>
}
}

export default UploadProfilePhoto;
