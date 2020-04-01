import React from 'react';
import {  generateRandom } from '../Helper/Helper';

function Cards({results}){
    return (
        <div key={results.name} className="plant-cards card">
            <div className="card-body">
            <div className="card-box-body">
                <p><span>Population:</span> <span  className="text-green bold">{results.population}</span></p>
                <div className="width-100 diamter-water common-card ">
                    <p className="width-100 "><span>Diameter: </span> <span className="text-red bold">{results.diameter}</span></p>
                    <p className="width-100 "><span>Gravity: </span><span className="text-red bold">{results.gravity}</span></p>
                </div>
                <div className="width-100 climate-rotation common-card">
                    <p className="width-100"><span>Climate: </span> <span className="text-red bold">{results.climate}</span></p>
                    <p className="width-100"><span>Rotation period: </span><span className="text-red bold">{results.rotation_period}</span></p>
                </div>
                
            </div>
            <div className="card-box-name">
                <p>{results.name}</p>
            </div>
            </div>
            <div className={`planet-img gradient${generateRandom()}`} style={{width: `${results.population.length*18}px`,height: `${results.population.length*18}px`}}></div>
            <div className="opacity-body">
            </div>
        </div>
    )     
}
export default Cards;