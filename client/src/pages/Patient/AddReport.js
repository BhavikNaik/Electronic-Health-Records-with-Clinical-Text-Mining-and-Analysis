import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './add.css';


const AddReport = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
    
        if (file.type.startsWith('image/')) {
            setImage(file);
            document.getElementsByClassName("Cancel")[0].style.display="block";
            document.getElementsByClassName("insi")[0].style.display="none";
        } else {
            setImage(null);
            document.getElementsByClassName("Cancel")[0].style.display="none";
            console.log('Invalid file type');
        }
    };
    const handleCancel = () => {
      setImage(null);
      document.getElementsByClassName("Cancel")[0].style.display="none";
      document.getElementsByClassName("insi")[0].style.display="block";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Presciption added successfully with comments, ${description}`);

      };

    const handleInputChange = (event) => {
        setDescription(event.target.value);
    };
    
  return (
    <div className='AddBkPg'>
            <div className='form-body'>
                <div className="inl">                   
                    <div className='ContainerAdd'>
                        <div className='insi'>
                        {/* <div className='topp inside' onDrop={handleFileDrop} onDragOver={(event) => event.preventDefault()}>Drop image file here<br /><br/><i class="fa-sharp fa-solid fa-upload fa-bounce" style={{color: '#0043b8',fontSize:'2.8rem'}}></i></div>
                        <br /><div className='inside'>Or</div><br /> */}
                        <label className='file-name inside'>
                            Choose Image <input type="file" accept="image/*" onChange={handleFileInputChange} />
                        </label></div>
                        {image && <img src={URL.createObjectURL(image)} alt="Selected file" className='imagg1'/>}<br/>
                        
                    </div>
                </div>
                <div className="inl">                  
                    <input type="text" className="form__input" placeholder='Additional Comments' value={description} onChange = {handleInputChange} cols="50" rows="5"></input >
                </div>
                
                <br/>
            </div>
            <div className='contbut'>
                <span className="d"><input type="submit" onClick={handleSubmit} value="Upload" className="footeDoc"/></span>
                <span className='Cancel'><button className='footeDoc' onClick={handleCancel}>Cancel</button></span>
                
            </div>
    </div>
  )
}

export default AddReport;