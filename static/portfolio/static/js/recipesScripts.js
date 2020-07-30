import React from 'react';
import ReactDOM from 'react-dom';

class DropDown extends React.Component{
    render(){
        return (
            'PogChamp'
        );
    }
}

const DOMContainer = document.querySelector('#Dropdown');
ReactDOM.render(React.createElement(DropDown), DOMContainer);