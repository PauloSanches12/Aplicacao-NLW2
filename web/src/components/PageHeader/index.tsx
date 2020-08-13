import backIcon from '../../assets/icons/back.svg';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logo} alt="logo" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> }

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;