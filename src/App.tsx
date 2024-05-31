import React, {ChangeEvent, useEffect, useState} from 'react';
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Modal} from "./components";
import {ITrain} from "./constants/interfaces";
import {getTrains} from "./api/api";
import {formatDate} from "./constants/consts";

function App() {
    const { toasts } = useToasterStore();

    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= 3)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);
    const [modal,setModal]=useState(false);
    const openModal=()=>{setModal(true)}
    const closeModal=()=>{setModal(false)}
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [viewTrains, setViewTrains] = useState<ITrain[]>([]);
    const fetchData = async () => {
        const data = await getTrains().then();
        setTrains(data);
        setViewTrains(data);
    }
    useEffect(() => {
        fetchData().then();
    }, []);
    const [id,setID]=useState('');
    const [destination,setDestination]=useState('');
    useEffect(() => {
        const filteredTrains = trains.filter(train => {
           console.log(train.id)
            const idMatch = train.name.includes(id);
            const destinationMatch = train.destination.toLowerCase().includes(destination.toLowerCase());
            console.log(idMatch&&destinationMatch)
            return idMatch && destinationMatch;
        });
        console.log(id)
        setViewTrains(filteredTrains);
    }, [id, destination, trains]);

    const handleDestination = (e: ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value)
    }
    const handleID = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value)
    }
    return (
        <div className={modal?"bg no-scroll":"bg"}>
            <BrowserRouter>
                <Navbar openModal={openModal} handleDestination={handleDestination} handleID={handleID} id={id} destination={destination} />
                {modal&&<Modal closeModal={closeModal}/>}
                <div className="train">
                    <h4>Звіти:</h4>
                    <div className="trains">
                        <h5 className="train__header">ID</h5>
                        <h5 className="train__header">Номер поїзда</h5>
                        <h5 className="train__header">Час відправлення</h5>
                        <h5 className="train__header">Станція призначення</h5>
                    </div>
                    <div style={{borderBottom: "1px solid #e52727"}}>
                        {viewTrains?.map((train, index) =>
                            <>
                                <div className="trains" key={index}>
                                    <h5>{index + 1}</h5>
                                    <h5>{train.name}</h5>
                                    <h5>{formatDate(train.time)}</h5>
                                    <h5>{train.destination}</h5>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Toaster/>
            </BrowserRouter>
        </div>
    );
}

export default App;
