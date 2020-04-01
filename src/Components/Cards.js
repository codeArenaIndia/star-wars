import React from 'react';

function Cards({results}){
    return (
        <div key={results.name} className="plant-cards card">
            <div className="card-body">
            <div className="card-box-body">
                <p><span>Population:</span> <span  className="text-green bold">{results.population}</span></p>
                <div className="width-100 climate-rotation">
                    <p className="width-50 pull-left"><span>Climate:</span> <span className="text-red bold">{results.climate}</span></p>
                    <p className="width-50 pull-left text-right"><span>Rotation period:</span><br/><span className="text-red bold">{results.rotation_period}</span></p>
                </div>
                
            </div>
            <div className="card-box-name">
                <p>{results.name}</p>
            </div>
            </div>
            <div className="opacity-body">
            </div>
        </div>
    )     
}
export default Cards;