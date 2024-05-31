import './Navbar.css';
import Button from "../Button/Button";
import React, { ChangeEvent } from "react";

interface INavbar {
    openModal: () => void;
    handleID: (e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    handleDestination: (e: ChangeEvent<HTMLInputElement>) => void;
    destination: string;
}

const Navbar: React.FC<INavbar> = ({ openModal, handleID, id, destination, handleDestination }) => {

    return (
        <div className="navbar">
            <input value={id} placeholder="Введіть номер поїзда" onChange={(e) => handleID(e)}/>
            <input value={destination} placeholder="Введіть пункт призначення" onChange={(e) => handleDestination(e)}/>
            <Button onClick={openModal} navbar={true} label="Додати поїзд"/>
        </div>
    );
}

export default Navbar;
