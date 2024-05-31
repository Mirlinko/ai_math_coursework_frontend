import './Modal.css';
import React, {useState} from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";
import {postTrain} from "../../api/api";
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
interface IModal {
    closeModal: () => void
}

const Modal: React.FC<IModal> = ({closeModal}) => {

    const [name, setName] = useState('');
    const [direction, setDirection] = useState('');
    const [value, setValue] = useState<Dayjs | null>(dayjs('2024-05-17T15:30'));
    return (
        <div className="modal">
            <div className="modal__mini">
                <div className="modal__title">
                    <h3 style={{color: '#272727'}}>Додавання поїзда</h3>
                    <Button btnStyle={{paddingLeft: 20, paddingRight: 20}} label="x" onClick={closeModal}/>
                </div>
                <input value={name} placeholder="Введіть ID поїзда" onChange={(e) => setName(e.target.value)}/>
                <input value={direction} placeholder="Введіть пункт призначення" onChange={(e) => setDirection(e.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            label="Час відправлення"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button label="Додати поїзд" secondary={true} onClick={async () => {
                    if (name.length > 0 && direction.length > 0 && value?.toString()) {
                        console.log(value?.toString())
                        const data = await postTrain(name, direction, value?.toString()).then()
                        console.log(data)
                        if (data) {
                            closeModal();
                            window.location.href = '/';
                        }
                    } else {
                        toast.error('Заповніть усі поля.', errorToasterStyles)
                    }
                }
                }/>
            </div>
        </div>
    )
}
export default Modal;