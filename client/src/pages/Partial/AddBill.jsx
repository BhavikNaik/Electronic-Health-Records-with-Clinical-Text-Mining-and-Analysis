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

export default function AddBill(props) {
    const [cost, setCost] = React.useState()
    const [title, settitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [loading, setLoading] = React.useState(false);


    async function handleClick() {
        setLoading(true);

        let newDate = new Date()

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.userid,
                title: title,
                cost: cost,
                desc: desc,
                date: newDate
            })
        };
        const sendMongoData = await fetch('http://localhost:8989/UserData/AddBill', requestOptions);
        const finalData = await sendMongoData.json();

        setLoading(false)
        handleClose()
    }


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            settitle(value);
        }
        if (id === "cost") {
            setCost(value);
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
                        <TextField sx={textStyle} value={title} id="title" onChange={(e) => handleInputChange(e)} label="Bill title" variant="outlined" />
                        <TextField sx={textStyle} value={cost} id="cost" onChange={(e) => handleInputChange(e)} type='number' label="Cost" variant="outlined" />
                        <TextField sx={textStyle} value={desc} id="desc" onChange={(e) => handleInputChange(e)} label="Description" variant="outlined" />
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