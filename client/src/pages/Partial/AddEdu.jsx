import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '5px',


    boxShadow: 24,
    p: 4,
};
const textStyle = {
    margin: "5px"
}

export default function AddEdu(props) {
    const [edu, setEdu] = React.useState("")
    const [clg, setClg] = React.useState("")
    const [loca, setLoca] = React.useState("");
    const [loading, setLoading] = React.useState(false);


    async function handleClick() {
        setLoading(true);
        console.log(edu, clg, loca);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.userid,
                edu: edu,
                clg: clg,
                loca: loca
            })
        };
        const sendMongoData = await fetch('http://localhost:8989/DocData/AddEdu', requestOptions);
        const finalData = await sendMongoData.json();
        console.log(finalData);
        setLoading(false)
        handleClose()
    }


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "edu") {
            setEdu(value);
        }
        if (id === "clg") {
            setClg(value);
        }
        if (id === "loca") {
            setLoca(value);
        }

    }

    const handleClose = () => props.setOpen(false);


    return (
        <div>

            <Modal
                open={props.BillModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Bill
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", padding: "5px", flexDirection: "column" }}>
                        <TextField sx={textStyle} value={edu} id="edu" onChange={(e) => handleInputChange(e)} label="Degree" variant="outlined" />
                        <TextField sx={textStyle} value={clg} id="clg" onChange={(e) => handleInputChange(e)}  label="College" variant="outlined" />
                        <TextField sx={textStyle} value={loca} id="loca" onChange={(e) => handleInputChange(e)} label="Location" variant="outlined" />
                        <LoadingButton
                            size="small"
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}