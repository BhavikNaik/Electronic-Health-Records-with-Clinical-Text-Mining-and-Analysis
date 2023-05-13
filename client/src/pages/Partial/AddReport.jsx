import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import {
    ref, getDownloadURL, uploadBytesResumable, uploadBytes, listAll,
    list,
} from "firebase/storage";

const { storage } = require('../../config/firebase')

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '5px',
    display: "flex",
    justifyContent: 'space-around',

    boxShadow: 24,
    p: 4,
};


export default function AddReport(props) {

    const [image, setImage] = React.useState()

    const handleUpload = (e) => {

        setImage(e.target.files[0]);
    }
    const handleSubmit = async () => {
        try {

            const storageRef = ref(storage, `${props.userid}/pres/${image.name}`);

            // Create file metadata including the content type


            const snapshot = await uploadBytesResumable(storageRef, image);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            let URL = await getDownloadURL(snapshot.ref);
            const dpData = {
                path: URL,
            }



            const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAL29aOJgF6S5386W-usz9_Be9jPk0J8yE', {
                method: 'POST',
                body: JSON.stringify(

                    {
                        "requests": [
                            {
                                "image": {
                                    "source": {
                                        "imageUri": URL
                                    }
                                },
                                "features": [
                                    {
                                        "type": "TEXT_DETECTION"
                                    }
                                ]
                            }
                        ]
                    }
                )
                ,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();


            const extractedData= data.responses[0].fullTextAnnotation.text
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id:props.userid,URL:URL,text:extractedData })
            };
            const sendMongoData = await fetch('http://localhost:8989/UserData/AddPresc', requestOptions);
            const finalData = await sendMongoData.json();


        } catch (error) {
console.log(error);
        }


    }
    const handleClose = () => props.setOpen(false);
    return (
        <div>

            <Modal
                open={props.isModelOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    Add Report
                    <Button variant="contained" component="label">
                        Upload
                        <input id="image"
                            name="file"
                            ref={image} onChange={(e) => handleUpload(e)} type="file" />
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}