import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import './patrep.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const PatRep = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        
    }

    const updateList = (event) => {
        const minfile = event.target.files[0];
        setFiles(event.target.files);
        if (minfile) {
            document.getElementsByClassName("Cancel")[0].style.display="block";
            document.getElementsByClassName("selected")[0].style.display="inline-block";
        }
    };

    const handleCancel = () => {
      setFiles([]);
      document.getElementsByClassName("Cancel")[0].style.display="none";
      document.getElementsByClassName("selected")[0].style.display="none";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Presciption added successfully with comments, ${description}`);

      };

      function createData(number, name) {
        return { number, name};
       }
    const rows=[
        createData(1, "Blood Test"),
        createData(2, "Sugar Test"),
        createData(3, "MRI scan"),
    ]

    // const updateList = function() {
    //     var input = document.getElementById('file');
    //     var output = document.getElementById('fileList');
      
    //     output.innerHTML = '<ul>';
    //     for (var i = 0; i < input.files.length; ++i) {
    //       output.innerHTML += '<li>' + input.files.item(i).name + '</li>';
    //     }
    //     output.innerHTML += '</ul>';
    //   }
    
  return (
    <>
            <Header />
            <div className="mainPage">
                <div className='AddBkPg'>
                    <div className='form-body'>                  
                        <div className='ContainerAdd'>
                            <div className='insi'>
                            {/* <div className='topp inside' onDrop={handleFileDrop} onDragOver={(event) => event.preventDefault()}>Drop image file here<br /><br/><i class="fa-sharp fa-solid fa-upload fa-bounce" style={{color: '#0043b8',fontSize:'2.8rem'}}></i></div>
                            <br /><div className='inside'>Or</div><br /> */}<br/>
                            <label className='file-name inside'>
                            <FileUploadRoundedIcon/>  Choose Files <input type="file" multiple onChange={updateList} />
                            </label></div><br />
                            <div>Supported Files</div>
                            <div>PDF, DOCX, JPG, PNG</div><br />
                            
                            
                        </div>

                        <div className='selected'>
                        <ul className='outerList'>
                            <div className='topp'>Selected files:</div>
                            {files &&
                            Array.from(files).map((file, index) => (
                                <li className='innerList' key={index}>{file.name}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                <div className='contbut'>
                    <span className='Cancel'><input type="submit" onClick={handleSubmit} value="Upload" className="footeDoc"/>
                    <button className='footeDoc' onClick={handleCancel}>Cancel</button></span>
                    
                </div>
        </div><br />

        <ul className='file-list'>
            {rows.map((row) => (
            <li
                className="file-item"
                key={row.number}>
                <InsertDriveFileIcon/>
                <p className='p'>{row.name}</p>
                <div className="actions">
                <IconButton onClick={handleClick}>{isClicked ?<DeleteIcon color="primary" /> : <DeleteOutlinedIcon/>}</IconButton>
                </div>
            </li>
            ))}
        </ul>
    </div>
   </>
  )
}

export default PatRep;