import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

export default function AddWork(props) {
    const [title, setTitle] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [cur, setCur] = React.useState(false)
    const [loading, setLoading] = React.useState(false);


    async function handleClick() {
        setLoading(true);
        // console.log(edu, clg, loca);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.userid,
                title: title,
                startDate: startDate,
                endDate: endDate,
                desc: desc
            })
        };
        const sendMongoData = await fetch('http://localhost:8989/DocData/AddWork', requestOptions);
        const finalData = await sendMongoData.json();
        console.log(finalData);
        setLoading(false)
        handleClose()
    }


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            setTitle(value);
        }
        if (id === "stdate") {
            setStartDate(value);
        }
        if (id === "eddate") {
            setEndDate(value);
        }
        if (id === "desc") {
            setDesc(value);
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
                        <TextField sx={textStyle} value={title} id="title" onChange={(e) => handleInputChange(e)} label="Job Title" variant="outlined" />
                        <TextField sx={textStyle} value={startDate} id="stdate" onChange={(e) => handleInputChange(e)} label="Start Date" variant="outlined" />
                        <TextField sx={textStyle} value={endDate} id="eddate" onChange={(e) => handleInputChange(e)} label="End Date /Current" variant="outlined" />
                        <TextField sx={textStyle} value={desc} id="desc" onChange={(e) => handleInputChange(e)} label="Job description" variant="outlined" />
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